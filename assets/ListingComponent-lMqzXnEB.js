import{u as M,t as O,b as P,a as m,f as N,h as W,k as G,l as ee,d as te,s as Q,A as k,j as e,T as L,F as ae,B as x,m as B,n as ne,I as se,S as ie,M as $,D as oe,o as j,p as le,U as V}from"./index-j0XQm0-z.js";import{d as re,S as ce,a as de,b as ue}from"./DriveFileRenameOutlineOutlined-4CHf_UY8.js";import{c as me,a as z,L as pe}from"./Loader-qLG1U33i.js";import{D as he}from"./Dialog-ofLzUiMY.js";import{s as _}from"./AmenityAction-O6IQv3iM.js";import{u as xe}from"./index-WHxx72WB.js";import"./FormControlLabel-vP-JM7OO.js";import"./Chip-tKtg7KcT.js";import"./index-CJPbghPq.js";import"./ListItemText-e9tRpIBM.js";const ge=me().shape({name:z().min(2,"Name is Too Short!").max(40,"Name is Too Long!").required("This Field is Required"),description:z()}),q={name:"",description:"",status:"inactive"},fe=({openDialog:S,setOpenDialog:g})=>{const c=M(),p=O(c.palette.mode),f=P(c.breakpoints.down("md")),b=P("(max-width:480px)"),s=P("(max-width:920px)"),v=()=>{g(!1)},[h,C]=m.useState("Create"),[F,i]=m.useState(!1),[T,d]=m.useState(q),y=N(a=>a.menuItems.selected),A=N(a=>a.toastInfo),u=W(),l=G(),{state:w}=ee(),{typography:I}=te(c.palette.mode),{toastAndNavigate:o,getLocalStorage:Y}=V();let E=w==null?void 0:w.id;console.log("state.id=>",E),m.useEffect(()=>{const a=Y("menu");l(Q(a.selected)),E?(C("Update"),J(E)):(C("Create"),d(q))},[E]);const H=a=>{i(!0),k.AmenityAPI.updateAmenity(a).then(({data:t})=>{(t==null?void 0:t.status)==="Success"?(i(!1),o(l,!0,"info","Successfully Updated"),setTimeout(()=>{v(),location.href="/amenity/listing"},2e3)):(i(!1),o(l,!0,"error","An Error Occurred, Please Try Again",u,location.reload()))}).catch(t=>{var n,r;throw i(!1),o(l,!0,"error",(r=(n=t==null?void 0:t.response)==null?void 0:n.data)==null?void 0:r.msg,u,location.reload()),t})},J=a=>{i(!0);const t=[`/get-by-pk/amenity/${a}`];k.CommonAPI.multipleAPICall("GET",t).then(n=>{n[0].data.status==="Success"?(d(n[0].data.data),i(!1)):(i(!1),o(l,!0,"error","An Error Occurred, Please Try Again",u,location.reload()))}).catch(n=>{var r,D;throw i(!1),o(l,!0,"error",(D=(r=n==null?void 0:n.response)==null?void 0:r.data)==null?void 0:D.msg,u,location.reload()),n})},K=a=>{i(!0),k.AmenityAPI.createAmenity(a).then(({data:t})=>{(t==null?void 0:t.status)==="Success"?(i(!1),o(l,!0,"success","Successfully Created"),setTimeout(()=>{v(),u(0)},2e3)):(i(!1),o(l,!0,"error","An Error Occurred, Please Try Again",u,location.reload()))}).catch(t=>{var n,r;throw i(!1),o(l,!0,t?(r=(n=t.response)==null?void 0:n.data)==null?void 0:r.msg:"An Error Occurred",u,location.reload()),t})};return e.jsx("div",{children:e.jsxs(he,{fullScreen:f,open:S,onClose:v,"aria-labelledby":"responsive-dialog-title",sx:{top:b?"33%":s?"25%":"20%",height:b?"49%":s?"39%":"60%","& .MuiPaper-root":{width:"100%"}},children:[e.jsx(L,{fontFamily:I.fontFamily,fontSize:I.h2.fontSize,color:p.grey[100],fontWeight:"600",display:"inline-block",textAlign:"center",marginTop:"10px",children:`${h} ${y}`}),e.jsx(ae,{initialValues:T,enableReinitialize:!0,validationSchema:ge,onSubmit:a=>{a.id?H(a):K(a)},children:({values:a,errors:t,touched:n,dirty:r,isSubmitting:D,handleBlur:U,handleChange:R,handleSubmit:X,resetForm:Z})=>e.jsxs("form",{onSubmit:X,children:[e.jsxs(x,{display:"grid",gap:"30px",gridTemplateColumns:"repeat(2, minmax(0, 1fr))",padding:"20px",children:[e.jsx(B,{variant:"filled",type:"text",name:"name",label:"Name*",autoComplete:"new-name",onBlur:U,onChange:R,value:a.name,error:!!n.name&&!!t.name,helperText:n.name&&t.name}),e.jsx(B,{variant:"filled",type:"text",label:"Description",name:"description",autoComplete:"new-description",onBlur:U,onChange:R,value:a.description,error:!!n.description&&!!t.description,helperText:n.description&&t.description}),e.jsxs(ne,{variant:"filled",sx:{minWidth:120},error:!!n.status&&!!t.status,children:[e.jsx(se,{id:"statusField",children:"Status"}),e.jsxs(ie,{variant:"filled",labelId:"statusField",label:"Status",name:"status",autoComplete:"new-status",value:a.status,onChange:R,children:[e.jsx($,{value:"active",children:"Active"}),e.jsx($,{value:"inactive",children:"Inactive"})]})]})]}),e.jsx(oe,{}),e.jsxs(x,{display:"flex",justifyContent:"end",p:"20px",children:[h==="Update"?null:e.jsx(j,{type:"reset",color:"warning",variant:"contained",sx:{mr:3},disabled:!r||D,onClick:()=>{window.confirm("Do You Really Want To Reset?")&&Z()},children:"Reset"}),e.jsx(j,{color:"error",variant:"contained",sx:{mr:3},onClick:()=>v(),children:"Cancel"}),e.jsx(j,{type:"submit",disabled:!r||D,color:h==="Update"?"info":"success",variant:"contained",children:"Submit"}),e.jsx(le,{alerting:A.toastAlert,severity:A.toastSeverity,message:A.toastMessage})]})]})}),F===!0?e.jsx(pe,{}):null]})})},ve=S=>{const g=M(),c=O(g.palette.mode),p=W(),f=s=>{S(),p("#",{state:{id:s}})};return[{field:"name",headerName:"NAME",headerAlign:"center",align:"center",flex:1,minWidth:120},{field:"description",headerName:"DESCRIPTION",headerAlign:"center",align:"center",flex:1,minWidth:280},{field:"updated_at",headerName:"UPDATED AT",headerAlign:"center",align:"center",flex:1,minWidth:100,valueFormatter:s=>s==null?void 0:s.value.substring(0,10)},{field:"status",headerName:"STATUS",headerAlign:"center",align:"center",flex:1,minWidth:120,renderCell:({row:{status:s}})=>e.jsx(x,{width:"60%",m:"0 auto",p:"5px",display:"flex",justifyContent:"center",backgroundColor:s==="active"?c.greenAccent[600]:c.redAccent[700],borderRadius:"4px",children:e.jsx(L,{color:c.grey[100],sx:{ml:"5px"},children:s})})},{field:"action",headerName:"ACTION",headerAlign:"center",align:"center",flex:1,minWidth:75,renderCell:({row:{id:s}})=>e.jsx(x,{width:"30%",m:"0 auto",p:"5px",display:"flex",justifyContent:"center",children:e.jsx(j,{color:"info",variant:"contained",onClick:()=>f(s),sx:{minWidth:"50px"},children:e.jsx(re,{})})})}]},ye=[5,10,20],ke=()=>{const[S,g]=m.useState(!1),[c,p]=m.useState({search:!1,searching:!1}),[f,b]=m.useState(),s=W(),v=G(),h=N(o=>o.menuItems.selected),{listData:C,loading:F}=N(o=>o.allAmenities),i=M(),T=O(i.palette.mode),d=P("(max-width:480px)"),y=P("(max-width:920px)"),A=document.getElementById("reload-btn"),{getPaginatedData:u}=xe(),{getLocalStorage:l}=V();m.useEffect(()=>{const o=l("menu");v(Q(o.selected))},[]);const w=()=>{A.style.display="none",p({search:!1,searching:!1,oldPagination:f})},I=()=>{g(!0)};return e.jsxs(x,{m:"10px",position:"relative",children:[e.jsx(x,{height:d?"19vh":y?"8vh":"11vh",borderRadius:"4px",padding:d?"1vh":"2vh",backgroundColor:T.blueAccent[700],children:e.jsxs(x,{display:"flex",height:d?"16vh":"7vh",flexDirection:d?"column":"row",justifyContent:"space-between",alignItems:d?"center":"normal",children:[e.jsx(L,{component:"h2",variant:"h2",color:T.grey[100],fontWeight:"bold",children:h}),e.jsx(ce,{action:_,api:k.AmenityAPI,getSearchData:u,oldPagination:f,reloadBtn:A,setSearchFlag:p}),e.jsxs(j,{type:"submit",color:"success",variant:"contained",onClick:()=>{s("#",{state:{id:void 0}}),I()},sx:{height:y?"4vh":"auto"},children:["Create New ",h]})]})}),e.jsxs(j,{sx:{display:"none",position:"absolute",top:d?"23vh":y?"10.5vh":"16.5vh",left:d?"80vw":y?"39.5vw":"26vw",zIndex:1,borderRadius:"20%",color:T.grey[100]},id:"reload-btn",type:"button",onClick:w,children:[e.jsx("span",{style:{display:"inherit",marginRight:"5px"},children:e.jsx(de,{})}),"Back"]}),e.jsx(ue,{action:_,api:k.AmenityAPI,getQuery:u,columns:ve(I),rows:C.rows,count:C.count,loading:F,selected:h,pageSizeOptions:ye,setOldPagination:b,searchFlag:c,setSearchFlag:p}),e.jsx(fe,{openDialog:S,setOpenDialog:g})]})};export{ke as default};
