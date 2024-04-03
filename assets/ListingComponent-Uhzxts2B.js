import{k as se,l as ne,P as W,u as N,t as M,b as I,a as d,m as E,n as $,o as Q,p as oe,d as ie,s as V,A as P,j as e,D as re,f as U,T as B,F as le,B as m,q as ce,v as de,I as ue,S as he,M as pe,w as ge,h as S,x as me,y as xe,U as Y}from"./index-dsWAcX1f.js";import{d as fe,l as z,S as be,a as je,b as Se}from"./listBG-dw88K66u.js";import{c as q}from"./index-mbUFVO5S.js";import{b as _}from"./SubjectAction-p-rplfCF.js";import{u as ye}from"./index-uKa1WJb8.js";import"./FormControlLabel-GbaKk4ky.js";import"./toPropertyKey-Z1a84DJL.js";import"./typeof-LnL08gqA.js";import"./CircularProgress-4dZqOr9B.js";const ve=se().shape({name:ne().min(0,"Name is Too Short!").max(40,"Name is Too Long!").required("This Field is Required")}),G={name:"",status:"inactive"},H=({openDialog:y,setOpenDialog:x})=>{const r=N(),p=M(r.palette.mode),f=I(r.breakpoints.down("md")),v=I("(max-width:480px)"),a=I("(max-width:920px)"),g=()=>{x(!1)},[A,D]=d.useState("Create"),[R,o]=d.useState(!1),[C,u]=d.useState(G),b=E(s=>s.menuItems.selected),j=E(s=>s.toastInfo),h=$(),l=Q(),{state:T}=oe(),{typography:k}=ie(r.palette.mode),{toastAndNavigate:i,getLocalStorage:J}=Y();let F=T==null?void 0:T.id;d.useEffect(()=>{const s=J("menu");l(V(s.selected)),F?(D("Update"),X(F)):(D("Create"),u(G))},[F]);const K=d.useCallback(s=>{o(!0),P.SubjectAPI.updateSubject(s).then(({data:t})=>{t.status==="Success"?(o(!1),i(l,!0,"info","Successfully Updated"),setTimeout(()=>{g(),location.href="/subject/listing"},2e3)):(o(!1),i(l,!0,"error","An Error Occurred, Please Try Again",h,location.reload()))}).catch(t=>{var n,c;throw o(!1),i(l,!0,"error",t?(c=(n=t==null?void 0:t.response)==null?void 0:n.data)==null?void 0:c.msg:"An Error Occurred",h,0),t})},[]),X=d.useCallback(s=>{o(!0);const t=[`/get-by-pk/subject/${s}`];P.CommonAPI.multipleAPICall("GET",t).then(n=>{n[0].data.status==="Success"?(u(n[0].data.data),o(!1)):(o(!1),i(l,!0,"error","An Error Occurred, Please Try Again",h,location.reload()))}).catch(n=>{var c,w;throw o(!1),i(l,!0,"error",n?(w=(c=n==null?void 0:n.response)==null?void 0:c.data)==null?void 0:w.msg:"An Error Occurred",h,0),n})},[]),Z=d.useCallback(s=>{o(!0),P.SubjectAPI.createSubject(s).then(({data:t})=>{t.status==="Success"?(o(!1),i(l,!0,"success","Successfully Created"),setTimeout(()=>{g(),h(0)},2e3)):(o(!1),i(l,!0,"error","An Error Occurred, Please Try Again",h,0))}).catch(t=>{var n,c;throw o(!1),i(l,!0,t?(c=(n=t.response)==null?void 0:n.data)==null?void 0:c.msg:"An Error Occurred",h,location.reload()),t})},[]);return e.jsx("div",{children:e.jsxs(re,{fullScreen:f,open:y,onClose:g,"aria-labelledby":"responsive-dialog-title",sx:{top:v?"33%":a?"25%":"20%",height:v?"49%":a?"39%":"60%","& .MuiPaper-root":{width:"100%",backgroundImage:r.palette.mode=="light"?`linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(${U})`:`linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${U})`,backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover"}},children:[e.jsx(B,{fontFamily:k.fontFamily,fontSize:k.h2.fontSize,color:p.grey[100],fontWeight:"600",display:"inline-block",textAlign:"center",marginTop:"10px",children:`${A} ${b}`}),e.jsx(le,{initialValues:C,enableReinitialize:!0,validationSchema:ve,onSubmit:s=>{s.id?K(s):Z(s)},children:({values:s,errors:t,touched:n,dirty:c,isSubmitting:w,handleBlur:ee,handleChange:L,handleSubmit:te,resetForm:ae})=>e.jsxs("form",{onSubmit:te,children:[e.jsxs(m,{display:"grid",gap:"30px",gridTemplateColumns:"repeat(2, minmax(0, 1fr))",padding:"20px",children:[e.jsx(ce,{variant:"filled",type:"text",name:"name",label:"Name*",onBlur:ee,onChange:L,value:s.name,error:!!n.name&&!!t.name,helperText:n.name&&t.name}),e.jsxs(de,{variant:"filled",sx:{minWidth:120},error:!!n.status&&!!t.status,children:[e.jsx(ue,{id:"statusField",children:"Status"}),e.jsx(he,{variant:"filled",labelId:"statusField",label:"Status",name:"status",value:s.status,onChange:L,children:Object.keys(q.status).map(O=>e.jsx(pe,{value:O,children:q.status[O]},O))})]})]}),e.jsx(ge,{}),e.jsxs(m,{display:"flex",justifyContent:"end",p:"20px",children:[A==="Update"?null:e.jsx(S,{type:"reset",color:"warning",variant:"contained",sx:{mr:3},disabled:!c||w,onClick:()=>{window.confirm("Do You Really Want To Reset?")&&ae()},children:"Reset"}),e.jsx(S,{color:"error",variant:"contained",sx:{mr:3},onClick:()=>g(),children:"Cancel"}),e.jsx(S,{type:"submit",disabled:!c||w,color:A==="Update"?"info":"success",variant:"contained",children:"Submit"}),e.jsx(me,{alerting:j.toastAlert,severity:j.toastSeverity,message:j.toastMessage})]})]})}),R===!0?e.jsx(xe,{}):null]})})};H.propTypes={openDialog:W.bool,setOpenDialog:W.func};const Ae=y=>{const x=N(),r=M(x.palette.mode),p=$(),f=a=>{y(),p("#",{state:{id:a}})};return[{field:"name",headerName:"NAME",headerAlign:"center",align:"center",flex:1,minWidth:120},{field:"status",headerName:"STATUS",headerAlign:"center",align:"center",flex:1,minWidth:120,renderCell:({row:{status:a}})=>e.jsx(m,{width:"60%",m:"0 auto",p:"5px",display:"flex",justifyContent:"center",backgroundColor:a==="active"?r.greenAccent[600]:r.redAccent[700],borderRadius:"4px",children:e.jsx(B,{color:r.grey[100],sx:{ml:"5px"},children:a})})},{field:"updated_at",headerName:"UPDATED AT",headerAlign:"center",align:"center",flex:1,minWidth:100,valueFormatter:a=>a==null?void 0:a.value.substring(0,10)},{field:"action",headerName:"ACTION",headerAlign:"center",align:"center",flex:1,minWidth:75,renderCell:({row:{id:a}})=>e.jsx(m,{width:"30%",m:"0 auto",p:"5px",display:"flex",justifyContent:"center",children:e.jsx(S,{color:"info",variant:"contained",onClick:()=>f(a),sx:{minWidth:"50px"},children:e.jsx(fe,{})})})}]},Ce=[5,10,20],Oe=()=>{const[y,x]=d.useState(!1),[r,p]=d.useState({search:!1,searching:!1}),[f,v]=d.useState(),a=E(i=>i.menuItems.selected),{listData:g,loading:A}=E(i=>i.listingSubjects),D=$(),R=Q(),o=N(),C=M(o.palette.mode),u=I("(max-width:480px)"),b=I("(max-width:920px)"),j=document.getElementById("reload-btn"),{getPaginatedData:h}=ye(),{getLocalStorage:l}=Y();d.useEffect(()=>{const i=l("menu");R(V(i.selected))},[]);const T=()=>{j.style.display="none",p({search:!1,searching:!1,oldPagination:f})},k=()=>{x(!0)};return e.jsxs(m,{position:"relative",sx:{borderRadius:"20px",border:"0.5px solid black",overflow:"hidden",boxShadow:"1px 1px 10px black",backgroundImage:o.palette.mode==="light"?`linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${z})`:`linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${z})`,backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover"},children:[e.jsx(m,{height:u?"19vh":b?"8vh":"11vh",borderRadius:"4px",padding:u?"1vh":"2vh",backgroundColor:C.blueAccent[700],children:e.jsxs(m,{display:"flex",height:u?"16vh":"7vh",flexDirection:u?"column":"row",justifyContent:"space-between",alignItems:u?"center":"normal",children:[e.jsx(B,{component:"h2",variant:"h2",color:C.grey[100],fontWeight:"bold",children:a}),e.jsx(be,{action:_,api:P.SubjectAPI,getSearchData:h,oldPagination:f,reloadBtn:j,setSearchFlag:p}),e.jsxs(S,{type:"submit",color:"success",variant:"contained",onClick:()=>{D("#",{state:{id:void 0}}),k()},sx:{height:b?"4vh":"auto"},children:["Create New ",a]})]})}),e.jsxs(S,{sx:{display:"none",position:"absolute",top:u?"23vh":b?"10.5vh":"16.5vh",left:u?"80vw":b?"39.5vw":"26vw",zIndex:1,borderRadius:"20%",color:C.grey[100]},id:"reload-btn",type:"button",onClick:T,children:[e.jsx("span",{style:{display:"inherit",marginRight:"5px"},children:e.jsx(je,{})}),"Back"]}),e.jsx(Se,{action:_,api:P.SubjectAPI,getQuery:h,columns:Ae(k),rows:g.rows,count:g.count,loading:A,selected:a,pageSizeOptions:Ce,setOldPagination:v,searchFlag:r,setSearchFlag:p}),e.jsx(H,{openDialog:y,setOpenDialog:x})]})};export{Oe as default};
