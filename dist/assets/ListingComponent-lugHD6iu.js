import{u as B,t as W,b as M,a as m,f as k,h as U,k as X,l as ue,d as he,s as Z,A,j as e,T as $,F as me,B as w,m as J,n as pe,I as ge,S as xe,M as R,D as fe,o as E,p as je,U as z,R as be,y as Y}from"./index-wJj9abeo.js";import{d as Ce,S as ye,a as ve,b as Ae}from"./DriveFileRenameOutlineOutlined-wh212PVW.js";import{c as we,a as Se,L as Te}from"./Loader-V9kt_BZH.js";import{s as ee}from"./SubjectAction-mW2zJbl_.js";import{u as V}from"./index-ngBz0NVi.js";import{D as De}from"./Dialog-H17IDJ7F.js";import{A as Pe}from"./FormControlLabel-rkyz9wHp.js";import"./index-R3E-xKkl.js";import"./ListItemText-UY9Do7UF.js";import"./Chip-3qarAbJU.js";const Fe=we().shape({name:Se().min(1,"Name is Too Short!").max(40,"Name is Too Long!").required("This Field is Required")}),K={name:"",status:"inactive",subjects:[]},Ie=({openDialog:N,setOpenDialog:l})=>{var G,Q;const C=B(),y=W(C.palette.mode),p=M(C.breakpoints.down("md")),S=M("(max-width:480px)"),T=M("(max-width:920px)"),v=()=>{l(!1)},[x,f]=m.useState("Create"),[D,t]=m.useState(!1),[d,r]=m.useState(K),s=k(a=>a.allFormSubjects),P=k(a=>a.menuItems.selected),u=k(a=>a.toastInfo),g=U(),h=X(),{state:F}=ue(),{typography:j}=he(C.palette.mode),{getPaginatedData:te}=V(),{toastAndNavigate:b,getLocalStorage:ae,getIdsFromObject:q,getValuesFromArray:se}=z();let L=F==null?void 0:F.id;m.useEffect(()=>{const a=ae("menu");h(Z(a.selected)),L?(f("Update"),oe(L)):(f("Create"),r(K))},[L]);const ne=m.useCallback(a=>{const n=[{...a,subjects:q(a.subjects)}],o=["/update-class"];t(!0),A.CommonAPI.multipleAPICall("PATCH",o,n).then(i=>{let c=!0;i.forEach(I=>{I.data.status!=="Success"&&(c=!1)}),c?(t(!1),b(h,!0,"info","Successfully Updated",g,"/class/listing",location.reload())):(t(!1),b(h,!0,"error","An Error Occurred. Please Try Again",g,location.reload()))}).catch(i=>{var c,I;throw t(!1),b(h,!0,"error",(I=(c=i==null?void 0:i.response)==null?void 0:c.data)==null?void 0:I.msg),i})},[]),oe=a=>{t(!0);const n=[`/get-by-pk/class/${a}`];A.CommonAPI.multipleAPICall("GET",n).then(o=>{var i,c;o[0].data.status==="Success"?(o[0].data.data.subjects=se((i=o[0].data.data)==null?void 0:i.subjects,(c=s==null?void 0:s.listData)==null?void 0:c.rows),r(o[0].data.data),t(!1)):(t(!1),b(h,!0,"error","An Error Occurred, Please Try Again",g,location.reload()))}).catch(o=>{var i,c;throw t(!1),b(h,!0,"error",(c=(i=o==null?void 0:o.response)==null?void 0:i.data)==null?void 0:c.msg,g,location.reload()),o})},ie=a=>{console.log(a.subjects),t(!0),a={...a,subjects:q(a==null?void 0:a.subjects)},A.ClassAPI.createClass(a).then(({data:n})=>{(n==null?void 0:n.status)==="Success"?(t(!1),b(h,!0,"success","Successfully Created"),setTimeout(()=>{v(),g(0)},2e3)):(t(!1),b(h,!0,"error","An Error Occurred, Please Try Again",g,location.reload()))}).catch(n=>{var o,i;throw t(!1),b(h,!0,n?(i=(o=n.response)==null?void 0:o.data)==null?void 0:i.msg:"An Error Occurred",g,location.reload()),n})};return m.useEffect(()=>{var a,n;(n=(a=s==null?void 0:s.listData)==null?void 0:a.rows)!=null&&n.length||te(0,50,ee,A.SubjectAPI)},[(Q=(G=s==null?void 0:s.listData)==null?void 0:G.rows)==null?void 0:Q.length]),e.jsx("div",{children:e.jsxs(De,{fullScreen:p,open:N,onClose:v,"aria-labelledby":"responsive-dialog-title",sx:{top:S?"33%":T?"25%":"20%",height:S?"49%":T?"39%":"60%","& .MuiPaper-root":{width:"100%"}},children:[e.jsx($,{fontFamily:j.fontFamily,fontSize:j.h2.fontSize,color:y.grey[100],fontWeight:"600",display:"inline-block",textAlign:"center",marginTop:"10px",children:`${x} ${P}`}),e.jsx(me,{initialValues:d,enableReinitialize:!0,validationSchema:Fe,onSubmit:a=>{a.id?ne(a):ie(a)},children:({values:a,errors:n,touched:o,dirty:i,isSubmitting:c,handleBlur:I,handleChange:_,handleSubmit:le,resetForm:ce,setFieldValue:re})=>{var H;return e.jsxs("form",{onSubmit:le,children:[e.jsxs(w,{display:"grid",gap:"30px",gridTemplateColumns:"repeat(2, minmax(0, 1fr))",padding:"20px",children:[e.jsx(J,{variant:"filled",type:"text",name:"name",label:"Name*",autoComplete:"new-name",onBlur:I,onChange:_,value:a.name,error:!!o.name&&!!n.name,helperText:o.name&&n.name}),e.jsxs(pe,{variant:"filled",sx:{minWidth:120},error:!!o.status&&!!n.status,children:[e.jsx(ge,{id:"statusField",children:"Status"}),e.jsxs(xe,{variant:"filled",labelId:"statusField",label:"Status",name:"status",autoComplete:"new-status",value:a.status,onChange:_,children:[e.jsx(R,{value:"active",children:"Active"}),e.jsx(R,{value:"inactive",children:"Inactive"})]})]}),e.jsx(Pe,{multiple:!0,options:((H=s==null?void 0:s.listData)==null?void 0:H.rows)||[],getOptionLabel:O=>O.name,disableCloseOnSelect:!0,value:a.subjects,onChange:(O,de)=>re("subjects",de),sx:{gridColumn:"span 2"},renderInput:O=>e.jsx(J,{...O,variant:"filled",type:"text",name:"subjects",label:"Subjects",error:!!o.subjects&&!!n.subjects,helperText:o.subjects&&n.subjects})})]}),e.jsx(fe,{}),e.jsxs(w,{display:"flex",justifyContent:"end",p:"20px",children:[x==="Update"?null:e.jsx(E,{type:"reset",color:"warning",variant:"contained",sx:{mr:3},disabled:!i||c,onClick:()=>{window.confirm("Do You Really Want To Reset?")&&ce()},children:"Reset"}),e.jsx(E,{color:"error",variant:"contained",sx:{mr:3},onClick:()=>v(),children:"Cancel"}),e.jsx(E,{type:"submit",disabled:!i||c,color:x==="Update"?"info":"success",variant:"contained",children:"Submit"}),e.jsx(je,{alerting:u.toastAlert,severity:u.toastSeverity,message:u.toastMessage})]})]})}}),D===!0?e.jsx(Te,{}):null]})})},ke=N=>{var f,D;const l=k(t=>t.allFormSubjects),C=U(),y=B(),p=W(y.palette.mode),{getPaginatedData:S}=V(),{findMultipleById:T}=z(),v=t=>{N(),C("#",{state:{id:t}})};return m.useEffect(()=>{var t,d;(d=(t=l==null?void 0:l.listData)==null?void 0:t.rows)!=null&&d.length||S(0,50,ee,A.SubjectAPI)},[(D=(f=l==null?void 0:l.listData)==null?void 0:f.rows)==null?void 0:D.length]),[{field:"name",headerName:"NAME",headerAlign:"center",align:"center",flex:1,minWidth:120},{field:"subjects",headerName:"SUBJECTS",headerAlign:"center",align:"center",flex:2,minWidth:120,renderCell:t=>{var s;const d=t==null?void 0:t.row.subjects,r=T(d,(s=l==null?void 0:l.listData)==null?void 0:s.rows);return console.log(d,r,"class"),e.jsx("div",{style:{width:"100%",height:"40px"},children:r.map((P,u)=>e.jsxs(be.Fragment,{children:[u>0&&",",P.name,u>0&&u%4===0&&e.jsx("br",{})]},u))})}},{field:"status",headerName:"STATUS",headerAlign:"center",align:"center",flex:1,minWidth:120,renderCell:({row:{status:t}})=>e.jsx(w,{width:"60%",m:"0 auto",p:"5px",display:"flex",justifyContent:"center",backgroundColor:t==="active"?p.greenAccent[600]:p.redAccent[700],borderRadius:"4px",children:e.jsx($,{color:p.grey[100],sx:{ml:"5px"},children:t})})},{field:"action",headerName:"ACTION",headerAlign:"center",align:"center",flex:1,minWidth:75,renderCell:({row:{id:t}})=>e.jsx(w,{width:"30%",m:"0 auto",p:"5px",display:"flex",justifyContent:"center",children:e.jsx(E,{color:"info",variant:"contained",onClick:()=>v(t),sx:{minWidth:"50px"},children:e.jsx(Ce,{})})})}]},Ee=[5,10,20],qe=()=>{const[N,l]=m.useState(!1),[C,y]=m.useState({search:!1,searching:!1}),[p,S]=m.useState(),T=U(),v=X(),x=k(j=>j.menuItems.selected),{listData:f,loading:D}=k(j=>j.allClasses),t=B(),d=W(t.palette.mode),r=M("(max-width:480px)"),s=M("(max-width:920px)"),P=document.getElementById("reload-btn"),{getPaginatedData:u}=V(),{getLocalStorage:g}=z();m.useEffect(()=>{const j=g("menu");v(Z(j.selected))},[]);const h=()=>{P.style.display="none",y({search:!1,searching:!1,oldPagination:p})},F=()=>{l(!0)};return e.jsxs(w,{m:"10px",position:"relative",children:[e.jsx(w,{height:r?"19vh":s?"8vh":"11vh",borderRadius:"4px",padding:r?"1vh":"2vh",backgroundColor:d.blueAccent[700],children:e.jsxs(w,{display:"flex",height:r?"16vh":"7vh",flexDirection:r?"column":"row",justifyContent:"space-between",alignItems:r?"center":"normal",children:[e.jsx($,{component:"h2",variant:"h2",color:d.grey[100],fontWeight:"bold",children:x}),e.jsx(ye,{action:Y,api:A.ClassAPI,getSearchData:u,oldPagination:p,reloadBtn:P,setSearchFlag:y}),e.jsxs(E,{type:"submit",color:"success",variant:"contained",onClick:()=>{T("#",{state:{id:void 0}}),F()},sx:{height:s?"4vh":"auto"},children:["Create New ",x]})]})}),e.jsxs(E,{sx:{display:"none",position:"absolute",top:r?"23vh":s?"10.5vh":"16.5vh",left:r?"80vw":s?"39.5vw":"26vw",zIndex:1,borderRadius:"20%",color:d.grey[100]},id:"reload-btn",type:"button",onClick:h,children:[e.jsx("span",{style:{display:"inherit",marginRight:"5px"},children:e.jsx(ve,{})}),"Back"]}),e.jsx(Ae,{action:Y,api:A.ClassAPI,getQuery:u,columns:ke(F),rows:f.rows,count:f.count,loading:D,selected:x,pageSizeOptions:Ee,setOldPagination:S,searchFlag:C,setSearchFlag:y}),e.jsx(Ie,{openDialog:N,setOpenDialog:l})]})};export{qe as default};