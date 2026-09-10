import assert from 'node:assert/strict';
import test from 'node:test';
import { matchingDeploymentTime } from '../functions/deployment-history.mjs';
test('deployment date matches the serving version, not a newer unrelated upload',()=>{
 const rows=[{created_on:'2026-09-09T20:00:00Z',versions:[{version_id:'live',percentage:100}]},{created_on:'2026-09-09T21:00:00Z',versions:[{version_id:'other',percentage:100}]}];
 assert.equal(matchingDeploymentTime(rows,'live'),'2026-09-09T20:00:00.000Z');
 assert.equal(matchingDeploymentTime(rows,'missing'),null);
 assert.equal(matchingDeploymentTime(rows,undefined),null);
});
test('rollback uses latest activation and ignores invalid dates and zero traffic',()=>{
 assert.equal(matchingDeploymentTime([{created_on:'bad',versions:[{version_id:'a',percentage:100}]},{created_on:'2026-09-09T22:00:00Z',versions:[{version_id:'a',percentage:0}]},{created_on:'2026-09-09T21:00:00Z',versions:[{version_id:'a',percentage:100}]}],'a'),'2026-09-09T21:00:00.000Z');
});
