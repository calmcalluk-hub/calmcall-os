// eslint-disable
import { useState, useEffect, useRef } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const T = {
  teal:    "#2A7C6F",
  tealL:   "#3A9D8E",
  tealXL:  "#E8F4F2",
  charcoal:"#1C2331",
  charcoalM:"#3D4A5C",
  charcoalL:"#6B7A8D",
  cream:   "#F8F7F4",
  white:   "#FFFFFF",
  gold:    "#C9A84C",
  goldL:   "#FDF6E3",
  red:     "#D94F3D",
  redL:    "#FDF0EE",
  green:   "#2E7D5E",
  greenL:  "#EAF5F0",
  border:  "#E4E7EC",
};

// ─── SEED DATA ────────────────────────────────────────────────────────────────
const FOUNDERS = [
  { id:1, name:"Cody",   initials:"CO", role:"CEO & Founder",     email:"cody@calmcall.co.uk",   color:T.teal   },
  { id:2, name:"Jordon", initials:"JO", role:"CTO & Co-Founder",  email:"jordon@calmcall.co.uk", color:T.gold   },
  { id:3, name:"Jordan", initials:"JA", role:"COO & Co-Founder",  email:"jordan@calmcall.co.uk", color:"#6B5EA8" },
];

const SEED = {
  projects: [
    { id:1, name:"CalmCall Website",        status:"Active",   owner:1, priority:"Critical", progress:30, objective:"Launch premium marketing site",    startDate:"2026-07-01", targetDate:"2026-08-01" },
    { id:2, name:"CalmCall OS (Internal)",  status:"Active",   owner:2, priority:"High",     progress:20, objective:"Replace Notion for founders",        startDate:"2026-07-01", targetDate:"2026-08-15" },
    { id:3, name:"Customer-Facing App",     status:"Planned",  owner:1, priority:"Critical", progress:5,  objective:"MVP for tradespeople",               startDate:"2026-08-01", targetDate:"2026-10-01" },
    { id:4, name:"First 20 Customers",      status:"Active",   owner:3, priority:"Critical", progress:10, objective:"Close first paying customers",        startDate:"2026-07-01", targetDate:"2026-09-01" },
    { id:5, name:"Sales Launch",            status:"Planned",  owner:3, priority:"High",     progress:0,  objective:"Go-to-market strategy & execution",   startDate:"2026-08-01", targetDate:"2026-09-01" },
    { id:6, name:"Legal & Agreements",      status:"Active",   owner:1, priority:"High",     progress:40, objective:"Founders agreement & company setup",  startDate:"2026-06-01", targetDate:"2026-07-31" },
  ],
  tasks: [
    { id:1,  title:"Finalise founders agreement",         assignee:1, creator:1, project:6, priority:"Critical", status:"In Progress", due:"2026-07-20", area:"Legal",    description:"Get legal review and all 3 signatures." },
    { id:2,  title:"Design website hero section",         assignee:2, creator:1, project:1, priority:"High",     status:"Next",        due:"2026-07-15", area:"Design",   description:"Premium above-fold treatment matching brand." },
    { id:3,  title:"Set up Supabase project",             assignee:2, creator:2, project:2, priority:"High",     status:"In Progress", due:"2026-07-12", area:"Tech",     description:"Auth, DB schema, storage buckets." },
    { id:4,  title:"Write homepage copy",                 assignee:3, creator:1, project:1, priority:"Normal",   status:"Backlog",     due:"2026-07-18", area:"Marketing",description:"Clear headline, subheadline, benefits." },
    { id:5,  title:"Research Twilio pricing",             assignee:2, creator:2, project:3, priority:"Normal",   status:"Next",        due:"2026-07-14", area:"Tech",     description:"UK SMS rates and call forwarding costs." },
    { id:6,  title:"Identify first 5 target mechanics",  assignee:3, creator:3, project:4, priority:"Critical", status:"In Progress", due:"2026-07-13", area:"Sales",    description:"Local garages and mechanic shops to approach." },
    { id:7,  title:"Create pitch deck",                   assignee:1, creator:1, project:4, priority:"High",     status:"Backlog",     due:"2026-07-25", area:"Sales",    description:"Founder-friendly 8-slide deck." },
    { id:8,  title:"Register company at Companies House", assignee:1, creator:1, project:6, priority:"Critical", status:"Complete",    due:"2026-07-01", area:"Legal",    description:"Ltd company registration." },
    { id:9,  title:"Open business bank account",          assignee:3, creator:3, project:6, priority:"High",     status:"In Progress", due:"2026-07-20", area:"Finance",  description:"Starling or Tide for startup." },
    { id:10, title:"Define pricing packages",             assignee:1, creator:1, project:3, priority:"High",     status:"Backlog",     due:"2026-07-28", area:"Product",  description:"Starter, Growth, Pro tiers." },
  ],
  decisions: [
    { id:1, title:"Target market: tradespeople first",   date:"2026-07-01", decision:"Focus exclusively on mechanics, plumbers, electricians for MVP", reasoning:"Largest pain point, easiest to reach, proven willingness to pay", people:[1,2,3], status:"Agreed",   project:3 },
    { id:2, title:"Tech stack: React + Supabase",        date:"2026-07-05", decision:"Use React, Supabase, Vercel for all products",                  reasoning:"Free tiers, fast to build, scalable, Cody can manage",          people:[1,2],   status:"Agreed",   project:2 },
    { id:3, title:"Pricing: SaaS monthly subscription",  date:"2026-07-08", decision:"Monthly recurring fee plus optional setup fee",                  reasoning:"Predictable revenue, industry standard, low barrier to entry",  people:[1,3],   status:"Agreed",   project:3 },
    { id:4, title:"Brand name: CalmCall",                date:"2026-06-20", decision:"CalmCall as the product name, not founders' names",              reasoning:"Memorable, describes the benefit, domain available",            people:[1,2,3], status:"Agreed",   project:1 },
  ],
  ideas: [
    { id:1, title:"AI receptionist that answers calls",        description:"Claude/GPT answers missed calls, qualifies the caller, sends SMS summary", submittedBy:1, date:"2026-07-02", category:"Product", status:"Approved",   value:"Very High", effort:"High"   },
    { id:2, title:"WhatsApp integration for callbacks",        description:"Send callback confirmations via WhatsApp instead of SMS only",             submittedBy:2, date:"2026-07-04", category:"Product", status:"Discussing", value:"High",      effort:"Medium" },
    { id:3, title:"Referral scheme for tradespeople",          description:"Plumber refers electrician, both get a month free",                       submittedBy:3, date:"2026-07-06", category:"Growth",   status:"New",        value:"High",      effort:"Low"    },
    { id:4, title:"Weekly call report email to business owner",description:"Auto-send a Monday morning summary of last week's calls",                  submittedBy:1, date:"2026-07-08", category:"Product", status:"Approved",   value:"High",      effort:"Low"    },
    { id:5, title:"CalmCall for dental practices",             description:"Expand target market to include dentists and medical clinics",              submittedBy:3, date:"2026-07-09", category:"Growth",   status:"Parked",     value:"Medium",    effort:"Medium" },
  ],
  leads: [
    { id:1, company:"Riverside Auto Repairs",  contact:"Dave Mitchell",  phone:"07700 900123", email:"dave@riversideauto.co.uk",  industry:"Mechanic",     stage:"Demo booked",  owner:3, value:1200, lastContact:"2026-07-10", nextAction:"Run demo", nextActionDate:"2026-07-14" },
    { id:2, company:"FastFlow Plumbing",       contact:"Sarah Connor",   phone:"07700 900456", email:"sarah@fastflow.co.uk",      industry:"Plumber",      stage:"Interested",   owner:3, value:1200, lastContact:"2026-07-09", nextAction:"Send proposal", nextActionDate:"2026-07-15" },
    { id:3, company:"Bright Spark Electric",   contact:"Tom Richards",   phone:"07700 900789", email:"tom@brightspark.co.uk",     industry:"Electrician",  stage:"Contacted",    owner:1, value:1200, lastContact:"2026-07-08", nextAction:"Follow up call", nextActionDate:"2026-07-13" },
    { id:4, company:"AllLocks 24/7",           contact:"Mike Hassan",    phone:"07700 900321", email:"mike@alllocks.co.uk",       industry:"Locksmith",    stage:"New lead",     owner:3, value:900,  lastContact:"2026-07-07", nextAction:"First contact", nextActionDate:"2026-07-12" },
    { id:5, company:"City Garage Services",    contact:"Priya Sharma",   phone:"07700 900654", email:"priya@citygarage.co.uk",    industry:"Mechanic",     stage:"Trial",        owner:1, value:1800, lastContact:"2026-07-11", nextAction:"Check in", nextActionDate:"2026-07-16" },
  ],
  meetings: [
    { id:1, title:"Weekly Founders Meeting",  date:"2026-07-07", attendees:[1,2,3], agenda:"Review week, set priorities, discuss legal", notes:"Agreed to push founders agreement by EOW. Jordan to chase leads.", decisions:["Supabase confirmed as DB choice"], tasks:[3,6] },
  ],
  metrics: {
    leads: 12, demos: 3, demosCompleted: 2, trials: 1, customers: 0,
    mrr: 0, setupRevenue: 0, churn: 0, costs: 180, cash: 4200,
    targets: { leads: 30, customers: 5, mrr: 3000 }
  },
  weekly: {
    goal: "Secure first paying customer and finalise founders agreement",
    priorities: ["Close Riverside Auto Repairs demo", "Sign founders agreement", "Launch website MVP", "Define pricing", "Set up Supabase"],
    cody: ["Finalise legal docs", "Lead pitch deck", "Pricing strategy"],
    jordon: ["Supabase setup", "Website build", "Tech research"],
    jordan: ["Chase 5 new leads", "Run Riverside demo", "Open bank account"],
    blockers: ["Waiting on solicitor review of founders agreement"],
    wins: ["Company registered at Companies House", "Domain secured", "Brand finalised"],
  },
  documents: [
    { id:1, title:"Company Vision & Mission",  category:"Company",  author:1, updated:"2026-07-01", content:"CalmCall exists to ensure no small business owner ever loses a customer because they missed a phone call. We start with tradespeople and grow from there." },
    { id:2, title:"Brand Guidelines",          category:"Brand",    author:1, updated:"2026-07-05", content:"Teal (#2A7C6F), Charcoal (#1C2331), White, Gold accents. Typography: clean, modern sans-serif. Premium, calm, trustworthy." },
    { id:3, title:"Business Model",            category:"Product",  author:2, updated:"2026-07-08", content:"Monthly SaaS subscription. Starter: £49/mo. Growth: £99/mo. Pro: £199/mo. Optional setup fee: £149." },
  ],
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const today = () => new Date().toISOString().split("T")[0];
const fmt = d => d ? new Date(d).toLocaleDateString("en-GB",{day:"numeric",month:"short"}) : "—";
const founderById = id => FOUNDERS.find(f=>f.id===id);
const Avatar = ({id,size=28})=>{
  const f = founderById(id)||{initials:"?",color:T.charcoalL};
  return <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:size,height:size,borderRadius:"50%",background:f.color,color:"#fff",fontSize:size*0.38,fontWeight:700,flexShrink:0}}>{f.initials}</span>;
};
const Badge = ({label,color,bg})=>(
  <span style={{display:"inline-block",padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:600,color:color||T.charcoal,background:bg||T.border,letterSpacing:.3}}>{label}</span>
);
const statusColors = {
  "Active":{bg:T.tealXL,color:T.teal},"Planned":{bg:T.goldL,color:T.gold},
  "Paused":{bg:"#FFF3CD",color:"#856404"},"Complete":{bg:T.greenL,color:T.green},
  "Cancelled":{bg:T.redL,color:T.red},"In Progress":{bg:T.tealXL,color:T.teal},
  "Next":{bg:T.goldL,color:T.gold},"Backlog":{bg:T.border,color:T.charcoalL},
  "Waiting":{bg:"#FFF3CD",color:"#856404"},"Agreed":{bg:T.greenL,color:T.green},
  "Proposed":{bg:T.goldL,color:T.gold},"Reconsidering":{bg:"#FFF3CD",color:"#856404"},
  "Reversed":{bg:T.redL,color:T.red},"New":{bg:T.tealXL,color:T.teal},
  "Discussing":{bg:T.goldL,color:T.gold},"Approved":{bg:T.greenL,color:T.green},
  "Parked":{bg:T.border,color:T.charcoalL},"Rejected":{bg:T.redL,color:T.red},
  "Demo booked":{bg:T.tealXL,color:T.teal},"Interested":{bg:T.goldL,color:T.gold},
  "Contacted":{bg:T.border,color:T.charcoalL},"New lead":{bg:"#F0F0FF",color:"#6B5EA8"},
  "Trial":{bg:T.greenL,color:T.green},"Won":{bg:T.greenL,color:T.green},
  "Lost":{bg:T.redL,color:T.red},"Demo completed":{bg:T.tealXL,color:T.teal},
};
const SC = s => statusColors[s]||{bg:T.border,color:T.charcoalL};
const priorityColors = {
  "Critical":{bg:T.redL,color:T.red},"High":{bg:T.goldL,color:T.gold},
  "Normal":{bg:T.tealXL,color:T.teal},"Low":{bg:T.border,color:T.charcoalL},
};
const PC = p => priorityColors[p]||{bg:T.border,color:T.charcoalL};

