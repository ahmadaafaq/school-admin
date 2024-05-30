import{q as ne,s as se,P as B,u as M,t as O,h as w,a as c,v as W,w as V,l as F,x as oe,k as ie,y as H,A as T,j as e,D as re,m as U,T as $,F as le,B as h,z as ce,C as de,I as ue,S as me,E as q,M as pe,G as ge,p as I,H as he,J as xe,U as L}from"./index-zLCHO5gj.js";import{l as G,S as fe,a as be}from"./listBG-jqFZybtA.js";import{d as Se}from"./DriveFileRenameOutlineOutlined-sr1QJdZi.js";import{b as _}from"./SectionAction-X4gvrGyO.js";import{u as ve}from"./index-mkkoW40k.js";import"./FormControlLabel-SXp-cdUw.js";import"./toPropertyKey-mta9U6ZT.js";import"./typeof-Q9eVcF_1.js";import"./ListItemText-2nz_AZOg.js";import"./CircularProgress-ieWN9mTc.js";import"./TableCell-yZ9kbJpi.js";const ye=ne().shape({name:se().min(0,"Name is Too Short!").max(20,"Name is Too Long!").required("This Field is Required")}),Q={name:"",status:"active"},J=({openDialog:y,setOpenDialog:x})=>{const i=M(),f=O(i.palette.mode),j=w(i.breakpoints.down("md")),b=w("(max-width:480px)"),S=w("(max-width:920px)"),g=()=>{x(!1)},[n,C]=c.useState("Create"),[N,o]=c.useState(!1),[P,u]=c.useState(Q),d=W(),r=V(),D=F(t=>t.menuItems.selected),A=F(t=>t.toastInfo),{state:v}=oe(),{typography:m}=ie(i.palette.mode),{toastAndNavigate:p,getLocalStorage:Y}=L();let E=v==null?void 0:v.id;c.useEffect(()=>{const t=Y("menu");r(H(t.selected)),E?(C("Update"),X(E)):(C("Create"),u(Q))},[E]);const K=c.useCallback(t=>{o(!0),T.SectionAPI.updateSection(t).then(({data:a})=>{a.status==="Success"?(o(!1),p(r,!0,"info","Successfully Updated"),setTimeout(()=>{g(),location.href="/section/listing"},2e3)):(o(!1),p(r,!0,"error","An Error Occurred, Please Try Again",d,location.reload()))}).catch(a=>{var s,l;throw o(!1),p(r,!0,"error",(l=(s=a==null?void 0:a.response)==null?void 0:s.data)==null?void 0:l.msg,d,location.reload()),a})},[]),X=c.useCallback(t=>{o(!0);const a=[`/get-by-pk/section/${t}`];T.CommonAPI.multipleAPICall("GET",a).then(s=>{s[0].data.status==="Success"?(u(s[0].data.data),o(!1)):(o(!1),p(r,!0,"error","An Error Occurred, Please Try Again",d,location.reload()))}).catch(s=>{var l,k;throw o(!1),p(r,!0,"error",(k=(l=s==null?void 0:s.response)==null?void 0:l.data)==null?void 0:k.msg,d,location.reload()),s})},[E]),Z=c.useCallback(t=>{o(!0),T.SectionAPI.createSection(t).then(({data:a})=>{a.status==="Success"?(o(!1),p(r,!0,"success","Successfully Created"),setTimeout(()=>{g(),d(0)},2e3)):(o(!1),p(r,!0,"error","An Error Occurred, Please Try Again",d,location.reload()))}).catch(a=>{var s,l;throw o(!1),p(r,!0,a?(l=(s=a.response)==null?void 0:s.data)==null?void 0:l.msg:"An Error Occurred",d,location.reload()),a})},[]);return e.jsx("div",{children:e.jsxs(re,{fullScreen:j,open:y,onClose:g,"aria-labelledby":"responsive-dialog-title",sx:{top:b?"33%":S?"25%":"20%",height:b?"49%":S?"39%":"60%","& .MuiPaper-root":{width:"100%",backgroundImage:i.palette.mode=="light"?`linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(${U})`:`linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${U})`,backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover"}},children:[e.jsx($,{fontFamily:m.fontFamily,fontSize:m.h2.fontSize,color:f.grey[100],fontWeight:"600",display:"inline-block",textAlign:"center",marginTop:"10px",children:`${n} ${D}`}),e.jsx(le,{initialValues:P,enableReinitialize:!0,validationSchema:ye,onSubmit:t=>{t.id?K(t):Z(t)},children:({values:t,errors:a,touched:s,dirty:l,isSubmitting:k,handleBlur:ee,handleChange:z,handleSubmit:te,resetForm:ae})=>e.jsxs("form",{onSubmit:te,children:[e.jsxs(h,{display:"grid",gap:"30px",gridTemplateColumns:"repeat(2, minmax(0, 1fr))",padding:"20px",children:[e.jsx(ce,{variant:"filled",type:"text",name:"name",label:"Name*",autoComplete:"new-name",onBlur:ee,onChange:z,value:t.name,error:!!s.name&&!!a.name,helperText:s.name&&a.name}),e.jsxs(de,{variant:"filled",sx:{minWidth:120},error:!!s.status&&!!a.status,children:[e.jsx(ue,{id:"statusField",children:"Status"}),e.jsx(me,{variant:"filled",labelId:"statusField",label:"Status",name:"status",autoComplete:"new-status",value:t.status,onChange:z,children:Object.keys(q.status).map(R=>e.jsx(pe,{value:R,children:q.status[R]},R))})]})]}),e.jsx(ge,{}),e.jsxs(h,{display:"flex",justifyContent:"end",p:"20px",children:[n==="Update"?null:e.jsx(I,{type:"reset",color:"warning",variant:"contained",sx:{mr:3},disabled:!l||k,onClick:()=>{window.confirm("Do You Really Want To Reset?")&&ae()},children:"Reset"}),e.jsx(I,{color:"error",variant:"contained",sx:{mr:3},onClick:()=>g(),children:"Cancel"}),e.jsx(I,{type:"submit",disabled:!l||k,color:n==="Update"?"info":"success",variant:"contained",children:"Submit"}),e.jsx(he,{alerting:A.toastAlert,severity:A.toastSeverity,message:A.toastMessage})]})]})}),N===!0?e.jsx(xe,{}):null]})})};J.propTypes={openDialog:B.bool,setOpenDialog:B.func};const je=y=>{const x=M(),i=O(x.palette.mode),{capitalizeEveryWord:f,formatDate:j}=L(),b=W(),S=n=>{y(),b("#",{state:{id:n}})};return[{field:"section_name",headerName:"Name",headerAlign:"center",align:"center",flex:1,minWidth:120},{field:"status",headerName:"Status",headerAlign:"center",align:"center",flex:1,minWidth:120,renderCell:({row:{status:n}})=>e.jsx(h,{width:"60%",m:"0 auto",p:"5px",display:"flex",justifyContent:"center",backgroundColor:n==="active"?i.greenAccent[600]:i.redAccent[700],borderRadius:"4px",children:e.jsx($,{color:i.grey[100],sx:{ml:"5px"},children:f(n)||""})})},{field:"updated_at",headerName:"Updated",headerAlign:"center",align:"center",flex:1,minWidth:100,valueFormatter:n=>`${j(n.value)}`},{field:"action",headerName:"Action",headerAlign:"center",align:"center",flex:1,minWidth:75,renderCell:({row:{section_id:n}})=>e.jsx(h,{width:"30%",m:"0 auto",p:"5px",display:"flex",justifyContent:"center",children:e.jsx(I,{color:"info",variant:"contained",onClick:()=>S(n),sx:{minWidth:"50px"},children:e.jsx(Se,{})})})}]},Ce=[5,10,20],Me=()=>{const[y,x]=c.useState(!1),[i,f]=c.useState({search:!1,searching:!1}),[j,b]=c.useState(),S=W(),g=V(),n=F(m=>m.menuItems.selected),{listData:C,loading:N}=F(m=>m.listingSections),o=M(),P=O(o.palette.mode),u=w("(max-width:480px)"),d=w("(max-width:920px)"),r=document.getElementById("reload-btn"),{getPaginatedData:D}=ve(),{getLocalStorage:A}=L();c.useEffect(()=>{const m=A("menu");g(H(m.selected))},[]);const v=()=>{x(!0)};return e.jsxs(h,{m:"10px",position:"relative",sx:{borderRadius:"20px",border:"0.5px solid black",overflow:"hidden",boxShadow:"1px 1px 10px black",backgroundImage:o.palette.mode==="light"?`linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${G})`:`linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${G})`,backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover"},children:[e.jsx(h,{height:u?"19vh":d?"8vh":"11vh",borderRadius:"4px",padding:u?"1vh":"2vh",backgroundColor:P.blueAccent[700],children:e.jsxs(h,{display:"flex",height:u?"16vh":"7vh",flexDirection:u?"column":"row",justifyContent:"space-between",alignItems:u?"center":"normal",children:[e.jsx($,{component:"h2",variant:"h2",color:P.grey[100],fontWeight:"bold",children:n}),e.jsx(fe,{action:_,api:T.SectionAPI,getSearchData:D,oldPagination:j,reloadBtn:r,setSearchFlag:f}),e.jsxs(I,{type:"submit",color:"success",variant:"contained",onClick:()=>{S("#",{state:{id:void 0}}),v()},sx:{height:d?"4vh":"auto"},children:["Create New ",n]})]})}),e.jsx(be,{action:_,api:T.SectionAPI,getQuery:D,columns:je(v),rows:C.rows,count:C.count,loading:N,selected:n,pageSizeOptions:Ce,setOldPagination:b,searchFlag:i,setSearchFlag:f}),e.jsx(J,{openDialog:y,setOpenDialog:x})]})};export{Me as default};
