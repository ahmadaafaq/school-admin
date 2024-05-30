import{l,w as N,v as W,u as E,t as B,a as y,V as M,A as S,W as $,U as _,j as t,B as u,T as R,p as L,h as P,y as z,P as F}from"./index-zLCHO5gj.js";import{l as T,S as O,a as Q}from"./listBG-jqFZybtA.js";import{d as U}from"./DriveFileRenameOutlineOutlined-sr1QJdZi.js";import{s as G,a as V}from"./SectionAction-X4gvrGyO.js";import{s as k}from"./TeacherAction-07bEOcuu.js";import{u as q}from"./index-mkkoW40k.js";import"./FormControlLabel-SXp-cdUw.js";import"./toPropertyKey-mta9U6ZT.js";import"./typeof-Q9eVcF_1.js";import"./ListItemText-2nz_AZOg.js";import"./CircularProgress-ieWN9mTc.js";import"./TableCell-yZ9kbJpi.js";const H=(x=null)=>{var h,j,i,I;const a=l(e=>e.schoolClasses),n=l(e=>e.allClasses),o=l(e=>e.schoolSections),s=l(e=>e.allSections),d=N(),C=W(),c=E(),r=B(c.palette.mode),{fetchAndSetAll:f,fetchAndSetSchoolData:b,getLocalStorage:A,capitalizeEveryWord:w}=_(),v=e=>{C(`/teacher/update/${e}`,{state:{id:e}})};return y.useEffect(()=>{var e,m,g,p;A("schoolInfo")||((e=n==null?void 0:n.listData)!=null&&e.length||f(d,M,S.ClassAPI),(m=s==null?void 0:s.listData)!=null&&m.length||f(d,G,S.SectionAPI)),A("schoolInfo")&&(!((g=a==null?void 0:a.listData)!=null&&g.length)||!((p=o==null?void 0:o.listData)!=null&&p.length))&&b(d,$,V)},[(h=a==null?void 0:a.listData)==null?void 0:h.length,(j=o==null?void 0:o.listData)==null?void 0:j.length,(i=n==null?void 0:n.listData)==null?void 0:i.length,(I=s==null?void 0:s.listData)==null?void 0:I.length]),[{field:"teacherName",headerName:"Name",headerAlign:"center",align:"center",flex:1,minWidth:120},{field:"classes",headerName:"Class",headerAlign:"center",align:"center",flex:1,minWidth:100,renderCell:({row:e})=>{if(e.is_class_teacher.data[0]===1){const m=e.classnames.split(",");return t.jsx("div",{children:m.map((g,p)=>t.jsxs("span",{style:{color:g===e.class_section_name?r.redAccent[700]:r.whiteAccent[100]},children:[g,p!==m.length-1&&","]},p))})}}},{field:"subjects",headerName:"Subjects",headerAlign:"center",align:"center",flex:1,minWidth:100},{field:"contact_no",headerName:"Contact",headerAlign:"center",align:"center",flex:1,minWidth:100},{field:"status",headerName:"Status",headerAlign:"center",align:"center",flex:1,minWidth:120,renderCell:({row:{status:e}})=>t.jsx(u,{width:"60%",m:"0 auto",p:"5px",display:"flex",justifyContent:"center",backgroundColor:e==="active"?r.greenAccent[600]:r.redAccent[700],borderRadius:"4px",children:t.jsx(R,{color:r.grey[100],sx:{ml:"5px"},children:w(e)||""})})},x!==1&&{field:"action",headerName:"Action",headerAlign:"center",align:"center",flex:1,minWidth:75,renderCell:({row:{id:e}})=>t.jsx(u,{width:"30%",m:"0 auto",p:"5px",display:"flex",justifyContent:"center",children:t.jsx(L,{color:"info",variant:"contained",onClick:()=>v(e),sx:{minWidth:"50px"},children:t.jsx(U,{})})})}]},J=[5,10,20],K=({rolePriority:x=null})=>{const a=l(i=>i.menuItems.selected),{listData:n,loading:o}=l(i=>i.allTeachers),s=E(),d=W(),C=N(),c=P("(max-width:480px)"),r=P("(max-width:920px)"),[f,b]=y.useState({search:!1,searching:!1}),[A,w]=y.useState(),{getPaginatedData:v}=q(),{getLocalStorage:D}=_(),h=B(s.palette.mode),j=document.getElementById("reload-btn");return y.useEffect(()=>{const i=D("menu");C(z(i.selected))},[]),t.jsxs(u,{m:"10px",position:"relative",sx:{borderRadius:"20px",border:"0.5px solid black",overflow:"hidden",boxShadow:"1px 1px 10px black",backgroundImage:s.palette.mode==="light"?`linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${T})`:`linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${T})`,backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover"},children:[t.jsx(u,{height:c?"19vh":r?"8vh":"11vh",borderRadius:"4px",padding:c?"1vh":"2vh",backgroundColor:h.blueAccent[700],children:t.jsxs(u,{display:"flex",height:c?"16vh":"7vh",flexDirection:c?"column":"row",justifyContent:"space-between",alignItems:c?"center":"normal",children:[t.jsx(R,{component:"h2",variant:"h2",color:h.grey[100],fontWeight:"bold",children:a}),t.jsx(O,{action:k,api:S.TeacherAPI,getSearchData:v,oldPagination:A,reloadBtn:j,setSearchFlag:b}),x>1&&t.jsxs(L,{type:"submit",color:"success",variant:"contained",onClick:()=>{d(`/${a.toLowerCase()}/create`)},sx:{height:r?"4vh":"auto"},children:["Create New ",a]})]})}),t.jsx(Q,{action:k,api:S.TeacherAPI,getQuery:v,columns:H(x),rows:n.rows,count:n.count,loading:o,selected:a,pageSizeOptions:J,setOldPagination:w,searchFlag:f,setSearchFlag:b})]})};K.propTypes={rolePriority:F.number};export{K as default};
