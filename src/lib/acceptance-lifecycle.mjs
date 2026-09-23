export function lifecycleState(record) {
 const events=record?.events??[];
 const last=type=>events.filter(e=>e.type===type).at(-1);
 const handoff=last('handoff');
 const initialization=events.filter(e=>e.type==='initialize'&&events.indexOf(e)>Math.max(events.lastIndexOf(handoff),events.lastIndexOf(last('deployed')))).at(-1);
 return {releasePrepared:last('release-prepared'),deployed:last('deployed'),reviewed:last('reviewed'),accepted:last('accepted'),handoff,initialization,status:initialization?.status??'unverified'};
}
export function lastPublished(record, records = []) {
 let latest;
 let newest = -Infinity;
 // Evidence supplies a timestamp only. A lifecycle event wins an equal-time tie.
 for (const candidate of [
  ...records.map(entry => ({at: entry.checkedAt})),
  ...(record?.events ?? []).map(event => ({at: event.at, actor: event.actor})),
 ]) {
  const time = Date.parse(candidate.at);
  if (Number.isFinite(time) && time >= newest) {
   latest = candidate;
   newest = time;
  }
 }
 return latest;
}
export function isAccepted(record, acceptedByDefault = false) {
 return acceptedByDefault || Boolean(lifecycleState(record).accepted);
}
function validateStandingPlus(standingPlus) {
 if(!Array.isArray(standingPlus)||standingPlus.length===0) throw Error('Standing-plus needs at least one increment-to-standing pair.');
 const fromIds=new Set();
 const toIds=new Set();
 for(const pair of standingPlus) {
  if(!pair||!/^00[1-9]$|^010$/.test(pair.from??'')||!/^\d{3}$/.test(pair.to??'')) throw Error('Standing-plus pairs must map increment ids 001-010 to three-digit standing ids.');
  if(fromIds.has(pair.from)||toIds.has(pair.to)) throw Error('Standing-plus increment and standing ids must be unique.');
  fromIds.add(pair.from);toIds.add(pair.to);
 }
 return standingPlus.map(({from,to})=>({from,to}));
}
export function acceptCloseout(record,{actor,humanApproval,acceptedAt,standingPlus,now=new Date()}) {
 if(lifecycleState(record).accepted) throw Error('Accepted suite is immutable; create a new task suite.');
 const currentTime=new Date(now);
 if(!Number.isFinite(currentTime.valueOf())) throw Error('Closeout needs a valid current time.');
 const state=lifecycleState(record);
 if(acceptedAt!==undefined&&typeof acceptedAt!=='string') throw Error('Accepted time must be a valid, nonfuture timestamp with timezone.');
 if(acceptedAt!==undefined&&(!/(Z|[+-]\d{2}:\d{2})$/.test(acceptedAt)||!Number.isFinite(Date.parse(acceptedAt))||Date.parse(acceptedAt)>currentTime.valueOf())) throw Error('Accepted time must be a valid, nonfuture timestamp with timezone.');
 if(!state.releasePrepared&&acceptedAt!==undefined) throw Error('Accept-closeout cannot use --accepted-at when release-prepared is missing.');
 if(state.releasePrepared&&acceptedAt!==undefined&&Date.parse(acceptedAt)<Date.parse(state.releasePrepared.at)) throw Error('Accepted time cannot precede release-prepared.');
 const appendedEvents=[];
 let next=record;
 if(!state.releasePrepared) {
  const releasePrepared={type:'release-prepared',at:currentTime.toISOString(),actor,approximate:true};
  next=appendEvent(next,releasePrepared);
  appendedEvents.push(releasePrepared);
 }
 const accepted={type:'accepted',at:acceptedAt?new Date(acceptedAt).toISOString():currentTime.toISOString(),actor,humanApproval};
 if(standingPlus!==undefined) accepted.standingPlus=validateStandingPlus(standingPlus);
 next=appendEvent(next,accepted);
 appendedEvents.push(accepted);
 return {record:next,events:appendedEvents};
}
/** @template T @param {T[]} snapshots @returns {T[]} */
export function sortAcceptanceSnapshots(snapshots) {
 return snapshots.filter(entry => !entry.supersededBy).sort((a, b) => {
  const createdDifference = Date.parse(b.createdAt ?? b.milestoneCompletedAt ?? "1970-01-01") - Date.parse(a.createdAt ?? a.milestoneCompletedAt ?? "1970-01-01");
  return createdDifference || b.id.localeCompare(a.id);
 });
}
export function readiness(record,{taskId,instructionsExist,acknowledged,reviewer,repositoryAccess,liveAccess,informationReady,canRecordResults}) {
 const failures=[];
 if(repositoryAccess !== true) failures.push('Human judgment required: reviewer has not confirmed access to the repository.');

 if(informationReady !== true) failures.push('Human judgment required: required specification, suite, or evidence is unavailable.');
 if(canRecordResults !== true) failures.push('Human judgment required: no authorized way to record review results has been confirmed.');
 if(!instructionsExist) failures.push('Reviewer Agents.md is unavailable.');
 if(!acknowledged) failures.push('Reviewer has not acknowledged reading and following Reviewer Agents.md.');
 if(!record||record.taskId!==taskId) failures.push('No acceptance suite for this task.');
 const state=lifecycleState(record);
 if(state.accepted) failures.push('The suite is accepted and cannot be reviewed.');
 if(!state.handoff) failures.push('No reviewer handoff has been recorded.');
 if(state.deployed && record.events.indexOf(state.handoff)<record.events.indexOf(state.deployed)) failures.push('New deployment requires a fresh reviewer handoff.');
 const limitations=[];
 if(liveAccess !== true) limitations.push('Assess live access per item; leave blocked items unverified.');
 if(!state.deployed?.versionId||!state.deployed?.at) limitations.push('Production version unconfirmed: observations do not verify a particular release.');
 if(!reviewer||reviewer===record?.builder) failures.push('Reviewer must be identified and independent of the builder.');
 return {status:failures.length?'failed':'passed',failures,limitations,requiresHumanJudgment:failures.length>0||limitations.length>0};
}
export function appendEvent(record,event) {
 if(lifecycleState(record).accepted) throw Error('Accepted suite is immutable; create a new task suite.');
 if(!Number.isFinite(Date.parse(event.at))||!event.actor?.trim()) throw Error('Event needs an ISO timestamp and actor.');
 if(!['handoff','initialize','deployed','reviewed','accepted','release-prepared'].includes(event.type)) throw Error('Unknown lifecycle event.');
 if(event.type==='initialize'&&!['passed','failed'].includes(event.status)) throw Error('Initialization must pass or fail.');
 if(event.type==='reviewed') {
  const state=lifecycleState(record);
  if(state.status!=='passed'||!state.deployed||state.initialization.actor!==event.actor) throw Error('Review requires successful initialization by this reviewer.');
  if(event.versionId!==state.deployed.versionId) throw Error('Review must identify the confirmed deployed version.');
 }
 if(event.type==='accepted'&&!event.humanApproval?.trim()) throw Error('Explicit human acceptance and closure evidence required.');
 if(event.standingPlus!==undefined) {
  if(event.type!=='accepted') throw Error('Standing-plus is allowed only on an accepted event.');
  event={...event,standingPlus:validateStandingPlus(event.standingPlus)};
 }
 return {...record,events:[...record.events,event]};
}
