import test from 'node:test';import assert from 'node:assert/strict';
import {readiness,appendEvent,isAccepted,lifecycleState} from '../src/lib/acceptance-lifecycle.mjs';
const event=(type,extra={})=>({type,at:'2026-09-09T20:00:00Z',actor:'reviewer',...extra});
const base=()=>({taskId:'task',suiteId:'suite',builder:'builder',events:[event('deployed',{versionId:'v1'}),event('handoff',{actor:'builder'})]});
const opts={taskId:'task',instructionsExist:true,acknowledged:true,reviewer:'reviewer',repositoryAccess:true,liveAccess:true,informationReady:true,canRecordResults:true};
test('readiness passes only with instructions acknowledgment and deployed open suite',()=>assert.equal(readiness(base(),opts).status,'passed'));
for(const [name,option] of [['missing instructions',{instructionsExist:false}],['unread instructions',{acknowledged:false}],['wrong task',{taskId:'other'}],['same builder',{reviewer:'builder'}]]) test(name,()=>assert.equal(readiness(base(),{...opts,...option}).status,'failed'));
test('missing suite blocks readiness; missing deployment permits partial review',()=>{assert.equal(readiness(null,opts).status,'failed');assert.equal(readiness({...base(),events:[event('handoff')]},opts).status,'passed');});
test('handoff resets an earlier initialization pass without removing history',()=>{let r=appendEvent(base(),event('initialize',{status:'passed'}));r=appendEvent(r,event('handoff'));assert.equal(lifecycleState(r).status,'unverified');assert.equal(r.events.length,4);});
test('review requires current initialization and matching deployed version',()=>{assert.throws(()=>appendEvent(base(),event('reviewed',{versionId:'v1'})));const r=appendEvent(base(),event('initialize',{status:'passed'}));assert.throws(()=>appendEvent(r,event('reviewed',{versionId:'v2'})));assert.equal(lifecycleState(appendEvent(r,event('reviewed',{versionId:'v1'}))).reviewed.versionId,'v1');});
test('accepted suites reject further events and fail readiness',()=>{assert.throws(()=>appendEvent(base(),event('accepted')));const r=appendEvent(base(),event('accepted',{humanApproval:'Human accepted and closed task.'}));assert.throws(()=>appendEvent(r,event('handoff')));assert.equal(readiness(r,opts).status,'failed');});
test('historical suites can display as accepted without inventing a lifecycle event',()=>{assert.equal(isAccepted(base()),false);assert.equal(isAccepted(base(),true),true);});

for (const capability of ['repositoryAccess','informationReady','canRecordResults']) {
 test(capability+' must be explicitly confirmed; failure returns to human',()=>{
  for (const value of [false,undefined]) {
   const result=readiness(base(),{...opts,[capability]:value});
   assert.equal(result.status,'failed');assert.equal(result.requiresHumanJudgment,true);
  }
 });
}
test('failed initialization cannot complete a review',()=>{
 const failed=readiness(base(),{...opts,repositoryAccess:false});
 const record=appendEvent(base(),event('initialize',failed));
 assert.equal(lifecycleState(record).status,'failed');
 assert.throws(()=>appendEvent(record,event('reviewed',{versionId:'v1'})));
 assert.equal(lifecycleState(record).reviewed,undefined);
});

test('partial readiness retains blockers without allowing completed review',()=>{const r={...base(),events:[event('handoff')]};const result=readiness(r,{...opts,liveAccess:false});assert.equal(result.status,'passed');assert.equal(result.limitations.length,2);assert.equal(result.requiresHumanJudgment,true);assert.throws(()=>appendEvent(appendEvent(r,event('initialize',result)),event('reviewed',{versionId:'invented'})));});
