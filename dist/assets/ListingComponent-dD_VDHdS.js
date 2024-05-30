import{q as oe,s as se,P as z,u as N,t as W,h as T,a as c,v as $,w as H,l as U,x as ne,k as ie,y as J,A as k,j as e,D as re,m as B,T as M,F as le,B as x,z as G,C as ce,I as de,S as ue,M as q,G as me,p as I,H as pe,J as ge,U as L}from"./index-zLCHO5gj.js";import{l as Q,S as he,a as xe}from"./listBG-jqFZybtA.js";import{d as fe}from"./DriveFileRenameOutlineOutlined-sr1QJdZi.js";import{a as V}from"./UserRoleAction-wUt_c9OB.js";import{u as be}from"./index-mkkoW40k.js";import"./FormControlLabel-SXp-cdUw.js";import"./toPropertyKey-mta9U6ZT.js";import"./typeof-Q9eVcF_1.js";import"./ListItemText-2nz_AZOg.js";import"./CircularProgress-ieWN9mTc.js";import"./TableCell-yZ9kbJpi.js";const ye=oe().shape({name:se().min(2,"Name is Too Short!").max(20,"Name is Too Long!").required("This Field is Required")}),_={name:"",priority:0,status:"active"},Y=({openDialog:S,setOpenDialog:f})=>{const i=N(),g=W(i.palette.mode),j=T(i.breakpoints.down("md")),b=T("(max-width:480px)"),y=T("(max-width:920px)"),h=()=>{f(!1)},[a,C]=c.useState("Create"),[F,n]=c.useState(!1),[P,u]=c.useState(_),d=$(),r=H(),R=U(o=>o.menuItems.selected),A=U(o=>o.toastInfo),{state:v}=ne(),{typography:m}=ie(i.palette.mode),{toastAndNavigate:p,getLocalStorage:K}=L();let D=v==null?void 0:v.id;c.useEffect(()=>{const o=K("menu");r(J(o.selected)),D?(C("Update"),Z(D)):(C("Create"),u(_))},[D]);const X=c.useCallback(o=>{n(!0),k.UserRoleAPI.updateUserRole(o).then(({data:t})=>{t.status==="Success"?(n(!1),p(r,!0,"info","Successfully Updated"),setTimeout(()=>{h(),location.href="/role/listing"},2e3)):(n(!1),p(r,!0,"error","An Error Occurred, Please Try Again",d,location.reload()))}).catch(t=>{var s,l;throw n(!1),p(r,!0,"error",(l=(s=t==null?void 0:t.response)==null?void 0:s.data)==null?void 0:l.msg,d,location.reload()),t})},[]),Z=c.useCallback(o=>{n(!0);const t=[`/get-by-pk/role/${o}`];k.CommonAPI.multipleAPICall("GET",t).then(s=>{s[0].data.status==="Success"?(u(s[0].data.data),n(!1)):(n(!1),p(r,!0,"error","An Error Occurred, Please Try Again",d,location.reload()))}).catch(s=>{var l,w;throw n(!1),p(r,!0,"error",(w=(l=s==null?void 0:s.response)==null?void 0:l.data)==null?void 0:w.msg,d,location.reload()),s})},[D]),ee=c.useCallback(o=>{n(!0),k.UserRoleAPI.createUserRole(o).then(({data:t})=>{t.status==="Success"?(n(!1),p(r,!0,"success","Successfully Created"),setTimeout(()=>{h(),d(0)},2e3)):(n(!1),p(r,!0,"error","An Error Occurred, Please Try Again",d,location.reload()))}).catch(t=>{var s,l;throw n(!1),p(r,!0,t?(l=(s=t.response)==null?void 0:s.data)==null?void 0:l.msg:"An Error Occurred",d,location.reload()),t})},[]);return e.jsx("div",{children:e.jsxs(re,{fullScreen:j,open:S,onClose:h,"aria-labelledby":"responsive-dialog-title",sx:{top:b?"33%":y?"25%":"20%",height:b?"49%":y?"39%":"60%","& .MuiPaper-root":{width:"100%",backgroundImage:i.palette.mode=="light"?`linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(${B})`:`linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${B})`,backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover"}},children:[e.jsx(M,{fontFamily:m.fontFamily,fontSize:m.h2.fontSize,color:g.grey[100],fontWeight:"600",display:"inline-block",textAlign:"center",marginTop:"10px",children:`${a} ${R}`}),e.jsx(le,{initialValues:P,enableReinitialize:!0,validationSchema:ye,onSubmit:o=>{o.id?X(o):ee(o)},children:({values:o,errors:t,touched:s,dirty:l,isSubmitting:w,handleBlur:O,handleChange:E,handleSubmit:te,resetForm:ae})=>e.jsxs("form",{onSubmit:te,children:[e.jsxs(x,{display:"grid",gap:"30px",gridTemplateColumns:"repeat(2, minmax(0, 1fr))",padding:"20px",children:[e.jsx(G,{variant:"filled",type:"text",name:"name",label:"Name*",autoComplete:"new-name",onBlur:O,onChange:E,value:o.name,error:!!s.name&&!!t.name,helperText:s.name&&t.name}),e.jsx(G,{variant:"filled",type:"text",label:"Priority",name:"priority",autoComplete:"new-priority",onBlur:O,onChange:E,value:o.priority,error:!!s.priority&&!!t.priority,helperText:s.priority&&t.priority}),e.jsxs(ce,{variant:"filled",sx:{minWidth:120},error:!!s.status&&!!t.status,children:[e.jsx(de,{id:"statusField",children:"Status"}),e.jsxs(ue,{variant:"filled",labelId:"statusField",label:"Status",name:"status",autoComplete:"new-status",value:o.status,onChange:E,children:[e.jsx(q,{value:"active",children:"Active"}),e.jsx(q,{value:"inactive",children:"Inactive"})]})]})]}),e.jsx(me,{}),e.jsxs(x,{display:"flex",justifyContent:"end",p:"20px",children:[a==="Update"?null:e.jsx(I,{type:"reset",color:"warning",variant:"contained",sx:{mr:3},disabled:!l||w,onClick:()=>{window.confirm("Do You Really Want To Reset?")&&ae()},children:"Reset"}),e.jsx(I,{color:"error",variant:"contained",sx:{mr:3},onClick:()=>h(),children:"Cancel"}),e.jsx(I,{type:"submit",disabled:!l||w,color:a==="Update"?"info":"success",variant:"contained",children:"Submit"}),e.jsx(pe,{alerting:A.toastAlert,severity:A.toastSeverity,message:A.toastMessage})]})]})}),F===!0?e.jsx(ge,{}):null]})})};Y.propTypes={openDialog:z.bool,setOpenDialog:z.func};const ve=S=>{const f=N(),i=W(f.palette.mode),{capitalizeEveryWord:g,formatDate:j}=L(),b=$(),y=a=>{S(),b("#",{state:{id:a}})};return[{field:"name",headerName:"Name",headerAlign:"center",align:"center",flex:1,minWidth:120,valueGetter:a=>`${g(a.row.name)||""}`},{field:"priority",headerName:"Priority",headerAlign:"center",align:"center",flex:1,minWidth:120},{field:"updated_at",headerName:"Updated",headerAlign:"center",align:"center",flex:1,minWidth:100,valueFormatter:a=>`${j(a.value)}`},{field:"status",headerName:"Status",headerAlign:"center",align:"center",flex:1,minWidth:120,renderCell:({row:{status:a}})=>e.jsx(x,{width:"60%",m:"0 auto",p:"5px",display:"flex",justifyContent:"center",backgroundColor:a==="active"?i.greenAccent[600]:i.redAccent[700],borderRadius:"4px",children:e.jsx(M,{color:i.grey[100],sx:{ml:"5px"},children:g(a)||""})})},{field:"action",headerName:"Action",headerAlign:"center",align:"center",flex:1,minWidth:75,renderCell:({row:{id:a}})=>e.jsx(x,{width:"30%",m:"0 auto",p:"5px",display:"flex",justifyContent:"center",children:e.jsx(I,{color:"info",variant:"contained",onClick:()=>y(a),sx:{minWidth:"50px"},children:e.jsx(fe,{})})})}]},Se=[5,10,20],Fe=()=>{const[S,f]=c.useState(!1),[i,g]=c.useState({search:!1,searching:!1}),[j,b]=c.useState(),y=$(),h=H(),a=U(m=>m.menuItems.selected),{listData:C,loading:F}=U(m=>m.listingUserRoles),n=N(),P=W(n.palette.mode),u=T("(max-width:480px)"),d=T("(max-width:920px)"),r=document.getElementById("reload-btn"),{getPaginatedData:R}=be(),{getLocalStorage:A}=L();c.useEffect(()=>{const m=A("menu");h(J(m.selected))},[]);const v=()=>{f(!0)};return e.jsxs(x,{m:"10px",position:"relative",sx:{borderRadius:"20px",border:"0.5px solid black",overflow:"hidden",boxShadow:"1px 1px 10px black",backgroundImage:n.palette.mode==="light"?`linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${Q})`:`linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${Q})`,backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover"},children:[e.jsx(x,{height:u?"19vh":d?"8vh":"11vh",borderRadius:"4px",padding:u?"1vh":"2vh",backgroundColor:P.blueAccent[700],children:e.jsxs(x,{display:"flex",height:u?"16vh":"7vh",flexDirection:u?"column":"row",justifyContent:"space-between",alignItems:u?"center":"normal",children:[e.jsx(M,{component:"h2",variant:"h2",color:P.grey[100],fontWeight:"bold",children:a}),e.jsx(he,{action:V,api:k.UserRoleAPI,getSearchData:R,oldPagination:j,reloadBtn:r,setSearchFlag:g}),e.jsxs(I,{type:"submit",color:"success",variant:"contained",onClick:()=>{y("#",{state:{id:void 0}}),v()},sx:{height:d?"4vh":"auto"},children:["Create New ",a]})]})}),e.jsx(xe,{action:V,api:k.UserRoleAPI,getQuery:R,columns:ve(v),rows:C.rows,count:C.count,loading:F,selected:a,pageSizeOptions:Se,setOldPagination:b,searchFlag:i,setSearchFlag:g}),e.jsx(Y,{openDialog:S,setOpenDialog:f})]})};export{Fe as default};