// ─── MODAL ────────────────────────────────────────────────────────────────────
const Modal = ({title,onClose,children,width=560})=>(
  <div style={{position:"fixed",inset:0,background:"rgba(28,35,49,0.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}>
    <div style={{background:T.white,borderRadius:16,width:"100%",maxWidth:width,maxHeight:"90vh",overflowY:"auto",boxShadow:"0 24px 64px rgba(0,0,0,0.18)"}} onClick={e=>e.stopPropagation()}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"20px 24px 16px",borderBottom:`1px solid ${T.border}`}}>
        <h3 style={{margin:0,fontSize:17,fontWeight:700,color:T.charcoal}}>{title}</h3>
        <button onClick={onClose} style={{border:"none",background:"none",cursor:"pointer",fontSize:20,color:T.charcoalL,lineHeight:1}}>×</button>
      </div>
      <div style={{padding:24}}>{children}</div>
    </div>
  </div>
);

const Field = ({label,children})=>(
  <div style={{marginBottom:16}}>
    <label style={{display:"block",fontSize:12,fontWeight:600,color:T.charcoalL,marginBottom:4,textTransform:"uppercase",letterSpacing:.5}}>{label}</label>
    {children}
  </div>
);
const Input = (props)=>(
  <input {...props} style={{width:"100%",padding:"9px 12px",border:`1.5px solid ${T.border}`,borderRadius:8,fontSize:14,color:T.charcoal,background:T.white,outline:"none",boxSizing:"border-box",...props.style}}/>
);
const Select = ({children,...props})=>(
  <select {...props} style={{width:"100%",padding:"9px 12px",border:`1.5px solid ${T.border}`,borderRadius:8,fontSize:14,color:T.charcoal,background:T.white,outline:"none",boxSizing:"border-box",...props.style}}>
    {children}
  </select>
);
const Textarea = (props)=>(
  <textarea {...props} style={{width:"100%",padding:"9px 12px",border:`1.5px solid ${T.border}`,borderRadius:8,fontSize:14,color:T.charcoal,background:T.white,outline:"none",boxSizing:"border-box",resize:"vertical",minHeight:80,...props.style}}/>
);
const Btn = ({children,variant="primary",onClick,style={}})=>{
  const s = variant==="primary"?{background:T.teal,color:"#fff",border:"none"}:
             variant==="ghost"?{background:"none",color:T.charcoalL,border:`1.5px solid ${T.border}`}:
             {background:T.tealXL,color:T.teal,border:"none"};
  return <button onClick={onClick} style={{...s,padding:"9px 18px",borderRadius:8,fontSize:14,fontWeight:600,cursor:"pointer",...style}}>{children}</button>;
};

