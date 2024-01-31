import{q as h,f as S,u as B,k as q,t as w,a as _,A as E,E as H,j as e,B as K,n as j,I as x,S as y,M as A,U as L}from"./index-wJj9abeo.js";import{s as U}from"./SectionAction-bDNrVPg3.js";import{s as P}from"./StudentAction-8lZkmGVb.js";import{u as W}from"./index-ngBz0NVi.js";const V=l=>({type:h.SET_MARKSHEETS,payload:{listData:l.listData,loading:l.loading}}),N=l=>({type:h.MARKSHEET_CLASS,payload:l}),O=l=>({type:h.MARKSHEET_SECTION,payload:l});function X({onSelectClass:l,onSelectSection:f,selectedClass:o,selectedSection:c}){var g,m;const a=S(t=>t.allFormClasses),s=S(t=>t.allFormSections),v=B(),r=q(),d=w(v.palette.mode),{getStudents:C}=W(),{customSort:b,createUniqueDataArray:p,findById:u}=L(),M=t=>{const i=u(t.target.value,a==null?void 0:a.listData);l(i.class_id),r(N(i))},T=t=>{const i=u(t.target.value,s==null?void 0:s.listData);f(i.id),r(O(i))};return _.useEffect(()=>{var t,i,D;(!((t=a==null?void 0:a.listData[0])!=null&&t.class_subjects)||!((i=a==null?void 0:a.listData)!=null&&i.length)||!((D=s==null?void 0:s.listData)!=null&&D.length))&&E.SchoolAPI.getSchoolClasses(5).then(n=>{if(n.status==="Success"){n.data.sort(b);const k=p(n.data,"class_id","class_name","class_subjects");r(H(k));const F=p(n.data,"id","name");r(U(F))}}).catch(n=>{console.log("Error Fetching ClassData:",n)})},[a.listData.length,s.listData.length]),_.useEffect(()=>{o&&c&&C(o,c,P,E)},[o,c]),e.jsxs(K,{sx:{display:"flex",marginRight:"10px",marginLeft:"10px"},children:[e.jsxs(j,{variant:"filled",sx:{minWidth:120,marginRight:"10px","& .MuiInputBase-root":{height:"44px"}},children:[e.jsx(x,{id:"classfield",children:"Class"}),e.jsx(y,{variant:"filled",labelId:"classfield",label:"class",name:"class_id",autoComplete:"new-class_id",onChange:M,value:o||"",sx:{height:"12vh",backgroundColor:d.blueAccent[800]},children:((g=a==null?void 0:a.listData)==null?void 0:g.length)&&a.listData.map(t=>e.jsx(A,{value:t.class_id,children:t.class_name},t.class_name))})]}),e.jsxs(j,{variant:"filled",sx:{minWidth:120,"& .MuiInputBase-root":{height:"44px"}},children:[e.jsx(x,{id:"sectionfield",children:"Section"}),e.jsx(y,{variant:"filled",labelId:"sectionfield",label:"section",name:"section_id",autoComplete:"new-section_id",onChange:T,value:c||"",sx:{backgroundColor:d.greenAccent[600]},children:((m=s==null?void 0:s.listData)==null?void 0:m.length)&&s.listData.map(t=>e.jsx(A,{value:t.id,children:t.name},t.name))})]})]})}export{X as D,V as s};
