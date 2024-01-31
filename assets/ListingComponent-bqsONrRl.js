import{f as c,h as v,u as C,t as w,j as t,B as r,T as o,o as x,q as I,k as D,x as R,b as A,a as m,s as E,A as b,U as B}from"./index-j0XQm0-z.js";import{d as M,S as L,a as F,b as O}from"./DriveFileRenameOutlineOutlined-4CHf_UY8.js";import{u as P}from"./index-WHxx72WB.js";import"./FormControlLabel-vP-JM7OO.js";import"./Chip-tKtg7KcT.js";import"./index-CJPbghPq.js";import"./ListItemText-e9tRpIBM.js";const _=()=>{c(e=>e.allClasses),c(e=>e.allSections);const s=v(),d=C(),n=w(d.palette.mode);P();const a=e=>{s(`/payment/update/${e}`,{state:{id:e}})};return[{field:"academic_year",headerName:"Academic Year",headerAlign:"center",align:"center",flex:1,minWidth:120},{field:"amount",headerName:"Amount",headerAlign:"center",align:"center",flex:1,minWidth:100},{field:"due_date",headerName:"Due Date",headerAlign:"center",align:"center",flex:1,minWidth:100},{field:"type",headerName:"Type",headerAlign:"center",align:"center",flex:1,minWidth:120,renderCell:({row:{type:e}})=>t.jsx(r,{width:"60%",m:"0 auto",p:"5px",display:"flex",justifyContent:"center",backgroundColor:e==="school"?n.greenAccent[600]:e==="event"?n.redAccent[700]:e==="cycle stand"?n.blueAccent[800]:n.blueAccent[900],borderRadius:"4px",children:t.jsx(o,{color:n.grey[100],sx:{ml:"5px"},children:status})})},{field:"payment_status",headerName:"Payment Status",headerAlign:"center",align:"center",flex:1,minWidth:120,renderCell:({row:{payment_status:e}})=>t.jsx(r,{width:"60%",m:"0 auto",p:"5px",display:"flex",justifyContent:"center",backgroundColor:e==="pending"?n.greenAccent[600]:e==="partial"?n.redAccent[700]:n.blueAccent[800],borderRadius:"4px",children:t.jsx(o,{color:n.grey[100],sx:{ml:"5px"},children:e})})},{field:"payment_method",headerName:"Payment Method",headerAlign:"center",align:"center",flex:1,minWidth:120,renderCell:({row:{payment_method:e}})=>t.jsx(r,{width:"60%",m:"0 auto",p:"5px",display:"flex",justifyContent:"center",backgroundColor:e==="cash"?n.greenAccent[600]:e==="credit card"?n.redAccent[700]:n.blueAccent[800],borderRadius:"4px",children:t.jsx(o,{color:n.grey[100],sx:{ml:"5px"},children:e})})},{field:"payment_date",headerName:"Payment Date",headerAlign:"center",align:"center",flex:1,minWidth:100},{field:"late_fee",headerName:"Late Fee",headerAlign:"center",align:"center",flex:1,minWidth:100},{field:"action",headerName:"ACTION",headerAlign:"center",align:"center",flex:1,minWidth:75,renderCell:({row:{id:e}})=>t.jsx(r,{width:"30%",m:"0 auto",p:"5px",display:"flex",justifyContent:"center",children:t.jsx(x,{color:"info",variant:"contained",onClick:()=>a(e),sx:{minWidth:"50px"},children:t.jsx(M,{})})})}]},j=s=>({type:I.SET_PAYMENTS,payload:s}),z=[5,10,20],K=()=>{const s=C(),d=v(),n=D();R();const a=A("(max-width:480px)"),i=A("(max-width:920px)"),e=c(l=>l.menuItems.selected),{listData:g,loading:S}=c(l=>l.allPayments),[N,h]=m.useState({search:!1,searching:!1}),[p,T]=m.useState(),{getPaginatedData:f}=P(),{getLocalStorage:W,setLocalStorage:Q}=B(),u=w(s.palette.mode),y=document.getElementById("reload-btn");m.useEffect(()=>{const l=W("menu");n(E(l.selected))},[]);const k=()=>{y.style.display="none",h({search:!1,searching:!1,oldPagination:p})};return t.jsxs(r,{m:"10px",position:"relative",children:[t.jsx(r,{height:a?"19vh":i?"8vh":"11vh",borderRadius:"4px",padding:a?"1vh":"2vh",backgroundColor:u.blueAccent[700],children:t.jsxs(r,{display:"flex",height:a?"16vh":"7vh",flexDirection:a?"column":"row",justifyContent:"space-between",alignItems:a?"center":"normal",children:[t.jsx(o,{component:"h2",variant:"h2",color:u.grey[100],fontWeight:"bold",children:e}),t.jsx(L,{action:j,api:b.PaymentAPI,getSearchData:f,oldPagination:p,reloadBtn:y,setSearchFlag:h}),t.jsxs(x,{type:"submit",color:"success",variant:"contained",onClick:()=>{d("/payment/create")},sx:{height:i?"4vh":"auto"},children:["Create New ",e]})]})}),t.jsxs(x,{sx:{display:"none",position:"absolute",top:a?"23vh":i?"10.5vh":"16.5vh",left:a?"80vw":i?"39.5vw":"26vw",zIndex:1,borderRadius:"20%",color:u.grey[100]},id:"reload-btn",type:"button",onClick:k,children:[t.jsx("span",{style:{display:"inherit",marginRight:"5px"},children:t.jsx(F,{})}),"Back"]}),t.jsx(O,{action:j,api:b.PaymentAPI,getQuery:f,columns:_(),rows:g.rows,count:g.count,loading:S,selected:e,pageSizeOptions:z,setOldPagination:T,searchFlag:N,setSearchFlag:h})]})};export{K as default};
