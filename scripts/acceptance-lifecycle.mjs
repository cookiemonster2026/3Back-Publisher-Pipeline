import fs from 'node:fs';
import {resolve} from 'node:path';
import {appendEvent, readiness, lifecycleState} from '../src/lib/acceptance-lifecycle.mjs';
const [command,...args]=process.argv.slice(2);const options={};for(let i=0;i<args.length;i++){const key=args[i].replace(/^--/,'');options[key]=args[i+1]?.startsWith('--')||!args[i+1]?true:args[++i];}
const root=resolve(import.meta.dirname,'..');
try {
 if(!/^[a-z0-9-]+$/.test(options.suite??'')||!options.task||!options.actor) throw Error('Provide --suite, --task, and --actor.');
 const path=resolve(root,'src/data/acceptance-lifecycle',options.suite+'.json');
 if(!fs.existsSync(path)) throw Error('Review blocked: no lifecycle record for this suite. Builder must create it.');
 let record=JSON.parse(fs.readFileSync(path,'utf8'));
 if(record.taskId!==options.task) throw Error('Task ID does not match suite.');
 if(lifecycleState(record).accepted) throw Error('Suite is accepted; create a new task suite.');
 let event={type:command,at:new Date().toISOString(),actor:options.actor};let failed=false;
 if(command==='prepare-release') { event.type='release-prepared'; event.approximate=true; } else if(command==='initialize') {
  const result=readiness(record,{taskId:options.task,instructionsExist:fs.existsSync(resolve(root,'Reviewer Agents.md')),acknowledged:options['acknowledge-read']===true,reviewer:options.actor,repositoryAccess:options['repository-access']===true,liveAccess:options['live-access']===true,informationReady:options['information-ready']===true,canRecordResults:options['can-record-results']===true});
  event={...event,...result};failed=result.status==='failed';
 } else if(command==='deployed') {
  const response=await fetch('https://3back.com/api/deployments/history',{headers:process.env.THREEBACK_ACCESS_COOKIE?{cookie:process.env.THREEBACK_ACCESS_COOKIE}:{},redirect:'error'});
  if(!response.ok) throw Error('Release incomplete: production deployment endpoint unavailable.');
  const result=await response.json();
  if(result.snapshotId!==record.suiteId||!result.currentVersionId||!Number.isFinite(Date.parse(result.currentDeployedAt))) throw Error('Release incomplete: no matching confirmed deployment.');
  event={...event,at:new Date(result.currentDeployedAt).toISOString(),versionId:result.currentVersionId,confirmedAt:new Date().toISOString(),url:'https://3back.com/docs/acceptance-results/'+record.suiteId+'/'};
 } else if(command==='reviewed') event.versionId=options.version;
 else if(command==='accepted') event.humanApproval=options['human-approval'];
 else if(command!=='handoff') throw Error('Use prepare-release, handoff, initialize, deployed, reviewed, or accepted.');
 record=appendEvent(record,event);
 fs.writeFileSync(path,JSON.stringify(record,null,2)+'\n');
 console.log(JSON.stringify(event,null,2));if(failed) process.exitCode=1;
} catch(error) { console.error(error.message);process.exitCode=1; }
