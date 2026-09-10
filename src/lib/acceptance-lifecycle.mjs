export function lifecycleState(record) {
 const events=record?.events??[];
 const last=type=>events.filter(e=>e.type===type).at(-1);
 const handoff=last('handoff');
 const initialization=events.filter(e=>e.type==='initialize'&&events.indexOf(e)>Math.max(events.lastIndexOf(handoff),events.lastIndexOf(last('deployed')))).at(-1);
 return {releasePrepared:last('release-prepared'),deployed:last('deployed'),reviewed:last('reviewed'),accepted:last('accepted'),handoff,initialization,status:initialization?.status??'unverified'};
}
export function readiness(record,{taskId,instructionsExist,acknowledged,reviewer}) {
 const failures=[];
 if(!instructionsExist) failures.push('Reviewer Agents.md is unavailable.');
 if(!acknowledged) failures.push('Reviewer has not acknowledged reading and following Reviewer Agents.md.');
 if(!record||record.taskId!==taskId) failures.push('No acceptance suite for this task.');
 const state=lifecycleState(record);
 if(state.accepted) failures.push('The suite is accepted and cannot be reviewed.');
 if(!state.handoff) failures.push('No reviewer handoff has been recorded.');
 if(state.deployed && record.events.indexOf(state.handoff)<record.events.indexOf(state.deployed)) failures.push('New deployment requires a fresh reviewer handoff.');
 if(!state.deployed?.versionId||!state.deployed?.at) failures.push('No confirmed production deployment record.');
 if(!reviewer||reviewer===record?.builder) failures.push('Reviewer must be identified and independent of the builder.');
 return {status:failures.length?'failed':'passed',failures};
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
 return {...record,events:[...record.events,event]};
}
