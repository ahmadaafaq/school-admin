import{u as M,t as R,b as D,a as m,h as L,k as z,f as E,l as X,d as Z,s as _,A as P,j as e,T as O,F as ee,B as x,m as te,n as ae,I as se,S as ne,M as U,D as oe,o as S,p as ie,U as q}from"./index-wJj9abeo.js";import{d as le,S as re,a as ce,b as de}from"./DriveFileRenameOutlineOutlined-wh212PVW.js";import{c as ue,a as me,L as he}from"./Loader-V9kt_BZH.js";import{D as pe}from"./Dialog-H17IDJ7F.js";import{a as B}from"./SubjectAction-mW2zJbl_.js";import{u as xe}from"./index-ngBz0NVi.js";import"./FormControlLabel-rkyz9wHp.js";import"./Chip-3qarAbJU.js";import"./index-R3E-xKkl.js";import"./ListItemText-UY9Do7UF.js";const ge=ue().shape({name:me().min(0,"Name is Too Short!").max(40,"Name is Too Long!").required("This Field is Required")}),$={name:"",status:"inactive"},fe=({openDialog:b,setOpenDialog:g})=>{const d=M(),h=R(d.palette.mode),f=D(d.breakpoints.down("md")),v=D("(max-width:480px)"),n=D("(max-width:920px)"),j=()=>{g(!1)},[p,y]=m.useState("Create"),[F,o]=m.useState(!1),[A,u]=m.useState($),l=L(),r=z(),k=E(t=>t.menuItems.selected),C=E(t=>t.toastInfo),{state:T}=X(),{typography:w}=Z(d.palette.mode),{toastAndNavigate:i,getLocalStorage:G}=q();let N=T==null?void 0:T.id;m.useEffect(()=>{const t=G("menu");r(_(t.selected)),N?(y("Update"),V(N)):(y("Create"),u($))},[N]);const Q=t=>{o(!0),P.SubjectAPI.updateSubject(t).then(({data:a})=>{a.status==="Success"?(o(!1),i(r,!0,"info","Successfully Updated"),setTimeout(()=>{j(),location.href="/subject/listing"},2e3)):(o(!1),i(r,!0,"error","An Error Occurred, Please Try Again",l,location.reload()))}).catch(a=>{var s,c;throw o(!1),i(r,!0,"error",(c=(s=a==null?void 0:a.response)==null?void 0:s.data)==null?void 0:c.msg,l,location.reload()),a})},V=t=>{o(!0);const a=[`/get-by-pk/subject/${t}`];P.CommonAPI.multipleAPICall("GET",a).then(s=>{s[0].data.status==="Success"?(u(s[0].data.data),o(!1)):(o(!1),i(r,!0,"error","An Error Occurred, Please Try Again",l,location.reload()))}).catch(s=>{var c,I;throw o(!1),i(r,!0,"error",(I=(c=s==null?void 0:s.response)==null?void 0:c.data)==null?void 0:I.msg,l,location.reload()),s})},Y=t=>{o(!0),P.SubjectAPI.createSubject(t).then(({data:a})=>{a.status==="Success"?(o(!1),i(r,!0,"success","Successfully Created"),setTimeout(()=>{j(),l(0)},2e3)):(o(!1),i(r,!0,"error","An Error Occurred, Please Try Again",l,location.reload()))}).catch(a=>{var s,c;throw o(!1),i(r,!0,a?(c=(s=a.response)==null?void 0:s.data)==null?void 0:c.msg:"An Error Occurred",l,location.reload()),a})};return e.jsx("div",{children:e.jsxs(pe,{fullScreen:f,open:b,onClose:j,"aria-labelledby":"responsive-dialog-title",sx:{top:v?"33%":n?"25%":"20%",height:v?"49%":n?"39%":"60%","& .MuiPaper-root":{width:"100%"}},children:[e.jsx(O,{fontFamily:w.fontFamily,fontSize:w.h2.fontSize,color:h.grey[100],fontWeight:"600",display:"inline-block",textAlign:"center",marginTop:"10px",children:`${p} ${k}`}),e.jsx(ee,{initialValues:A,enableReinitialize:!0,validationSchema:ge,onSubmit:t=>{t.id?Q(t):Y(t)},children:({values:t,errors:a,touched:s,dirty:c,isSubmitting:I,handleBlur:H,handleChange:W,handleSubmit:J,resetForm:K})=>e.jsxs("form",{onSubmit:J,children:[e.jsxs(x,{display:"grid",gap:"30px",gridTemplateColumns:"repeat(2, minmax(0, 1fr))",padding:"20px",children:[e.jsx(te,{variant:"filled",type:"text",name:"name",label:"Name*",autoComplete:"new-name",onBlur:H,onChange:W,value:t.name,error:!!s.name&&!!a.name,helperText:s.name&&a.name}),e.jsxs(ae,{variant:"filled",sx:{minWidth:120},error:!!s.status&&!!a.status,children:[e.jsx(se,{id:"statusField",children:"Status"}),e.jsxs(ne,{variant:"filled",labelId:"statusField",label:"Status",name:"status",autoComplete:"new-status",value:t.status,onChange:W,children:[e.jsx(U,{value:"active",children:"Active"}),e.jsx(U,{value:"inactive",children:"Inactive"})]})]})]}),e.jsx(oe,{}),e.jsxs(x,{display:"flex",justifyContent:"end",p:"20px",children:[p==="Update"?null:e.jsx(S,{type:"reset",color:"warning",variant:"contained",sx:{mr:3},disabled:!c||I,onClick:()=>{window.confirm("Do You Really Want To Reset?")&&K()},children:"Reset"}),e.jsx(S,{color:"error",variant:"contained",sx:{mr:3},onClick:()=>j(),children:"Cancel"}),e.jsx(S,{type:"submit",disabled:!c||I,color:p==="Update"?"info":"success",variant:"contained",children:"Submit"}),e.jsx(ie,{alerting:C.toastAlert,severity:C.toastSeverity,message:C.toastMessage})]})]})}),F===!0?e.jsx(he,{}):null]})})},je=b=>{const g=M(),d=R(g.palette.mode),h=L(),f=n=>{b(),h("#",{state:{id:n}})};return[{field:"name",headerName:"NAME",headerAlign:"center",align:"center",flex:1,minWidth:120},{field:"status",headerName:"STATUS",headerAlign:"center",align:"center",flex:1,minWidth:120,renderCell:({row:{status:n}})=>e.jsx(x,{width:"60%",m:"0 auto",p:"5px",display:"flex",justifyContent:"center",backgroundColor:n==="active"?d.greenAccent[600]:d.redAccent[700],borderRadius:"4px",children:e.jsx(O,{color:d.grey[100],sx:{ml:"5px"},children:n})})},{field:"updated_at",headerName:"UPDATED AT",headerAlign:"center",align:"center",flex:1,minWidth:100,valueFormatter:n=>n==null?void 0:n.value.substring(0,10)},{field:"action",headerName:"ACTION",headerAlign:"center",align:"center",flex:1,minWidth:75,renderCell:({row:{id:n}})=>e.jsx(x,{width:"30%",m:"0 auto",p:"5px",display:"flex",justifyContent:"center",children:e.jsx(S,{color:"info",variant:"contained",onClick:()=>f(n),sx:{minWidth:"50px"},children:e.jsx(le,{})})})}]},Se=[5,10,20],ke=()=>{const[b,g]=m.useState(!1),[d,h]=m.useState({search:!1,searching:!1}),[f,v]=m.useState(),n=L(),j=z(),p=E(i=>i.menuItems.selected),{listData:y,loading:F}=E(i=>i.allSubjects),o=M(),A=R(o.palette.mode),u=D("(max-width:480px)"),l=D("(max-width:920px)"),r=document.getElementById("reload-btn"),{getPaginatedData:k}=xe(),{getLocalStorage:C}=q();m.useEffect(()=>{const i=C("menu");j(_(i.selected))},[]);const T=()=>{r.style.display="none",h({search:!1,searching:!1,oldPagination:f})},w=()=>{g(!0)};return e.jsxs(x,{m:"10px",position:"relative",children:[e.jsx(x,{height:u?"19vh":l?"8vh":"11vh",borderRadius:"4px",padding:u?"1vh":"2vh",backgroundColor:A.blueAccent[700],children:e.jsxs(x,{display:"flex",height:u?"16vh":"7vh",flexDirection:u?"column":"row",justifyContent:"space-between",alignItems:u?"center":"normal",children:[e.jsx(O,{component:"h2",variant:"h2",color:A.grey[100],fontWeight:"bold",children:p}),e.jsx(re,{action:B,api:P.SubjectAPI,getSearchData:k,oldPagination:f,reloadBtn:r,setSearchFlag:h}),e.jsxs(S,{type:"submit",color:"success",variant:"contained",onClick:()=>{n("#",{state:{id:void 0}}),w()},sx:{height:l?"4vh":"auto"},children:["Create New ",p]})]})}),e.jsxs(S,{sx:{display:"none",position:"absolute",top:u?"23vh":l?"10.5vh":"16.5vh",left:u?"80vw":l?"39.5vw":"26vw",zIndex:1,borderRadius:"20%",color:A.grey[100]},id:"reload-btn",type:"button",onClick:T,children:[e.jsx("span",{style:{display:"inherit",marginRight:"5px"},children:e.jsx(ce,{})}),"Back"]}),e.jsx(de,{action:B,api:P.SubjectAPI,getQuery:k,columns:je(w),rows:y.rows,count:y.count,loading:F,selected:p,pageSizeOptions:Se,setOldPagination:v,searchFlag:d,setSearchFlag:h}),e.jsx(fe,{openDialog:b,setOpenDialog:g})]})};export{ke as default};