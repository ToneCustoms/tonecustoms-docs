<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
type Point={label:string,value:number|null}
const token=ref('')
const loading=ref(false)
const error=ref('')
const connected=ref(false)
const lastUpdated=ref('')
const tickets=ref<{total:number,open:number,closed:number,answered:number}|null>(null)
const commits=ref<Point[]>([{label:'Documentation',value:null},{label:'Analytics',value:null},{label:'Support',value:null}])
const days=ref<Point[]>([])
const rate=computed(()=>tickets.value?.total?Math.round(tickets.value.closed/tickets.value.total*100):null)
const coverage=computed(()=>tickets.value?.total?Math.round(tickets.value.answered/tickets.value.total*100):null)
const maxCommit=computed(()=>Math.max(1,...commits.value.map(x=>x.value??0)))
const maxDay=computed(()=>Math.max(1,...days.value.map(x=>x.value??0)))
async function request(url:string,privateAccess=false){
 const headers:Record<string,string>={'Accept':'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'}
 if(privateAccess&&token.value.trim())headers.Authorization='Bearer '+token.value.trim()
 const response=await fetch('https://api.github.com/'+url,{headers,cache:'no-store'})
 if(!response.ok)throw new Error('GitHub returned '+response.status+' for '+url.split('?')[0])
 return response.json()
}
async function refresh(){
 loading.value=true;error.value='';connected.value=false
 try{
  const now=new Date(),since=new Date(now.getTime()-30*86400000).toISOString()
  const repos=[['Documentation','ToneCustoms/tonecustoms-docs',false],['Analytics','ToneCustoms/tonecustoms-analytics',true],['Support','ToneCustoms/tonecustoms-support',true]] as const
  const daily=new Map<string,number>()
  const output:Point[]=[]
  for(const [label,repo,isPrivate] of repos){
   try{
    const items=await request('repos/'+repo+'/commits?since='+encodeURIComponent(since)+'&per_page=100',isPrivate)
    output.push({label,value:items.length})
    for(const c of items){const day=c.commit?.author?.date?.slice(0,10);if(day)daily.set(day,(daily.get(day)||0)+1)}
   }catch{output.push({label,value:null})}
  }
  commits.value=output
  days.value=Array.from({length:30},(_,i)=>{const d=new Date(now.getTime()-(29-i)*86400000).toISOString().slice(0,10);return {label:d,value:daily.get(d)||0}})
  if(token.value.trim()){
   const all:any[]=[]
   for(let page=1;page<=10;page++){
    const batch=await request('repos/ToneCustoms/tonecustoms-support/issues?state=all&per_page=100&page='+page,true)
    all.push(...batch)
    if(batch.length<100)break
   }
   const filtered=all.filter(x=>!x.pull_request && (x.labels?.some((l:any)=>l.name?.toLowerCase()==='support')||/^\[(support|tonecustoms support)\]/i.test(x.title||''))&&!x.labels?.some((l:any)=>['test','internal-test'].includes(l.name?.toLowerCase()))&&!/test/i.test(x.title||'')&&x.created_at>='2026-01-01')
   let answered=0
   for(const issue of filtered){
    const comments=await request('repos/ToneCustoms/tonecustoms-support/issues/'+issue.number+'/comments?per_page=100',true)
    if(comments.some((c:any)=>c.user?.login?.toLowerCase()==='tonyiswavy'))answered++
   }
   tickets.value={total:filtered.length,open:filtered.filter(x=>x.state==='open').length,closed:filtered.filter(x=>x.state==='closed').length,answered}
   connected.value=true
  }else{tickets.value=null}
  lastUpdated.value=now.toLocaleString()
 }catch(e:any){error.value=e.message||'Could not load private metrics'}finally{loading.value=false}
}
onMounted(()=>refresh())
</script>
<template>
<div class="tc-analytics">
 <div class="tc-analytics-head"><div><span class="tc-eyebrow">TONECUSTOMS / ANALYTICS</span><h1>Business overview</h1><p>Owner dashboard · Built for Roleplay. Made with Purpose.</p></div><span class="tc-analytics-state">{{loading?'Refreshing…':connected?'Private metrics connected':'Public metrics only'}}</span></div>
 <div class="tc-auth"><div><strong>Private business metrics</strong><p>Enter your existing GitHub fine-grained read-only token to view private support data. The token stays in this browser tab's memory and is not saved or sent to ToneCustoms servers. This public documentation page never publishes private metrics.</p></div><div class="tc-auth-input"><input v-model="token" type="password" autocomplete="off" placeholder="GitHub read-only token" aria-label="GitHub read-only token"/><button :disabled="loading" @click="refresh">{{loading?'Loading…':'Load analytics'}}</button><button class="tc-clear" @click="token='';tickets=null;connected=false">Clear</button></div></div>
 <p v-if="error" role="alert" class="tc-analytics-error">{{error}}</p>
 <div class="tc-kpis"><div class="tc-kpi"><span>Support tickets</span><strong>{{tickets?.total??'—'}}</strong><small>{{connected?'Verified':'Private access required'}}</small></div><div class="tc-kpi"><span>Closed tickets</span><strong>{{tickets?.closed??'—'}}</strong><small>Support resolutions</small></div><div class="tc-kpi"><span>Closure rate</span><strong>{{rate===null?'—':rate+'%'}}</strong><small>Closed / total</small></div><div class="tc-kpi"><span>Staff reply coverage</span><strong>{{coverage===null?'—':coverage+'%'}}</strong><small>Answered / total</small></div></div>
 <div class="tc-panels"><section class="tc-panel"><h2>GitHub activity</h2><p>Commits in the last 30 days · maximum 100 per repository</p><div v-for="item in commits" :key="item.label" class="tc-graph-row"><div><span>{{item.label}}</span><b>{{item.value===null?'Unavailable':item.value===100?'100+':item.value}}</b></div><div class="tc-graph-track"><div :style="{width:item.value===null?'0%':Math.round(item.value/maxCommit*100)+'%'}"></div></div></div></section>
 <section class="tc-panel"><h2>Support ticket status</h2><p>Live from the private support repository</p><template v-if="tickets"><div v-for="item in [{label:'Closed',value:tickets.closed},{label:'Open',value:tickets.open}]" :key="item.label" class="tc-graph-row"><div><span>{{item.label}}</span><b>{{item.value}}</b></div><div class="tc-graph-track"><div :style="{width:Math.round(item.value/Math.max(1,tickets.total)*100)+'%'}"></div></div></div></template><p v-else class="tc-unavailable">Connect private metrics to display support graphs.</p></section>
 <section class="tc-panel tc-wide"><h2>Development trend</h2><p>Daily GitHub commits over 30 days · accessible repositories only</p><div class="tc-trend" role="img" aria-label="Bar chart of daily commits"><div v-for="day in days" :key="day.label" class="tc-trend-column" :style="{height:Math.max(2,(day.value||0)/maxDay*100)+'%'}" :title="day.label+': '+day.value+' commits'"></div></div><div class="tc-trend-axis"><span>30 days ago</span><span>Today</span></div></section>
 <section class="tc-panel tc-wide"><h2>Business integrations</h2><p>Only connected sources display verified figures</p><div class="tc-integrations"><div><span>GitHub development</span><b>Connected</b></div><div><span>Private support</span><b>{{connected?'Connected':'Authentication required'}}</b></div><div><span>Tebex revenue and orders</span><b>Not connected</b></div><div><span>YouTube analytics</span><b>Not connected</b></div><div><span>Website traffic</span><b>Not connected</b></div></div></section></div>
 <p class="tc-analytics-foot">Last refreshed: {{lastUpdated||'Not yet loaded'}} · GitHub data is read directly from GitHub. Missing access is never counted as zero.</p>
