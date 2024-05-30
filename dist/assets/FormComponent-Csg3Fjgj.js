import{q as fe,s as pe,Y as re,P as j,a as u,l as M,w as de,h as ge,K as be,R as ve,W as xe,A as N,j as n,B as y,C as V,I as z,S as B,M as O,N as L,E as ce,G as je,at as ye,U as me,v as Te,O as Se,u as _e,t as Fe,k as $e,x as Ce,y as Ae,m as oe,T as we,p as le,H as Ee,J as Me}from"./index-zLCHO5gj.js";import{a as ue}from"./SectionAction-X4gvrGyO.js";import{a as ke,s as De}from"./SubjectAction-cByBtOva.js";import{s as Re}from"./SchoolDurationAction-rgIDFYqb.js";import{u as Pe}from"./index-mkkoW40k.js";const We=fe().shape({day:pe().required("This Field is Required"),class:re().required("This Field is Required"),section:re().required("This Field is Required")}),He={dbId:"",period:[],day:"",class:"",section:"",batch:"",subject:[],duration:[]},he=({onChange:k,refId:J,setDirty:ae,reset:p,setReset:S,classData:d,setClassData:U,allSubjects:K,updatedValues:g=null})=>{var $,C,A,P,W,X,Z,ee,te,se;const[a,w]=u.useState([]),v=M(s=>s.schoolClasses),T=M(s=>s.schoolSections),f=M(s=>s.schoolSubjects),h=M(s=>s.allSchoolDurations),q=de(),b=ge("(min-width:600px)"),{getPaginatedData:ie}=Pe(),{fetchAndSetSchoolData:I,getLocalStorage:G,findMultipleById:E}=me(),e=be({initialValues:He,validationSchema:We,enableReinitialize:!0,onSubmit:()=>_()});ve.useImperativeHandle(J,()=>({Submit:async()=>{await e.submitForm()}}));const _=()=>{k&&k({values:e.values,validated:e.isSubmitting?Object.keys(e.errors).length===0:!1})},D=new Date(a!=null&&a.opening_time?a==null?void 0:a.opening_time:a==null?void 0:a.eve_opening_time).toLocaleString("en-US",{hour:"numeric",minute:"numeric",hour12:!0});function Q(s){const[t,l]=s.split(":");if(isNaN(t)||isNaN(l))return"Invalid time format";const c=parseInt(t,10),i=parseInt(l,10);if(c<0||c>23||i<0||i>59)return"Invalid time value";const r=new Date;r.setHours(c),r.setMinutes(i);const o={hour:"numeric",minute:"numeric",hour12:!0};return new Intl.DateTimeFormat("en-US",o).format(r)}const Y=(s=0,t=0,l,c)=>{const i=[],r=new Date;r.setHours(s,t,0);for(let o=0;o<l;o++){let x=`${r.getHours()}:${r.getMinutes()==0?"00":r.getMinutes()}`;r.setMinutes(r.getMinutes()+c);let H=`${r.getHours()}:${r.getMinutes()==0?"00":r.getMinutes()}`;i.push(`${Q(x)}-${Q(H)}`)}return i},m=Y(D.slice(0,2).replace(":","").padStart(2,"0"),D.slice(2,5).replace(":",""),(a==null?void 0:a.period)/(a==null?void 0:a.halves),a==null?void 0:a.first_half_period_duration);let R=[],F=[];if(m.length){let s=m[m.length-1],t=s.split("-").splice(1).join("").slice(0,2).replace(":","").padStart(2,"0"),l=s.split("-").splice(1).join("").slice(2,5).replace(":",""),c=parseInt(l,10)+parseInt(a==null?void 0:a.recess_time,10);R=Y(t,c,(a==null?void 0:a.period)/(a==null?void 0:a.halves),a==null?void 0:a.second_half_period_duration),R.length&&(F=[...m,...R])}return u.useEffect(()=>{if(e.values.class&&(d!=null&&d.length)){const t=((d==null?void 0:d.filter(l=>l.class_id===e.values.class))||[]).map(({section_id:l,section_name:c})=>({section_id:l,section_name:c}));q(ue(t))}},[($=e.values)==null?void 0:$.class,d==null?void 0:d.length]),u.useEffect(()=>{var s;if(e.values.section&&(d!=null&&d.length)){const t=d==null?void 0:d.filter(c=>c.class_id===e.values.class&&c.section_id===e.values.section),l=t?E((s=t[0])==null?void 0:s.subject_ids,K):[];q(ke(l))}},[(C=e.values)==null?void 0:C.class,(A=e.values)==null?void 0:A.section,d.length,K]),u.useEffect(()=>{p&&(e.resetForm(),S(!1))},[p]),u.useEffect(()=>{e.dirty&&ae(!0)},[e.dirty]),u.useEffect(()=>{var s,t,l,c;g&&(g==null||g.map((i,r)=>{e.setFieldValue(`period${r+1}`,i==null?void 0:i.period),e.setFieldValue(`duration${r+1}`,i==null?void 0:i.duration),e.setFieldValue(`subject${r+1}`,i==null?void 0:i.subject_id),e.setFieldValue(`dbId_${r}`,i==null?void 0:i.id)}),e.setFieldValue("class",(s=g[0])==null?void 0:s.class_id),e.setFieldValue("section",(t=g[0])==null?void 0:t.section_id),e.setFieldValue("day",(l=g[0])==null?void 0:l.day),e.setFieldValue("batch",(c=g[0])==null?void 0:c.batch))},[g]),u.useEffect(()=>{var s,t,l;G("schoolInfo")&&(!((s=f==null?void 0:f.listData)!=null&&s.length)||!((t=v==null?void 0:v.listData)!=null&&t.length)||!((l=T==null?void 0:T.listData)!=null&&l.length))&&I(q,xe,ue,U)},[]),u.useEffect(()=>{var t,l;let s=G("schoolInfo");(l=(t=h==null?void 0:h.listData)==null?void 0:t.rows)!=null&&l.length||ie(0,5,Re,N.SchoolDurationAPI),s!=null&&s.encrypted_id&&N.CommonAPI.decryptText(s).then(c=>{var i,r;if(c.status==="Success"){const o=(r=(i=h==null?void 0:h.listData)==null?void 0:i.rows)==null?void 0:r.filter(x=>`${x.school_id}`===c.data);if(e.values.batch=="both")w(o[0]);else if(o.length>0){const x=o.find(ne=>ne.batch==="senior"),H=o.find(ne=>ne.batch==="junior");e.values.batch=="senior"?w(x):w(H)}}else c.status==="Error"&&console.log("Error Decrypting Data")})},[(W=(P=h==null?void 0:h.listData)==null?void 0:P.rows)==null?void 0:W.length,e.values.batch]),u.useEffect(()=>{var s,t;F!=null&&F.length&&!((t=(s=e==null?void 0:e.values)==null?void 0:s.duration)!=null&&t.length)&&e.setFieldValue("duration",F)},[F]),u.useEffect(()=>{if(a!=null&&a.period){const s=Array.from({length:a.period},(t,l)=>l+1);e.setFieldValue("period",s)}},[a]),n.jsx(y,{m:"20px",children:n.jsxs("form",{ref:J,children:[n.jsxs(y,{display:"grid",gap:"30px",gridTemplateColumns:"repeat(4, minmax(0, 1fr))",sx:{"& > div":{gridColumn:b?void 0:"span 4"},marginBottom:"50px"},children:[n.jsxs(V,{variant:"filled",sx:{minWidth:120},error:!!e.touched.class&&!!e.errors.class,children:[n.jsx(z,{id:"classField",children:"Class"}),n.jsx(B,{variant:"filled",labelId:"classField",name:"class",value:e.values.class,onChange:s=>{e.setFieldValue("class",s.target.value),e.values.section&&e.setFieldValue("section",""),e.values.subject&&e.setFieldValue("subject",[])},children:(X=v==null?void 0:v.listData)!=null&&X.length?v.listData.map(s=>n.jsx(O,{value:s.class_id,name:s.class_name,children:s.class_name},s.class_id)):null}),n.jsx(L,{children:e.touched.class&&e.errors.class})]}),n.jsxs(V,{variant:"filled",sx:{minWidth:120},error:!!e.touched.section&&!!e.errors.section,children:[n.jsx(z,{id:"sectionField",children:"Section"}),n.jsx(B,{variant:"filled",labelId:"sectionField",name:"section",value:e.values.section,onChange:s=>{e.setFieldValue("section",s.target.value),e.values.subject&&e.setFieldValue("subject","")},children:(Z=T==null?void 0:T.listData)!=null&&Z.length?T.listData.map(s=>n.jsx(O,{value:s.section_id,name:s.section_name,children:s.section_name},s.section_id)):null}),n.jsx(L,{children:e.touched.section&&e.errors.section})]}),n.jsxs(V,{variant:"filled",sx:{minWidth:120},error:!!e.touched.day&&!!e.errors.day,children:[n.jsx(z,{id:"dayField",children:"Day"}),n.jsx(B,{variant:"filled",name:"day",value:e.values.day,onChange:e.handleChange,children:Object.keys(ce.day).map(s=>n.jsx(O,{value:s,children:ce.day[s]},s))}),n.jsx(L,{children:e.touched.day&&e.errors.day})]}),n.jsxs(V,{variant:"filled",sx:{minWidth:120},error:!!e.touched.batch&&!!e.errors.batch,children:[n.jsx(z,{children:"Batch"}),n.jsx(B,{name:"batch",value:e.values.batch||"",onChange:s=>e.setFieldValue("batch",s.target.value),children:(ee=h==null?void 0:h.listData)!=null&&ee.rows?(se=(te=h==null?void 0:h.listData)==null?void 0:te.rows)==null?void 0:se.map(s=>n.jsx(O,{value:s.batch,name:s.batch,children:s.batch},s.id)):null}),n.jsx(L,{children:e.touched.batch&&e.errors.batch})]})]}),(a==null?void 0:a.period)>0&&n.jsx(n.Fragment,{children:[...Array((a==null?void 0:a.period)/2)].map((s,t)=>{var c;let l=t+1;return n.jsxs(y,{style:{display:"grid",gap:"10px",gridTemplateColumns:"repeat(3, minmax(0, 1fr))",margin:"0px 100px 20px 100px ",justifyItems:"center",alignItems:"center"},children:[n.jsxs(y,{sx:{fontWeight:"600",fontSize:"20px"},children:["Period ",l]}),n.jsx(y,{sx:{fontWeight:"500",fontSize:"15px"},children:m[t]}),n.jsxs(V,{variant:"filled",sx:{minWidth:120},error:!!e.touched[`subject${l}`]&&!!e.errors[`subject${l}`],children:[n.jsx(z,{id:"subjectField",children:"Subject"}),n.jsx(B,{sx:{minWidth:"280px"},variant:"filled",name:`subject${l}`,value:e.values[`subject${t+1}`]||null,onChange:i=>e.setFieldValue(`subject${t+1}`,i.target.value),children:(c=f==null?void 0:f.listData)!=null&&c.length?f.listData.map(i=>n.jsx(O,{value:i.id,name:i.name,children:i.name},i.id)):null}),n.jsxs(L,{children:[e.touched[`subject${l}`]&&e.errors[`subject${l}`]," "]})]})]},t)})}),n.jsx(je,{sx:{width:"99%",marginBottom:"20px"},children:n.jsx(ye,{color:"info",label:`Recess Time ${a==null?void 0:a.recess_time} min`,sx:{fontSize:"13px",fontWeight:"600",letterSpacing:"0.2em",padding:"12px"}})}),(a==null?void 0:a.period)/2>0&&n.jsx(n.Fragment,{children:[...Array((a==null?void 0:a.period)/2)].map((s,t)=>{var c;let l=(a==null?void 0:a.period)/2+1;return n.jsxs(y,{sx:{display:"grid",gap:"10px",gridTemplateColumns:"repeat(3, minmax(0, 1fr))",margin:"0px 100px 20px 100px ",justifyItems:"center",alignItems:"center"},children:[n.jsxs(y,{sx:{fontWeight:"600",fontSize:"20px"},children:["Period ",t+l]}),n.jsx(y,{sx:{fontWeight:"500",fontSize:"15px"},children:R[t]}),n.jsxs(V,{variant:"filled",sx:{minWidth:120},error:!!e.touched[`subject${t+l}`]&&!!e.errors[`subject${t+l}`],children:[n.jsx(z,{id:"subjectField",children:"Subject"}),n.jsx(B,{sx:{minWidth:"280px"},variant:"filled",name:`subject${t+l}`,value:e.values[`subject${t+l}`]||null,onChange:i=>e.setFieldValue(`subject${t+l}`,i.target.value),children:(c=f==null?void 0:f.listData)!=null&&c.length?f.listData.map(i=>n.jsx(O,{value:i.id,name:i.name,children:i.name},i.id)):null}),n.jsxs(L,{children:[e.touched[`subject${t+l}`]&&e.errors[`subject${t+l}`]," "]})]})]},t)})})]})})};he.propTypes={onChange:j.func,refId:j.shape({current:j.any}),setDirty:j.func,reset:j.bool,setReset:j.func,classData:j.array,setClassData:j.func,allSubjects:j.array,updatedValues:j.object};const Ne=()=>{var s;const[k,J]=u.useState("Create"),[ae,p]=u.useState(!1),[S,d]=u.useState({timeTableData:{values:null,validated:!1}}),[U,K]=u.useState(null),[g,a]=u.useState(!1),[w,v]=u.useState(!1),[T,f]=u.useState(!1),[h,q]=u.useState([]),b=M(t=>t.allSubjects),ie=M(t=>t.menuItems.selected),I=M(t=>t.toastInfo),G=u.useRef(),E=Te(),e=de(),_=Se(),D=_e(),Q=Fe(D.palette.mode),{typography:Y}=$e(D.palette.mode),{state:m}=Ce(),{getLocalStorage:R,fetchAndSetAll:F,toastAndNavigate:$}=me();let C=(m==null?void 0:m.class_id)||(_==null?void 0:_.class_id),A=(m==null?void 0:m.section_id)||(_==null?void 0:_.section_id),P=m==null?void 0:m.day,W=m==null?void 0:m.batch;u.useEffect(()=>{const t=R("menu");e(Ae(t.selected))},[]);const X=u.useCallback(t=>{let l=[];p(!0);let c={day:t.timeTableData.values.day,class_id:t.timeTableData.values.class,section_id:t.timeTableData.values.section,batch:t.timeTableData.values.batch};return l=t.timeTableData.values.period.map((i,r)=>{const o={...c,period:i,id:t.timeTableData.values[`dbId_${r}`],duration:t.timeTableData.values.duration[r],subject_id:t.timeTableData.values[`subject${r+1}`]};N.TimeTableAPI.updateTimeTable(o)}),Promise.all(l).then(()=>{p(!1),$(e,!0,"info","Successfully updated")}).catch(i=>{var r,o;p(!1),$(e,!0,"error",i?(o=(r=i==null?void 0:i.response)==null?void 0:r.data)==null?void 0:o.msg:"An Error Occurred",E,0),console.log("error updating time table",i)})},[S]),Z=u.useCallback((t,l,c,i)=>{p(!0);const r=[`/get-time-tables/?page=0&size=12&classId=${t}&section=${l}&day=${c}&batch=${i}`];N.CommonAPI.multipleAPICall("GET",r).then(o=>{if(o[0].data.status==="Success"){const x={timeTableData:o[0].data.data.rows};K(x),p(!1)}}).catch(o=>{var x,H;p(!1),$(e,!0,"error",o?(H=(x=o==null?void 0:o.response)==null?void 0:x.data)==null?void 0:H.msg:"An Error Occurred",E,0)})},[C,A,P,W]),ee=u.useCallback(t=>{let l=[];p(!0);let c={day:t.timeTableData.values.day,class_id:t.timeTableData.values.class,section_id:t.timeTableData.values.section,batch:t.timeTableData.values.batch};return l=t.timeTableData.values.period.map((i,r)=>{const o={...c,period:i,duration:t.timeTableData.values.duration[r],subject_id:t.timeTableData.values[`subject${r+1}`]};N.TimeTableAPI.createTimeTable(o)}),Promise.all(l).then(()=>{p(!1),$(e,!0,"success","Successfully Created",E,"/time-table/listing")}).catch(i=>{var r,o;p(!1),$(e,!0,"error",i?(o=(r=i==null?void 0:i.response)==null?void 0:r.data)==null?void 0:o.msg:"An Error Occurred",E,0),console.log("error creating time table",i)})},[S]);u.useEffect(()=>{var t;(t=b==null?void 0:b.listData)!=null&&t.length||F(e,De,N.SubjectAPI)},[(s=b==null?void 0:b.listData)==null?void 0:s.length]),u.useEffect(()=>{C&&A&&!w&&(J("Update"),Z(C,A,P,W)),S.timeTableData.validated?C&&A?X(S):ee(S):v(!1)},[w,C,A,P,W]);const te=async()=>{await G.current.Submit(),v(!0)},se=(t,l)=>{l=="timeTable"&&d({...S,timeTableData:t})};return n.jsxs(y,{m:"10px",sx:{backgroundImage:D.palette.mode=="light"?`linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(${oe})`:`linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${oe})`,backgroundRepeat:"no-repeat",backgroundPosition:"start",backgroundSize:"cover",backgroundAttachment:"fixed",height:"100%"},children:[n.jsx(we,{fontFamily:Y.fontFamily,fontSize:Y.h2.fontSize,color:Q.grey[100],fontWeight:"bold",display:"inline-block",marginLeft:"20px",children:`${k} ${ie}`}),n.jsx(he,{onChange:t=>{se(t,"timeTable")},refId:G,setDirty:a,reset:T,setReset:f,classData:h,setClassData:q,allSubjects:b==null?void 0:b.listData,updatedValues:U==null?void 0:U.timeTableData}),n.jsxs(y,{display:"flex",justifyContent:"end",m:"20px",children:[k==="Update"?null:n.jsx(le,{type:"reset",color:"warning",variant:"contained",sx:{mr:3},disabled:!g||w,onClick:()=>{window.confirm("Do You Really Want To Reset?")&&f(!0)},children:"Reset"}),n.jsx(le,{color:"error",variant:"contained",sx:{mr:3},onClick:()=>E("/time-table/listing"),children:"Cancel"}),n.jsx(le,{type:"submit",onClick:()=>te(),disabled:!g,color:k==="Update"?"info":"success",variant:"contained",children:"Submit"}),n.jsx(Ee,{alerting:I.toastAlert,severity:I.toastSeverity,message:I.toastMessage})]}),ae===!0?n.jsx(Me,{}):null]})};export{Ne as default};