// ─── LOGIN ────────────────────────────────────────────────────────────────────
const Login = ({onLogin})=>{
  const [email,setEmail]=useState(""); const [pass,setPass]=useState(""); const [err,setErr]=useState("");
  const handle = ()=>{
    const f = FOUNDERS.find(f=>f.email===email.toLowerCase().trim());
    if(f && pass==="calmcall2026"){ onLogin(f); }
    else setErr("Invalid email or password.");
  };
  return (
    <div style={{minHeight:"100vh",background:T.cream,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{width:"100%",maxWidth:400}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <img src="/logo.jpg" alt="CalmCall" style={{width:160,height:160,objectFit:"contain",marginBottom:16,borderRadius:20}}/>
          <p style={{margin:0,color:T.charcoalL,fontSize:14,fontWeight:500}}>Founder workspace</p>
        </div>
        <div style={{background:T.white,borderRadius:16,padding:32,boxShadow:"0 4px 24px rgba(0,0,0,0.06)"}}>
          <Field label="Email">
            <Input type="email" placeholder="you@calmcall.co.uk" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handle()}/>
          </Field>
          <Field label="Password">
            <Input type="password" placeholder="••••••••••" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handle()}/>
          </Field>
          {err && <p style={{color:T.red,fontSize:13,marginBottom:12}}>{err}</p>}
          <Btn onClick={handle} style={{width:"100%",padding:"11px 18px",fontSize:15,marginTop:4}}>Sign in</Btn>
          <p style={{textAlign:"center",fontSize:12,color:T.charcoalL,marginTop:16,marginBottom:0}}>Password: <strong>calmcall2026</strong></p>
        </div>
      </div>
    </div>
  );
};

// ─── NAV ──────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  {id:"home",label:"Home",icon:"⌂"},
  {id:"weekly",label:"Weekly",icon:"◎"},
  {id:"tasks",label:"Tasks",icon:"✓"},
  {id:"projects",label:"Projects",icon:"◈"},
  {id:"crm",label:"CRM",icon:"◷"},
  {id:"decisions",label:"Decisions",icon:"⚑"},
  {id:"ideas",label:"Ideas",icon:"✦"},
  {id:"meetings",label:"Meetings",icon:"⊡"},
  {id:"library",label:"Library",icon:"⊞"},
  {id:"metrics",label:"Metrics",icon:"▲"},
];