</div>
</template>
<style scoped>
.tc-analytics{max-width:1180px;margin:0 auto;padding:42px 24px 100px;color:#f7f1ff}.tc-analytics-head{display:flex;align-items:center;justify-content:space-between;gap:24px;margin-bottom:26px}.tc-eyebrow{color:#ba83f6;font-weight:800;letter-spacing:.19em;font-size:11px}.tc-analytics h1{font-size:clamp(34px,5vw,54px);letter-spacing:-.055em;margin:7px 0 8px;line-height:1.15}.tc-analytics p{color:#c6b5dc;line-height:1.6}.tc-analytics-state{border:1px solid #65418a;border-radius:99px;background:#281239;padding:9px 14px;color:#dfbaff;white-space:nowrap;font-size:12px}.tc-auth{display:flex;align-items:center;justify-content:space-between;gap:20px;border:1px solid #674184;background:linear-gradient(125deg,#281239,#140e20);border-radius:17px;padding:22px;margin-bottom:22px}.tc-auth strong{font-size:16px}.tc-auth p{font-size:12px;max-width:640px;margin:7px 0 0}.tc-auth-input{display:flex;gap:7px;flex-wrap:wrap}.tc-auth input{background:#0d0915;color:white;border:1px solid #745196;border-radius:9px;padding:11px;min-width:175px;max-width:240px}.tc-auth button{background:#873bca;border:1px solid #b66cff;color:white;border-radius:9px;padding:10px 13px;font-weight:700;cursor:pointer}.tc-auth button:disabled{opacity:.5}.tc-auth .tc-clear{background:transparent}.tc-kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:15px}.tc-kpi,.tc-panel{border:1px solid rgba(179,102,243,.22);background:linear-gradient(155deg,#241630,#130e1d);border-radius:16px;padding:24px}.tc-kpi span{color:#c6b5dc;font-size:13px}.tc-kpi strong{display:block;font-size:34px;margin:10px 0 3px}.tc-kpi small{color:#a998be;font-size:11px}.tc-panels{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:18px}.tc-panel h2{font-size:19px;border:0;margin:0 0 7px;padding:0}.tc-panel>p{font-size:12px;margin:0 0 22px}.tc-wide{grid-column:1/-1}.tc-graph-row{margin:19px 0}.tc-graph-row>div:first-child{display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px}.tc-graph-track{height:12px;background:#3a294b;border-radius:99px;overflow:hidden}.tc-graph-track>div{height:100%;border-radius:99px;background:linear-gradient(90deg,#8433d2,#b66cff)}.tc-unavailable{padding:20px 0}.tc-trend{height:170px;display:flex;align-items:end;gap:5px;border-bottom:1px solid #674184}.tc-trend-column{flex:1;min-width:3px;background:linear-gradient(#c38aff,#7532bb);border-radius:4px 4px 0 0}.tc-trend-axis{display:flex;justify-content:space-between;color:#a998be;font-size:11px;margin-top:10px}.tc-integrations{display:grid;grid-template-columns:1fr 1fr;gap:0 30px}.tc-integrations>div{display:flex;justify-content:space-between;gap:10px;padding:12px 0;border-bottom:1px solid #3a294b;font-size:13px}.tc-integrations b{color:#c995f7;font-size:12px}.tc-analytics-foot{margin-top:30px;font-size:12px}.tc-analytics-error{color:#ffb6d2!important}@media(max-width:850px){.tc-auth{display:block}.tc-auth-input{margin-top:15px}.tc-kpis{grid-template-columns:repeat(2,1fr)}}@media(max-width:650px){.tc-analytics{padding:30px 15px}.tc-analytics-head{display:block}.tc-analytics-state{display:inline-block;margin-top:15px}.tc-panels{grid-template-columns:1fr}.tc-wide{grid-column:auto}.tc-integrations{grid-template-columns:1fr}}@media(max-width:430px){.tc-kpis{grid-template-columns:1fr}.tc-auth input{width:100%;max-width:none}}
</style>