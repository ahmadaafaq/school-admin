import{u as N,t as M,b as I,a as m,h as O,k as q,f as D,l as Z,d as ee,s as G,A as U,j as e,T as L,F as te,B as g,m as B,n as ae,I as se,S as ne,M as $,D as oe,o as j,p as ie,U as Q,q as le}from"./index-wJj9abeo.js";import{d as re,S as ce,a as de,b as ue}from"./DriveFileRenameOutlineOutlined-wh212PVW.js";import{c as me,a as pe,L as he}from"./Loader-V9kt_BZH.js";import{D as xe}from"./Dialog-H17IDJ7F.js";import{u as ge}from"./index-ngBz0NVi.js";import"./FormControlLabel-rkyz9wHp.js";import"./Chip-3qarAbJU.js";import"./index-R3E-xKkl.js";import"./ListItemText-UY9Do7UF.js";const fe=me().shape({name:pe().min(2,"Name is Too Short!").max(20,"Name is Too Long!").required("This Field is Required")}),z={name:"",priority:0,status:"inactive"},ye=({openDialog:p,setOpenDialog:f})=>{const d=N(),h=M(d.palette.mode),y=I(d.breakpoints.down("md")),S=I("(max-width:480px)"),n=I("(max-width:920px)"),v=()=>{f(!1)},[x,b]=m.useState("Create"),[E,o]=m.useState(!1),[A,u]=m.useState(z),l=O(),r=q(),P=D(a=>a.menuItems.selected),C=D(a=>a.toastInfo),{state:T}=Z(),{typography:w}=ee(d.palette.mode),{toastAndNavigate:i,getLocalStorage:V}=Q();let k=T==null?void 0:T.id;m.useEffect(()=>{const a=V("menu");r(G(a.selected)),k?(b("Update"),H(k)):(b("Create"),u(z))},[k]);const Y=a=>{o(!0),U.UserRoleAPI.updateUserRole(a).then(({data:t})=>{t.status==="Success"?(o(!1),i(r,!0,"info","Successfully Updated"),setTimeout(()=>{v(),location.href="/role/listing"},2e3)):(o(!1),i(r,!0,"error","An Error Occurred, Please Try Again",l,location.reload()))}).catch(t=>{var s,c;throw o(!1),i(r,!0,"error",(c=(s=t==null?void 0:t.response)==null?void 0:s.data)==null?void 0:c.msg,l,location.reload()),t})},H=a=>{o(!0);const t=[`/get-by-pk/role/${a}`];U.CommonAPI.multipleAPICall("GET",t).then(s=>{s[0].data.status==="Success"?(u(s[0].data.data),o(!1)):(o(!1),i(r,!0,"error","An Error Occurred, Please Try Again",l,location.reload()))}).catch(s=>{var c,R;throw o(!1),i(r,!0,"error",(R=(c=s==null?void 0:s.response)==null?void 0:c.data)==null?void 0:R.msg,l,location.reload()),s})},J=a=>{o(!0),U.UserRoleAPI.createUserRole(a).then(({data:t})=>{t.status==="Success"?(o(!1),i(r,!0,"success","Successfully Created"),setTimeout(()=>{v(),l(0)},2e3)):(o(!1),i(r,!0,"error","An Error Occurred, Please Try Again",l,location.reload()))}).catch(t=>{var s,c;throw o(!1),i(r,!0,t?(c=(s=t.response)==null?void 0:s.data)==null?void 0:c.msg:"An Error Occurred",l,location.reload()),t})};return e.jsx("div",{children:e.jsxs(xe,{fullScreen:y,open:p,onClose:v,"aria-labelledby":"responsive-dialog-title",sx:{top:S?"33%":n?"25%":"20%",height:S?"49%":n?"39%":"60%","& .MuiPaper-root":{width:"100%"}},children:[e.jsx(L,{fontFamily:w.fontFamily,fontSize:w.h2.fontSize,color:h.grey[100],fontWeight:"600",display:"inline-block",textAlign:"center",marginTop:"10px",children:`${x} ${P}`}),e.jsx(te,{initialValues:A,enableReinitialize:!0,validationSchema:fe,onSubmit:a=>{a.id?Y(a):J(a)},children:({values:a,errors:t,touched:s,dirty:c,isSubmitting:R,handleBlur:W,handleChange:F,handleSubmit:K,resetForm:X})=>e.jsxs("form",{onSubmit:K,children:[e.jsxs(g,{display:"grid",gap:"30px",gridTemplateColumns:"repeat(2, minmax(0, 1fr))",padding:"20px",children:[e.jsx(B,{variant:"filled",type:"text",name:"name",label:"Name*",autoComplete:"new-name",onBlur:W,onChange:F,value:a.name,error:!!s.name&&!!t.name,helperText:s.name&&t.name}),e.jsx(B,{variant:"filled",type:"text",label:"Priority",name:"priority",autoComplete:"new-priority",onBlur:W,onChange:F,value:a.priority,error:!!s.priority&&!!t.priority,helperText:s.priority&&t.priority}),e.jsxs(ae,{variant:"filled",sx:{minWidth:120},error:!!s.status&&!!t.status,children:[e.jsx(se,{id:"statusField",children:"Status"}),e.jsxs(ne,{variant:"filled",labelId:"statusField",label:"Status",name:"status",autoComplete:"new-status",value:a.status,onChange:F,children:[e.jsx($,{value:"active",children:"Active"}),e.jsx($,{value:"inactive",children:"Inactive"})]})]})]}),e.jsx(oe,{}),e.jsxs(g,{display:"flex",justifyContent:"end",p:"20px",children:[x==="Update"?null:e.jsx(j,{type:"reset",color:"warning",variant:"contained",sx:{mr:3},disabled:!c||R,onClick:()=>{window.confirm("Do You Really Want To Reset?")&&X()},children:"Reset"}),e.jsx(j,{color:"error",variant:"contained",sx:{mr:3},onClick:()=>v(),children:"Cancel"}),e.jsx(j,{type:"submit",disabled:!c||R,color:x==="Update"?"info":"success",variant:"contained",children:"Submit"}),e.jsx(ie,{alerting:C.toastAlert,severity:C.toastSeverity,message:C.toastMessage})]})]})}),E===!0?e.jsx(he,{}):null]})})},ve=p=>{const f=N(),d=M(f.palette.mode),h=O(),y=n=>{p(),h("#",{state:{id:n}})};return[{field:"name",headerName:"NAME",headerAlign:"center",align:"center",flex:1,minWidth:120},{field:"priority",headerName:"PRIORITY",headerAlign:"center",align:"center",flex:1,minWidth:120},{field:"updated_at",headerName:"UPDATED AT",headerAlign:"center",align:"center",flex:1,minWidth:100,valueFormatter:n=>n==null?void 0:n.value.substring(0,10)},{field:"status",headerName:"STATUS",headerAlign:"center",align:"center",flex:1,minWidth:120,renderCell:({row:{status:n}})=>e.jsx(g,{width:"60%",m:"0 auto",p:"5px",display:"flex",justifyContent:"center",backgroundColor:n==="active"?d.greenAccent[600]:d.redAccent[700],borderRadius:"4px",children:e.jsx(L,{color:d.grey[100],sx:{ml:"5px"},children:n})})},{field:"action",headerName:"ACTION",headerAlign:"center",align:"center",flex:1,minWidth:75,renderCell:({row:{id:n}})=>e.jsx(g,{width:"30%",m:"0 auto",p:"5px",display:"flex",justifyContent:"center",children:e.jsx(j,{color:"info",variant:"contained",onClick:()=>y(n),sx:{minWidth:"50px"},children:e.jsx(re,{})})})}]},_=p=>({type:le.SET_USER_ROLES,payload:p}),je=[5,10,20],Pe=()=>{const[p,f]=m.useState(!1),[d,h]=m.useState({search:!1,searching:!1}),[y,S]=m.useState(),n=O(),v=q(),x=D(i=>i.menuItems.selected),{listData:b,loading:E}=D(i=>i.allUserRoles),o=N(),A=M(o.palette.mode),u=I("(max-width:480px)"),l=I("(max-width:920px)"),r=document.getElementById("reload-btn"),{getPaginatedData:P}=ge(),{getLocalStorage:C}=Q();m.useEffect(()=>{const i=C("menu");v(G(i.selected))},[]);const T=()=>{r.style.display="none",h({search:!1,searching:!1,oldPagination:y})},w=()=>{f(!0)};return e.jsxs(g,{m:"10px",position:"relative",children:[e.jsx(g,{height:u?"19vh":l?"8vh":"11vh",borderRadius:"4px",padding:u?"1vh":"2vh",backgroundColor:A.blueAccent[700],children:e.jsxs(g,{display:"flex",height:u?"16vh":"7vh",flexDirection:u?"column":"row",justifyContent:"space-between",alignItems:u?"center":"normal",children:[e.jsx(L,{component:"h2",variant:"h2",color:A.grey[100],fontWeight:"bold",children:x}),e.jsx(ce,{action:_,api:U.UserRoleAPI,getSearchData:P,oldPagination:y,reloadBtn:r,setSearchFlag:h}),e.jsxs(j,{type:"submit",color:"success",variant:"contained",onClick:()=>{n("#",{state:{id:void 0}}),w()},sx:{height:l?"4vh":"auto"},children:["Create New ",x]})]})}),e.jsxs(j,{sx:{display:"none",position:"absolute",top:u?"23vh":l?"10.5vh":"16.5vh",left:u?"80vw":l?"39.5vw":"26vw",zIndex:1,borderRadius:"20%",color:A.grey[100]},id:"reload-btn",type:"button",onClick:T,children:[e.jsx("span",{style:{display:"inherit",marginRight:"5px"},children:e.jsx(de,{})}),"Back"]}),e.jsx(ue,{action:_,api:U.UserRoleAPI,getQuery:P,columns:ve(w),rows:b.rows,count:b.count,loading:E,selected:x,pageSizeOptions:je,setOldPagination:S,searchFlag:d,setSearchFlag:h}),e.jsx(ye,{openDialog:p,setOpenDialog:f})]})};export{Pe as default};