// ─── HOME ─────────────────────────────────────────────────────────────────────
const Home = ({user,data,onNav})=>{
  const myTasks = data.tasks.filter(t=>t.assignee===user.id && t.status!=="Complete");
  const overdue = myTasks.filter(t=>t.due<today());
  const dueToday = myTasks.filter(t=>t.due===today());
  const recentDecisions = data.decisions.slice(-3).reverse();
  const m = data.metrics;

  return (
    <div>
      <div style={{marginBottom:28}}>
        <h2 style={{margin:"0 0 4px",fontSize:22,fontWeight:800,color:T.charcoal}}>Good morning, {user.name} 👋</h2>
        <p style={{margin:0,color:T.charcoalL,fontSize:14}}>{new Date().toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"})}</p>
      </div>

      {/* Weekly goal */}
      <div style={{background:T.teal,borderRadius:14,padding:"18px 22px",marginBottom:20,color:"#fff"}}>
        <p style={{margin:"0 0 4px",fontSize:11,fontWeight:700,opacity:.7,textTransform:"uppercase",letterSpacing:.5}}>This week's goal</p>
        <p style={{margin:0,fontSize:15,fontWeight:600}}>{data.weekly.goal}</p>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14,marginBottom:20}}>
        {[
          {label:"Overdue",value:overdue.length,color:overdue.length?T.red:T.green,bg:overdue.length?T.redL:T.greenL},
          {label:"Due Today",value:dueToday.length,color:T.gold,bg:T.goldL},
          {label:"My Open Tasks",value:myTasks.length,color:T.teal,bg:T.tealXL},
          {label:"Paying Customers",value:m.customers,color:T.charcoal,bg:T.cream},
        ].map(c=>(
          <div key={c.label} style={{background:c.bg,borderRadius:12,padding:"16px 18px"}}>
            <p style={{margin:"0 0 6px",fontSize:12,fontWeight:600,color:c.color,textTransform:"uppercase",letterSpacing:.5}}>{c.label}</p>
            <p style={{margin:0,fontSize:28,fontWeight:800,color:c.color}}>{c.value}</p>
          </div>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        {/* My tasks */}
        <div style={{background:T.white,borderRadius:14,padding:20,border:`1px solid ${T.border}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <h3 style={{margin:0,fontSize:14,fontWeight:700,color:T.charcoal}}>My Tasks</h3>
            <button onClick={()=>onNav("tasks")} style={{border:"none",background:"none",color:T.teal,fontSize:12,fontWeight:600,cursor:"pointer"}}>View all →</button>
          </div>
          {myTasks.slice(0,5).map(t=>(
            <div key={t.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`1px solid ${T.border}`}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:PC(t.priority).color,flexShrink:0}}/>
              <span style={{flex:1,fontSize:13,color:T.charcoal,fontWeight:500}}>{t.title}</span>
              <span style={{fontSize:11,color:t.due<today()?T.red:T.charcoalL}}>{fmt(t.due)}</span>
            </div>
          ))}
          {myTasks.length===0 && <p style={{color:T.charcoalL,fontSize:13,margin:0}}>All clear — no open tasks.</p>}
        </div>

        {/* Recent decisions */}
        <div style={{background:T.white,borderRadius:14,padding:20,border:`1px solid ${T.border}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <h3 style={{margin:0,fontSize:14,fontWeight:700,color:T.charcoal}}>Recent Decisions</h3>
            <button onClick={()=>onNav("decisions")} style={{border:"none",background:"none",color:T.teal,fontSize:12,fontWeight:600,cursor:"pointer"}}>View all →</button>
          </div>
          {recentDecisions.map(d=>(
            <div key={d.id} style={{padding:"8px 0",borderBottom:`1px solid ${T.border}`}}>
              <p style={{margin:"0 0 4px",fontSize:13,fontWeight:600,color:T.charcoal}}>{d.title}</p>
              <div style={{display:"flex",gap:6}}><Badge label={d.status} {...SC(d.status)}/><span style={{fontSize:11,color:T.charcoalL}}>{fmt(d.date)}</span></div>
            </div>
          ))}
        </div>

        {/* Weekly priorities */}
        <div style={{background:T.white,borderRadius:14,padding:20,border:`1px solid ${T.border}`}}>
          <h3 style={{margin:"0 0 14px",fontSize:14,fontWeight:700,color:T.charcoal}}>Company Priorities</h3>
          {data.weekly.priorities.map((p,i)=>(
            <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"6px 0",borderBottom:`1px solid ${T.border}`}}>
              <span style={{width:20,height:20,borderRadius:6,background:T.tealXL,color:T.teal,fontSize:11,fontWeight:700,display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</span>
              <span style={{fontSize:13,color:T.charcoal}}>{p}</span>
            </div>
          ))}
        </div>

        {/* My priorities */}
        <div style={{background:T.white,borderRadius:14,padding:20,border:`1px solid ${T.border}`}}>
          <h3 style={{margin:"0 0 14px",fontSize:14,fontWeight:700,color:T.charcoal}}>My Priorities This Week</h3>
          {(user.id===1?data.weekly.cody:user.id===2?data.weekly.jordon:data.weekly.jordan).map((p,i)=>(
            <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"6px 0",borderBottom:`1px solid ${T.border}`}}>
              <span style={{color:T.teal,fontWeight:700,fontSize:13,flexShrink:0}}>→</span>
              <span style={{fontSize:13,color:T.charcoal}}>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── TASKS ────────────────────────────────────────────────────────────────────
const Tasks = ({user,data,setData})=>{
  const [view,setView]=useState("all");
  const [showAdd,setShowAdd]=useState(false);
  const [form,setForm]=useState({title:"",description:"",assignee:user.id,priority:"Normal",status:"Next",due:"",area:"",project:""});

  const filtered = data.tasks.filter(t=>{
    if(view==="mine") return t.assignee===user.id;
    if(view==="today") return t.due===today();
    if(view==="overdue") return t.due<today() && t.status!=="Complete";
    if(view==="complete") return t.status==="Complete";
    return t.status!=="Complete";
  });

  const addTask = ()=>{
    if(!form.title.trim()) return;
    const t={...form,id:Date.now(),creator:user.id,assignee:parseInt(form.assignee)||user.id,project:parseInt(form.project)||null,createdDate:today()};
    setData(d=>({...d,tasks:[...d.tasks,t]}));
    setShowAdd(false);
    setForm({title:"",description:"",assignee:user.id,priority:"Normal",status:"Next",due:"",area:"",project:""});
  };

  const toggleStatus = (id)=>{
    setData(d=>({...d,tasks:d.tasks.map(t=>t.id===id?{...t,status:t.status==="Complete"?"Next":"Complete"}:t)}));
  };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{margin:0,fontSize:20,fontWeight:800,color:T.charcoal}}>Tasks</h2>
        <Btn onClick={()=>setShowAdd(true)}>+ Add Task</Btn>
      </div>

      <div style={{display:"flex",gap:6,marginBottom:20,flexWrap:"wrap"}}>
        {[["all","All"],["mine","Mine"],["today","Today"],["overdue","Overdue"],["complete","Complete"]].map(([v,l])=>(
          <button key={v} onClick={()=>setView(v)} style={{padding:"6px 14px",borderRadius:20,border:`1.5px solid ${view===v?T.teal:T.border}`,background:view===v?T.tealXL:"none",color:view===v?T.teal:T.charcoalL,fontSize:13,fontWeight:600,cursor:"pointer"}}>{l}</button>
        ))}
      </div>

      <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,overflow:"hidden"}}>
        {filtered.length===0 && <div style={{padding:40,textAlign:"center",color:T.charcoalL}}>No tasks here.</div>}
        {filtered.map((t,i)=>(
          <div key={t.id} style={{display:"flex",alignItems:"center",gap:12,padding:"13px 18px",borderBottom:i<filtered.length-1?`1px solid ${T.border}`:"none"}}>
            <button onClick={()=>toggleStatus(t.id)} style={{width:20,height:20,borderRadius:6,border:`2px solid ${t.status==="Complete"?T.teal:T.border}`,background:t.status==="Complete"?T.teal:"none",cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
              {t.status==="Complete" && <span style={{color:"#fff",fontSize:12}}>✓</span>}
            </button>
            <div style={{flex:1,minWidth:0}}>
              <p style={{margin:"0 0 4px",fontSize:14,fontWeight:600,color:t.status==="Complete"?T.charcoalL:T.charcoal,textDecoration:t.status==="Complete"?"line-through":"none"}}>{t.title}</p>
              <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
                <Badge label={t.priority} {...PC(t.priority)}/>
                <Badge label={t.status} {...SC(t.status)}/>
                {t.area && <Badge label={t.area} bg={T.cream} color={T.charcoalL}/>}
              </div>
            </div>
            <Avatar id={t.assignee} size={26}/>
            <span style={{fontSize:12,color:t.due<today()&&t.status!=="Complete"?T.red:T.charcoalL,flexShrink:0,minWidth:52,textAlign:"right"}}>{fmt(t.due)}</span>
          </div>
        ))}
      </div>

      {showAdd && (
        <Modal title="New Task" onClose={()=>setShowAdd(false)}>
          <Field label="Title"><Input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="What needs doing?"/></Field>
          <Field label="Description"><Textarea value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} placeholder="More detail..."/></Field>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <Field label="Assign to"><Select value={form.assignee} onChange={e=>setForm(f=>({...f,assignee:e.target.value}))}>{FOUNDERS.map(f=><option key={f.id} value={f.id}>{f.name}</option>)}</Select></Field>
            <Field label="Priority"><Select value={form.priority} onChange={e=>setForm(f=>({...f,priority:e.target.value}))}>{["Critical","High","Normal","Low"].map(p=><option key={p}>{p}</option>)}</Select></Field>
            <Field label="Status"><Select value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>{["Backlog","Next","In Progress","Waiting","Complete"].map(s=><option key={s}>{s}</option>)}</Select></Field>
            <Field label="Due Date"><Input type="date" value={form.due} onChange={e=>setForm(f=>({...f,due:e.target.value}))}/></Field>
            <Field label="Area"><Input value={form.area} onChange={e=>setForm(f=>({...f,area:e.target.value}))} placeholder="e.g. Sales, Tech..."/></Field>
            <Field label="Project"><Select value={form.project} onChange={e=>setForm(f=>({...f,project:e.target.value}))}><option value="">No project</option>{data.projects.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</Select></Field>
          </div>
          <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:8}}>
            <Btn variant="ghost" onClick={()=>setShowAdd(false)}>Cancel</Btn>
            <Btn onClick={addTask}>Save Task</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
const Projects = ({data,setData,user})=>{
  const [showAdd,setShowAdd]=useState(false);
  const [selected,setSelected]=useState(null);
  const [form,setForm]=useState({name:"",objective:"",owner:user.id,priority:"Normal",status:"Planned",startDate:"",targetDate:""});

  const add = ()=>{
    if(!form.name.trim()) return;
    setData(d=>({...d,projects:[...d.projects,{...form,id:Date.now(),progress:0,owner:parseInt(form.owner)}]}));
    setShowAdd(false); setForm({name:"",objective:"",owner:user.id,priority:"Normal",status:"Planned",startDate:"",targetDate:""});
  };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{margin:0,fontSize:20,fontWeight:800,color:T.charcoal}}>Projects</h2>
        <Btn onClick={()=>setShowAdd(true)}>+ New Project</Btn>
      </div>

      <div style={{display:"grid",gap:12}}>
        {data.projects.map(p=>(
          <div key={p.id} onClick={()=>setSelected(p)} style={{background:T.white,borderRadius:14,padding:"18px 20px",border:`1px solid ${T.border}`,cursor:"pointer",transition:"box-shadow .15s"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12,flexWrap:"wrap"}}>
              <div style={{flex:1,minWidth:200}}>
                <h3 style={{margin:"0 0 4px",fontSize:15,fontWeight:700,color:T.charcoal}}>{p.name}</h3>
                <p style={{margin:"0 0 10px",fontSize:13,color:T.charcoalL}}>{p.objective}</p>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  <Badge label={p.status} {...SC(p.status)}/>
                  <Badge label={p.priority} {...PC(p.priority)}/>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
                <Avatar id={p.owner} size={28}/>
                <div style={{textAlign:"right"}}>
                  <p style={{margin:"0 0 2px",fontSize:11,color:T.charcoalL}}>Progress</p>
                  <p style={{margin:0,fontSize:15,fontWeight:700,color:T.teal}}>{p.progress}%</p>
                </div>
              </div>
            </div>
            <div style={{marginTop:12,height:4,borderRadius:4,background:T.border}}>
              <div style={{height:"100%",borderRadius:4,background:T.teal,width:`${p.progress}%`,transition:"width .3s"}}/>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <Modal title={selected.name} onClose={()=>setSelected(null)} width={640}>
          <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
            <Badge label={selected.status} {...SC(selected.status)}/>
            <Badge label={selected.priority} {...PC(selected.priority)}/>
          </div>
          <p style={{color:T.charcoalL,fontSize:14,marginBottom:16}}>{selected.objective}</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
            <div><p style={{margin:"0 0 2px",fontSize:11,color:T.charcoalL,textTransform:"uppercase",letterSpacing:.5,fontWeight:600}}>Owner</p><div style={{display:"flex",alignItems:"center",gap:8}}><Avatar id={selected.owner} size={22}/><span style={{fontSize:13,color:T.charcoal}}>{founderById(selected.owner)?.name}</span></div></div>
            <div><p style={{margin:"0 0 2px",fontSize:11,color:T.charcoalL,textTransform:"uppercase",letterSpacing:.5,fontWeight:600}}>Target Date</p><p style={{margin:0,fontSize:13,color:T.charcoal}}>{fmt(selected.targetDate)}</p></div>
          </div>
          <h4 style={{fontSize:13,fontWeight:700,color:T.charcoal,marginBottom:10}}>Tasks</h4>
          {data.tasks.filter(t=>t.project===selected.id).map(t=>(
            <div key={t.id} style={{display:"flex",gap:8,alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${T.border}`}}>
              <Badge label={t.status} {...SC(t.status)}/>
              <span style={{flex:1,fontSize:13,color:T.charcoal}}>{t.title}</span>
              <Avatar id={t.assignee} size={22}/>
            </div>
          ))}
        </Modal>
      )}

      {showAdd && (
        <Modal title="New Project" onClose={()=>setShowAdd(false)}>
          <Field label="Project Name"><Input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="What are we building?"/></Field>
          <Field label="Objective"><Textarea value={form.objective} onChange={e=>setForm(f=>({...f,objective:e.target.value}))} placeholder="What does success look like?"/></Field>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <Field label="Owner"><Select value={form.owner} onChange={e=>setForm(f=>({...f,owner:e.target.value}))}>{FOUNDERS.map(f=><option key={f.id} value={f.id}>{f.name}</option>)}</Select></Field>
            <Field label="Priority"><Select value={form.priority} onChange={e=>setForm(f=>({...f,priority:e.target.value}))}>{["Critical","High","Normal","Low"].map(p=><option key={p}>{p}</option>)}</Select></Field>
            <Field label="Status"><Select value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>{["Planned","Active","Paused","Complete","Cancelled"].map(s=><option key={s}>{s}</option>)}</Select></Field>
            <Field label="Target Date"><Input type="date" value={form.targetDate} onChange={e=>setForm(f=>({...f,targetDate:e.target.value}))}/></Field>
          </div>
          <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:8}}>
            <Btn variant="ghost" onClick={()=>setShowAdd(false)}>Cancel</Btn>
            <Btn onClick={add}>Create Project</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ─── WEEKLY ───────────────────────────────────────────────────────────────────
const Weekly = ({data,setData})=>{
  const w = data.weekly;
  const [editing,setEditing]=useState(false);
  const [form,setForm]=useState({...w});

  const save = ()=>{setData(d=>({...d,weekly:form}));setEditing(false);};

  const Section = ({title,items,color=T.teal})=>(
    <div style={{background:T.white,borderRadius:14,padding:20,border:`1px solid ${T.border}`}}>
      <h3 style={{margin:"0 0 12px",fontSize:14,fontWeight:700,color:T.charcoal}}>{title}</h3>
      {items.map((item,i)=>(
        <div key={i} style={{display:"flex",gap:10,padding:"7px 0",borderBottom:i<items.length-1?`1px solid ${T.border}`:"none",alignItems:"flex-start"}}>
          <span style={{color,fontWeight:700,fontSize:14,flexShrink:0,marginTop:1}}>→</span>
          <span style={{fontSize:13,color:T.charcoal}}>{item}</span>
        </div>
      ))}
      {items.length===0 && <p style={{color:T.charcoalL,fontSize:13,margin:0}}>Nothing added yet.</p>}
    </div>
  );

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{margin:0,fontSize:20,fontWeight:800,color:T.charcoal}}>Weekly Command Centre</h2>
        <Btn onClick={()=>editing?save():setEditing(true)}>{editing?"Save Week":"Edit Week"}</Btn>
      </div>

      <div style={{background:T.teal,borderRadius:14,padding:"20px 24px",marginBottom:20,color:"#fff"}}>
        <p style={{margin:"0 0 6px",fontSize:11,fontWeight:700,opacity:.7,textTransform:"uppercase",letterSpacing:.5}}>This week's main goal</p>
        {editing
          ? <Input value={form.goal} onChange={e=>setForm(f=>({...f,goal:e.target.value}))} style={{background:"rgba(255,255,255,0.15)",border:"none",color:"#fff",fontSize:15,fontWeight:600}}/>
          : <p style={{margin:0,fontSize:17,fontWeight:700}}>{w.goal}</p>}
      </div>

      {editing ? (
        <div style={{display:"grid",gap:16}}>
          {[["Company Priorities","priorities"],["Cody's Focus","cody"],["Jordon's Focus","jordon"],["Jordan's Focus","jordan"],["Blockers","blockers"],["Wins This Week","wins"]].map(([label,key])=>(
            <div key={key} style={{background:T.white,borderRadius:14,padding:20,border:`1px solid ${T.border}`}}>
              <h3 style={{margin:"0 0 10px",fontSize:14,fontWeight:700,color:T.charcoal}}>{label}</h3>
              <Textarea value={(form[key]||[]).join("\n")} onChange={e=>setForm(f=>({...f,[key]:e.target.value.split("\n")}))} placeholder="One item per line..."/>
            </div>
          ))}
        </div>
      ):(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <Section title="Company Priorities" items={w.priorities}/>
          <Section title="Blockers" items={w.blockers} color={T.red}/>
          <Section title="Cody's Focus" items={w.cody} color={FOUNDERS[0].color}/>
          <Section title="Jordon's Focus" items={w.jordon} color={FOUNDERS[1].color}/>
          <Section title="Jordan's Focus" items={w.jordan} color={FOUNDERS[2].color}/>
          <Section title="Wins This Week 🎉" items={w.wins} color={T.green}/>
        </div>
      )}
    </div>
  );
};

// ─── DECISIONS ────────────────────────────────────────────────────────────────
const Decisions = ({data,setData,user})=>{
  const [showAdd,setShowAdd]=useState(false);
  const [form,setForm]=useState({title:"",decision:"",reasoning:"",people:[user.id],status:"Proposed",date:today(),project:""});

  const add = ()=>{
    if(!form.title.trim()) return;
    setData(d=>({...d,decisions:[...d.decisions,{...form,id:Date.now(),project:parseInt(form.project)||null}]}));
    setShowAdd(false);
  };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{margin:0,fontSize:20,fontWeight:800,color:T.charcoal}}>Decisions Log</h2>
        <Btn onClick={()=>setShowAdd(true)}>+ Log Decision</Btn>
      </div>
      <div style={{display:"grid",gap:12}}>
        {data.decisions.slice().reverse().map(d=>(
          <div key={d.id} style={{background:T.white,borderRadius:14,padding:"18px 20px",border:`1px solid ${T.border}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12,flexWrap:"wrap",marginBottom:8}}>
              <h3 style={{margin:0,fontSize:15,fontWeight:700,color:T.charcoal}}>{d.title}</h3>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <Badge label={d.status} {...SC(d.status)}/>
                <span style={{fontSize:12,color:T.charcoalL}}>{fmt(d.date)}</span>
              </div>
            </div>
            <p style={{margin:"0 0 6px",fontSize:13,color:T.charcoal,fontWeight:500}}>Decision: {d.decision}</p>
            <p style={{margin:"0 0 10px",fontSize:13,color:T.charcoalL}}>Rationale: {d.reasoning}</p>
            <div style={{display:"flex",gap:4}}>
              {(d.people||[]).map(pid=><Avatar key={pid} id={pid} size={22}/>)}
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <Modal title="Log a Decision" onClose={()=>setShowAdd(false)}>
          <Field label="Decision Title"><Input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="What was decided?"/></Field>
          <Field label="Decision Made"><Textarea value={form.decision} onChange={e=>setForm(f=>({...f,decision:e.target.value}))} placeholder="State the decision clearly..."/></Field>
          <Field label="Reasoning"><Textarea value={form.reasoning} onChange={e=>setForm(f=>({...f,reasoning:e.target.value}))} placeholder="Why did you decide this?"/></Field>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <Field label="Status"><Select value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>{["Proposed","Agreed","Reconsidering","Reversed"].map(s=><option key={s}>{s}</option>)}</Select></Field>
            <Field label="Date"><Input type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/></Field>
          </div>
          <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:8}}>
            <Btn variant="ghost" onClick={()=>setShowAdd(false)}>Cancel</Btn>
            <Btn onClick={add}>Save Decision</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ─── IDEAS ────────────────────────────────────────────────────────────────────
const Ideas = ({data,setData,user})=>{
  const [showAdd,setShowAdd]=useState(false);
  const [form,setForm]=useState({title:"",description:"",category:"Product",value:"Medium",effort:"Medium",status:"New"});

  const add = ()=>{
    if(!form.title.trim()) return;
    setData(d=>({...d,ideas:[...d.ideas,{...form,id:Date.now(),submittedBy:user.id,date:today()}]}));
    setShowAdd(false);
    setForm({title:"",description:"",category:"Product",value:"Medium",effort:"Medium",status:"New"});
  };

  const promote = (idea)=>{
    const proj = {id:Date.now(),name:idea.title,objective:idea.description,owner:idea.submittedBy,priority:"Normal",status:"Planned",progress:0,startDate:today(),targetDate:""};
    setData(d=>({...d,projects:[...d.projects,proj],ideas:d.ideas.map(i=>i.id===idea.id?{...i,status:"Converted into project"}:i)}));
  };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{margin:0,fontSize:20,fontWeight:800,color:T.charcoal}}>Ideas Vault</h2>
        <Btn onClick={()=>setShowAdd(true)}>+ Add Idea</Btn>
      </div>
      <div style={{display:"grid",gap:12}}>
        {data.ideas.map(idea=>(
          <div key={idea.id} style={{background:T.white,borderRadius:14,padding:"18px 20px",border:`1px solid ${T.border}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12,flexWrap:"wrap"}}>
              <div style={{flex:1}}>
                <h3 style={{margin:"0 0 4px",fontSize:15,fontWeight:700,color:T.charcoal}}>{idea.title}</h3>
                <p style={{margin:"0 0 10px",fontSize:13,color:T.charcoalL}}>{idea.description}</p>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  <Badge label={idea.status} {...SC(idea.status)}/>
                  <Badge label={`Value: ${idea.value}`} bg={T.greenL} color={T.green}/>
                  <Badge label={`Effort: ${idea.effort}`} bg={T.goldL} color={T.gold}/>
                  <Badge label={idea.category} bg={T.tealXL} color={T.teal}/>
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:6,alignItems:"flex-end"}}>
                <Avatar id={idea.submittedBy} size={26}/>
                {idea.status==="Approved" && <Btn variant="soft" onClick={()=>promote(idea)} style={{fontSize:11,padding:"4px 10px"}}>→ Project</Btn>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <Modal title="New Idea" onClose={()=>setShowAdd(false)}>
          <Field label="Title"><Input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="The idea in one line..."/></Field>
          <Field label="Description"><Textarea value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} placeholder="A bit more detail..."/></Field>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <Field label="Category"><Select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>{["Product","Growth","Operations","Marketing","Tech","Legal"].map(c=><option key={c}>{c}</option>)}</Select></Field>
            <Field label="Status"><Select value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>{["New","Discussing","Approved","Parked","Rejected"].map(s=><option key={s}>{s}</option>)}</Select></Field>
            <Field label="Potential Value"><Select value={form.value} onChange={e=>setForm(f=>({...f,value:e.target.value}))}>{["Very High","High","Medium","Low"].map(v=><option key={v}>{v}</option>)}</Select></Field>
            <Field label="Estimated Effort"><Select value={form.effort} onChange={e=>setForm(f=>({...f,effort:e.target.value}))}>{["Low","Medium","High","Very High"].map(v=><option key={v}>{v}</option>)}</Select></Field>
          </div>
          <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:8}}>
            <Btn variant="ghost" onClick={()=>setShowAdd(false)}>Cancel</Btn>
            <Btn onClick={add}>Save Idea</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ─── CRM ──────────────────────────────────────────────────────────────────────
const CRM = ({data,setData,user})=>{
  const [showAdd,setShowAdd]=useState(false);
  const [selected,setSelected]=useState(null);
  const [form,setForm]=useState({company:"",contact:"",phone:"",email:"",industry:"Mechanic",stage:"New lead",owner:user.id,value:1200,nextAction:"",nextActionDate:""});

  const add = ()=>{
    if(!form.company.trim()) return;
    setData(d=>({...d,leads:[...d.leads,{...form,id:Date.now(),lastContact:today(),owner:parseInt(form.owner),value:parseInt(form.value)||0}]}));
    setShowAdd(false);
  };

  const updateStage = (id,stage)=>setData(d=>({...d,leads:d.leads.map(l=>l.id===id?{...l,stage,lastContact:today()}:l)}));

  const stages = ["New lead","Contacted","Interested","Demo booked","Demo completed","Trial","Won","Lost"];

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{margin:0,fontSize:20,fontWeight:800,color:T.charcoal}}>CRM</h2>
        <Btn onClick={()=>setShowAdd(true)}>+ Add Lead</Btn>
      </div>

      <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,overflow:"hidden"}}>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",minWidth:700}}>
            <thead>
              <tr style={{background:T.cream}}>
                {["Company","Contact","Industry","Stage","Owner","Value","Next Action","Due"].map(h=>(
                  <th key={h} style={{padding:"10px 14px",textAlign:"left",fontSize:11,fontWeight:700,color:T.charcoalL,textTransform:"uppercase",letterSpacing:.5,whiteSpace:"nowrap"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.leads.map((l,i)=>(
                <tr key={l.id} onClick={()=>setSelected(l)} style={{borderTop:`1px solid ${T.border}`,cursor:"pointer"}}>
                  <td style={{padding:"12px 14px"}}><span style={{fontSize:14,fontWeight:600,color:T.charcoal}}>{l.company}</span></td>
                  <td style={{padding:"12px 14px",fontSize:13,color:T.charcoalL}}>{l.contact}</td>
                  <td style={{padding:"12px 14px"}}><Badge label={l.industry} bg={T.tealXL} color={T.teal}/></td>
                  <td style={{padding:"12px 14px"}}><Badge label={l.stage} {...SC(l.stage)}/></td>
                  <td style={{padding:"12px 14px"}}><Avatar id={l.owner} size={24}/></td>
                  <td style={{padding:"12px 14px",fontSize:13,fontWeight:600,color:T.charcoal}}>£{l.value?.toLocaleString()}</td>
                  <td style={{padding:"12px 14px",fontSize:13,color:T.charcoal}}>{l.nextAction}</td>
                  <td style={{padding:"12px 14px",fontSize:12,color:l.nextActionDate<today()?T.red:T.charcoalL}}>{fmt(l.nextActionDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <Modal title={selected.company} onClose={()=>setSelected(null)} width={580}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
            <div><p style={{margin:"0 0 2px",fontSize:11,color:T.charcoalL,textTransform:"uppercase",letterSpacing:.5,fontWeight:600}}>Contact</p><p style={{margin:0,fontSize:14,color:T.charcoal}}>{selected.contact}</p></div>
            <div><p style={{margin:"0 0 2px",fontSize:11,color:T.charcoalL,textTransform:"uppercase",letterSpacing:.5,fontWeight:600}}>Phone</p><p style={{margin:0,fontSize:14,color:T.charcoal}}>{selected.phone}</p></div>
            <div><p style={{margin:"0 0 2px",fontSize:11,color:T.charcoalL,textTransform:"uppercase",letterSpacing:.5,fontWeight:600}}>Email</p><p style={{margin:0,fontSize:14,color:T.teal}}>{selected.email}</p></div>
            <div><p style={{margin:"0 0 2px",fontSize:11,color:T.charcoalL,textTransform:"uppercase",letterSpacing:.5,fontWeight:600}}>Value</p><p style={{margin:0,fontSize:14,fontWeight:700,color:T.charcoal}}>£{selected.value?.toLocaleString()}/yr</p></div>
          </div>
          <div style={{marginBottom:16}}>
            <p style={{margin:"0 0 8px",fontSize:12,fontWeight:700,color:T.charcoalL,textTransform:"uppercase",letterSpacing:.5}}>Update Stage</p>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {stages.map(s=>(
                <button key={s} onClick={()=>{updateStage(selected.id,s);setSelected({...selected,stage:s});}} style={{padding:"5px 10px",borderRadius:20,border:`1.5px solid ${selected.stage===s?T.teal:T.border}`,background:selected.stage===s?T.tealXL:"none",color:selected.stage===s?T.teal:T.charcoalL,fontSize:12,fontWeight:600,cursor:"pointer"}}>{s}</button>
              ))}
            </div>
          </div>
          <div style={{background:T.goldL,borderRadius:10,padding:"12px 14px"}}>
            <p style={{margin:"0 0 4px",fontSize:12,fontWeight:700,color:T.gold,textTransform:"uppercase",letterSpacing:.5}}>Next Action</p>
            <p style={{margin:0,fontSize:13,color:T.charcoal}}>{selected.nextAction} — {fmt(selected.nextActionDate)}</p>
          </div>
        </Modal>
      )}

      {showAdd && (
        <Modal title="Add Lead" onClose={()=>setShowAdd(false)}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <Field label="Company Name"><Input value={form.company} onChange={e=>setForm(f=>({...f,company:e.target.value}))} placeholder="Business name"/></Field>
            <Field label="Contact Name"><Input value={form.contact} onChange={e=>setForm(f=>({...f,contact:e.target.value}))} placeholder="Main contact"/></Field>
            <Field label="Phone"><Input value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="07..."/></Field>
            <Field label="Email"><Input value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="email@..."/></Field>
            <Field label="Industry"><Select value={form.industry} onChange={e=>setForm(f=>({...f,industry:e.target.value}))}>{["Mechanic","Plumber","Electrician","Locksmith","Tradesperson","Other"].map(i=><option key={i}>{i}</option>)}</Select></Field>
            <Field label="Stage"><Select value={form.stage} onChange={e=>setForm(f=>({...f,stage:e.target.value}))}>{stages.map(s=><option key={s}>{s}</option>)}</Select></Field>
            <Field label="Owner"><Select value={form.owner} onChange={e=>setForm(f=>({...f,owner:e.target.value}))}>{FOUNDERS.map(f=><option key={f.id} value={f.id}>{f.name}</option>)}</Select></Field>
            <Field label="Annual Value (£)"><Input type="number" value={form.value} onChange={e=>setForm(f=>({...f,value:e.target.value}))}/></Field>
            <Field label="Next Action"><Input value={form.nextAction} onChange={e=>setForm(f=>({...f,nextAction:e.target.value}))} placeholder="e.g. Send proposal"/></Field>
            <Field label="Action Date"><Input type="date" value={form.nextActionDate} onChange={e=>setForm(f=>({...f,nextActionDate:e.target.value}))}/></Field>
          </div>
          <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:8}}>
            <Btn variant="ghost" onClick={()=>setShowAdd(false)}>Cancel</Btn>
            <Btn onClick={add}>Add Lead</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ─── MEETINGS ─────────────────────────────────────────────────────────────────
const Meetings = ({data,setData,user})=>{
  const [showAdd,setShowAdd]=useState(false);
  const [form,setForm]=useState({title:"Weekly Founders Meeting",date:today(),attendees:[1,2,3],agenda:"",notes:"",decisions:"",tasks:""});

  const add = ()=>{
    if(!form.title.trim()) return;
    setData(d=>({...d,meetings:[...d.meetings,{...form,id:Date.now()}]}));
    setShowAdd(false);
  };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{margin:0,fontSize:20,fontWeight:800,color:T.charcoal}}>Meetings</h2>
        <Btn onClick={()=>setShowAdd(true)}>+ New Meeting</Btn>
      </div>
      <div style={{display:"grid",gap:12}}>
        {data.meetings.slice().reverse().map(m=>(
          <div key={m.id} style={{background:T.white,borderRadius:14,padding:"18px 20px",border:`1px solid ${T.border}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <h3 style={{margin:0,fontSize:15,fontWeight:700,color:T.charcoal}}>{m.title}</h3>
              <span style={{fontSize:12,color:T.charcoalL}}>{fmt(m.date)}</span>
            </div>
            <div style={{display:"flex",gap:4,marginBottom:10}}>{(m.attendees||[]).map(id=><Avatar key={id} id={id} size={24}/>)}</div>
            {m.notes && <p style={{margin:"0 0 6px",fontSize:13,color:T.charcoal}}>{m.notes}</p>}
            {m.decisions && <div style={{background:T.greenL,borderRadius:8,padding:"8px 12px",marginTop:8}}><p style={{margin:"0 0 2px",fontSize:11,fontWeight:700,color:T.green,textTransform:"uppercase",letterSpacing:.5}}>Decisions</p><p style={{margin:0,fontSize:13,color:T.charcoal}}>{m.decisions}</p></div>}
          </div>
        ))}
      </div>

      {showAdd && (
        <Modal title="New Meeting" onClose={()=>setShowAdd(false)} width={580}>
          <Field label="Meeting Title"><Input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))}/></Field>
          <Field label="Date"><Input type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/></Field>
          <Field label="Agenda"><Textarea value={form.agenda} onChange={e=>setForm(f=>({...f,agenda:e.target.value}))} placeholder="What are we covering?"/></Field>
          <Field label="Notes"><Textarea value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} placeholder="Discussion notes..."/></Field>
          <Field label="Decisions Made"><Textarea value={form.decisions} onChange={e=>setForm(f=>({...f,decisions:e.target.value}))} placeholder="What was agreed?"/></Field>
          <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:8}}>
            <Btn variant="ghost" onClick={()=>setShowAdd(false)}>Cancel</Btn>
            <Btn onClick={add}>Save Meeting</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ─── LIBRARY ──────────────────────────────────────────────────────────────────
const Library = ({data,setData,user})=>{
  const [showAdd,setShowAdd]=useState(false);
  const [selected,setSelected]=useState(null);
  const [form,setForm]=useState({title:"",category:"Company",content:""});

  const add = ()=>{
    if(!form.title.trim()) return;
    setData(d=>({...d,documents:[...d.documents,{...form,id:Date.now(),author:user.id,updated:today()}]}));
    setShowAdd(false);
  };

  const cats = ["Company","Brand","Product","Sales","Marketing","Operations","Legal","Finance","Research","Templates"];

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{margin:0,fontSize:20,fontWeight:800,color:T.charcoal}}>Library</h2>
        <Btn onClick={()=>setShowAdd(true)}>+ New Doc</Btn>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12}}>
        {data.documents.map(doc=>(
          <div key={doc.id} onClick={()=>setSelected(doc)} style={{background:T.white,borderRadius:14,padding:"18px 20px",border:`1px solid ${T.border}`,cursor:"pointer"}}>
            <Badge label={doc.category} bg={T.tealXL} color={T.teal}/>
            <h3 style={{margin:"10px 0 6px",fontSize:14,fontWeight:700,color:T.charcoal}}>{doc.title}</h3>
            <p style={{margin:"0 0 10px",fontSize:12,color:T.charcoalL,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{doc.content}</p>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <Avatar id={doc.author} size={20}/>
              <span style={{fontSize:11,color:T.charcoalL}}>{fmt(doc.updated)}</span>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <Modal title={selected.title} onClose={()=>setSelected(null)} width={640}>
          <Badge label={selected.category} bg={T.tealXL} color={T.teal}/>
          <div style={{marginTop:16,fontSize:14,color:T.charcoal,lineHeight:1.7,whiteSpace:"pre-wrap"}}>{selected.content}</div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:20,paddingTop:16,borderTop:`1px solid ${T.border}`}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}><Avatar id={selected.author} size={22}/><span style={{fontSize:12,color:T.charcoalL}}>{founderById(selected.author)?.name}</span></div>
            <span style={{fontSize:12,color:T.charcoalL}}>Updated {fmt(selected.updated)}</span>
          </div>
        </Modal>
      )}

      {showAdd && (
        <Modal title="New Document" onClose={()=>setShowAdd(false)} width={620}>
          <Field label="Title"><Input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="Document title..."/></Field>
          <Field label="Category"><Select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>{cats.map(c=><option key={c}>{c}</option>)}</Select></Field>
          <Field label="Content"><Textarea value={form.content} onChange={e=>setForm(f=>({...f,content:e.target.value}))} style={{minHeight:200}} placeholder="Write your document here..."/></Field>
          <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:8}}>
            <Btn variant="ghost" onClick={()=>setShowAdd(false)}>Cancel</Btn>
            <Btn onClick={add}>Save Document</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ─── METRICS ──────────────────────────────────────────────────────────────────
const Metrics = ({data,setData})=>{
  const [editing,setEditing]=useState(false);
  const [form,setForm]=useState({...data.metrics});
  const m = data.metrics;

  const save = ()=>{setData(d=>({...d,metrics:{...form}}));setEditing(false);};

  const StatCard = ({label,value,target,prefix=""})=>{
    const pct = target ? Math.min(100,Math.round((value/target)*100)) : null;
    return (
      <div style={{background:T.white,borderRadius:12,padding:"16px 18px",border:`1px solid ${T.border}`}}>
        <p style={{margin:"0 0 4px",fontSize:11,fontWeight:700,color:T.charcoalL,textTransform:"uppercase",letterSpacing:.5}}>{label}</p>
        <p style={{margin:"0 0 6px",fontSize:26,fontWeight:800,color:T.charcoal}}>{prefix}{typeof value==="number"?value.toLocaleString():value}</p>
        {target && <><div style={{height:4,borderRadius:4,background:T.border,marginBottom:4}}><div style={{height:"100%",borderRadius:4,background:pct>=100?T.green:T.teal,width:`${pct}%`,transition:"width .3s"}}/></div><p style={{margin:0,fontSize:11,color:T.charcoalL}}>{pct}% of {prefix}{target?.toLocaleString()} target</p></>}
      </div>
    );
  };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{margin:0,fontSize:20,fontWeight:800,color:T.charcoal}}>Business Metrics</h2>
        <Btn onClick={()=>editing?save():setEditing(true)}>{editing?"Save Numbers":"Update Numbers"}</Btn>
      </div>

      {editing ? (
        <div style={{background:T.white,borderRadius:14,padding:24,border:`1px solid ${T.border}`}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:14}}>
            {[["leads","Leads"],["demos","Demos Booked"],["demosCompleted","Demos Completed"],["trials","Trials"],["customers","Paying Customers"],["mrr","MRR (£)"],["setupRevenue","Setup Revenue (£)"],["churn","Churn"],["costs","Monthly Costs (£)"],["cash","Cash Position (£)"]].map(([k,l])=>(
              <Field key={k} label={l}><Input type="number" value={form[k]} onChange={e=>setForm(f=>({...f,[k]:parseInt(e.target.value)||0}))}/></Field>
            ))}
          </div>
          <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:8}}>
            <Btn variant="ghost" onClick={()=>setEditing(false)}>Cancel</Btn>
            <Btn onClick={save}>Save</Btn>
          </div>
        </div>
      ):(
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:14}}>
          <StatCard label="Leads" value={m.leads} target={m.targets.leads}/>
          <StatCard label="Demos Booked" value={m.demos}/>
          <StatCard label="Demos Completed" value={m.demosCompleted}/>
          <StatCard label="Trials" value={m.trials}/>
          <StatCard label="Paying Customers" value={m.customers} target={m.targets.customers}/>
          <StatCard label="MRR" value={m.mrr} target={m.targets.mrr} prefix="£"/>
          <StatCard label="Setup Revenue" value={m.setupRevenue} prefix="£"/>
          <StatCard label="Monthly Costs" value={m.costs} prefix="£"/>
          <StatCard label="Cash Position" value={m.cash} prefix="£"/>
          <StatCard label="Churn" value={m.churn}/>
        </div>
      )}
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user,setUser] = useState(null);
  const [page,setPage] = useState("home");
  const [data,setData] = useState(SEED);
  const [mobileNav,setMobileNav] = useState(false);
  const [search,setSearch] = useState("");
  const [searchResults,setSearchResults] = useState([]);

  useEffect(()=>{
    if(search.length<2){setSearchResults([]);return;}
    const q = search.toLowerCase();
    const results = [
      ...data.tasks.filter(t=>t.title.toLowerCase().includes(q)).map(t=>({type:"Task",label:t.title,id:t.id,nav:"tasks"})),
      ...data.projects.filter(p=>p.name.toLowerCase().includes(q)).map(p=>({type:"Project",label:p.name,id:p.id,nav:"projects"})),
      ...data.decisions.filter(d=>d.title.toLowerCase().includes(q)).map(d=>({type:"Decision",label:d.title,id:d.id,nav:"decisions"})),
      ...data.ideas.filter(i=>i.title.toLowerCase().includes(q)).map(i=>({type:"Idea",label:i.title,id:i.id,nav:"ideas"})),
      ...data.leads.filter(l=>l.company.toLowerCase().includes(q)||l.contact.toLowerCase().includes(q)).map(l=>({type:"Lead",label:l.company,id:l.id,nav:"crm"})),
    ].slice(0,8);
    setSearchResults(results);
  },[search,data]);

  if(!user) return <Login onLogin={setUser}/>;

  const navTo = (p)=>{setPage(p);setMobileNav(false);setSearch("");setSearchResults([]);};

  const NavSidebar = ()=>(
    <div style={{width:220,flexShrink:0,background:T.charcoal,minHeight:"100vh",display:"flex",flexDirection:"column",padding:"0 0 24px"}}>
      {/* Logo */}
      <div style={{padding:"16px 20px",borderBottom:`1px solid rgba(255,255,255,0.08)`}}>
        <img src="/logo.jpg" alt="CalmCall" style={{width:"100%",maxWidth:160,objectFit:"contain",borderRadius:10,display:"block",margin:"0 auto"}}/>
      </div>

      {/* User */}
      <div style={{padding:"14px 20px",borderBottom:`1px solid rgba(255,255,255,0.08)`,display:"flex",alignItems:"center",gap:10}}>
        <Avatar id={user.id} size={30}/>
        <div>
          <p style={{margin:0,fontSize:13,fontWeight:600,color:"#fff"}}>{user.name}</p>
          <p style={{margin:0,fontSize:10,color:"rgba(255,255,255,0.4)"}}>{user.role.split(" ")[0]}</p>
        </div>
      </div>

      {/* Nav */}
      <nav style={{flex:1,padding:"10px 10px"}}>
        {NAV_ITEMS.map(item=>(
          <button key={item.id} onClick={()=>navTo(item.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"8px 10px",borderRadius:8,border:"none",background:page===item.id?"rgba(42,124,111,0.3)":"none",color:page===item.id?T.tealL:"rgba(255,255,255,0.55)",fontSize:13,fontWeight:page===item.id?700:500,cursor:"pointer",textAlign:"left",marginBottom:1,transition:"all .15s"}}>
            <span style={{fontSize:15,width:18,textAlign:"center"}}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div style={{padding:"0 10px"}}>
        <button onClick={()=>setUser(null)} style={{width:"100%",padding:"8px 10px",borderRadius:8,border:"none",background:"none",color:"rgba(255,255,255,0.35)",fontSize:12,cursor:"pointer",textAlign:"left"}}>Sign out</button>
      </div>
    </div>
  );

  const pages = {
    home:<Home user={user} data={data} onNav={navTo}/>,
    weekly:<Weekly data={data} setData={setData}/>,
    tasks:<Tasks user={user} data={data} setData={setData}/>,
    projects:<Projects data={data} setData={setData} user={user}/>,
    crm:<CRM data={data} setData={setData} user={user}/>,
    decisions:<Decisions data={data} setData={setData} user={user}/>,
    ideas:<Ideas data={data} setData={setData} user={user}/>,
    meetings:<Meetings data={data} setData={setData} user={user}/>,
    library:<Library data={data} setData={setData} user={user}/>,
    metrics:<Metrics data={data} setData={setData}/>,
  };

  return (
    <div style={{display:"flex",minHeight:"100vh",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",background:T.cream}}>
      {/* Desktop sidebar */}
      <div style={{display:"none"}} className="desktop-nav">
        <NavSidebar/>
      </div>
      <div style={{display:"flex",minHeight:"100vh",width:"100%"}}>
        {/* Sidebar (desktop) */}
        <div style={{width:220,flexShrink:0,display:"block"}} id="sidebar">
          <NavSidebar/>
        </div>

        {/* Main */}
        <div style={{flex:1,display:"flex",flexDirection:"column",minWidth:0}}>
          {/* Topbar */}
          <div style={{height:56,background:T.white,borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",padding:"0 24px",gap:12,position:"sticky",top:0,zIndex:100}}>
            <div style={{flex:1,position:"relative",maxWidth:400}}>
              <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:T.charcoalL,fontSize:14}}>🔍</span>
              <Input
                value={search}
                onChange={e=>setSearch(e.target.value)}
                placeholder="Search tasks, leads, decisions..."
                style={{paddingLeft:32,background:T.cream,border:"none",fontSize:13}}
              />
              {searchResults.length>0 && (
                <div style={{position:"absolute",top:"calc(100% + 6px)",left:0,right:0,background:T.white,borderRadius:10,boxShadow:"0 8px 32px rgba(0,0,0,0.12)",border:`1px solid ${T.border}`,zIndex:200,overflow:"hidden"}}>
                  {searchResults.map((r,i)=>(
                    <button key={i} onClick={()=>{navTo(r.nav);}} style={{width:"100%",padding:"10px 14px",border:"none",background:"none",display:"flex",gap:10,alignItems:"center",cursor:"pointer",textAlign:"left",borderBottom:i<searchResults.length-1?`1px solid ${T.border}`:"none"}}>
                      <Badge label={r.type} bg={T.tealXL} color={T.teal}/>
                      <span style={{fontSize:13,color:T.charcoal}}>{r.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginLeft:"auto"}}>
              <Avatar id={user.id} size={30}/>
              <span style={{fontSize:13,fontWeight:600,color:T.charcoal}}>{user.name}</span>
            </div>
          </div>

          {/* Page content */}
          <div style={{flex:1,padding:"28px 32px",overflowY:"auto",maxWidth:1100,width:"100%",boxSizing:"border-box"}}>
            {pages[page]||pages.home}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          #sidebar{display:none!important;}
          .mobile-nav-btn{display:flex!important;}
        }
        *{box-sizing:border-box;}
        button:hover{opacity:.88;}
        ::-webkit-scrollbar{width:6px;height:6px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:${T.border};border-radius:3px;}
      `}</style>
    </div>
  );
}
