import{r as le,i as oe,j as s,a as n,f as y,b as Z,v as ne,R as ie,A as T,B as k,z as ue,C as ce,m as _,n as V,I as ee,S as te,M as U,w as ae,U as se,h as me,k as de,x as he,u as _e,t as fe,d as ge,l as ve,s as pe,T as ke,o as H,p as $e}from"./index-j0XQm0-z.js";import{c as be,L as je}from"./Loader-qLG1U33i.js";import{a as ye}from"./SubjectAction-53mu3OIK.js";import{s as Se}from"./StudentAction-K8wp7BqC.js";import{u as xe}from"./index-WHxx72WB.js";var Q={},Ce=oe;Object.defineProperty(Q,"__esModule",{value:!0});var re=Q.default=void 0,we=Ce(le()),De=s;re=Q.default=(0,we.default)((0,De.jsx)("path",{d:"M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"}),"Check");const Te=be().shape({}),D={class:"",section:"",student:"",subjects:[],term:"",marks_obtained:"",total_marks:"",grade:"",remark:"",result:""},Ie=({onChange:$,refId:I,setDirty:O,reset:m,setReset:u,userId:Y,updatedValues:o=null,student_id:N=null})=>{var j,E,A,z,P,R,l;const[F,J]=n.useState(D),[f,B]=n.useState([]),[q,M]=n.useState(!1),c=y(a=>a.allSubjects),{marksheetClass:i,marksheetSection:d}=y(a=>a.allMarksheets),p=y(a=>a.allStudents),L=Z("(min-width:600px)");Z("(max-width:480px)");const{getPaginatedData:S,getStudents:g}=xe(),{findById:x}=se(),[W,K]=n.useState({vertical:"top",horizontal:"center"}),{vertical:C,horizontal:v}=W,e=ne({initialValues:F,validationSchema:Te,enableReinitialize:!0,onSubmit:()=>b()}),G=()=>{M(!1)};ie.useImperativeHandle(I,()=>({Submit:async()=>{await e.submitForm()}}));const b=()=>{$&&$({values:e.values,validated:e.isSubmitting?Object.keys(e.errors).length===0:!1})};return n.useEffect(()=>{m&&(e.resetForm(),u(!1))},[m]),n.useEffect(()=>{e.dirty&&O(!0)},[e.dirty]),n.useEffect(()=>{o&&o.rows.map((a,t)=>{e.setFieldValue(`marks_obtained_${t}`,a.marks_obtained),e.setFieldValue(`total_marks_${t}`,a.total_marks),e.setFieldValue(`grade_${t}`,a.grade),e.setFieldValue(`remark_${t}`,a.remark)})},[o]),console.log("updatedValues1=>",o),n.useEffect(()=>{var a,t;(t=(a=c==null?void 0:c.listData)==null?void 0:a.rows)!=null&&t.length||S(0,50,ye,T.SubjectAPI)},[(E=(j=c==null?void 0:c.listData)==null?void 0:j.rows)==null?void 0:E.length]),console.log("class and students=",i,d),n.useEffect(()=>{var t,r;let a=[];(t=i==null?void 0:i.class_subjects)==null||t.split(",").map(h=>{var w,X;a.push({subject_id:h,subject_name:(X=x(parseInt(h),(w=c==null?void 0:c.listData)==null?void 0:w.rows))==null?void 0:X.name})}),a.length&&(B(a),D.class=i==null?void 0:i.class_name,D.section=d==null?void 0:d.name,D.subjects=(r=i==null?void 0:i.class_subjects)==null?void 0:r.split(","),D.student=e.values.student,g(i==null?void 0:i.class_id,d==null?void 0:d.id,Se,T))},[(A=c==null?void 0:c.listData)==null?void 0:A.rows,i,d]),(z=o==null?void 0:o.rows[0])!=null&&z.term&&(console.log("add term"),e.values.term=(P=o==null?void 0:o.rows[0])==null?void 0:P.term),console.log("dfdsfds",e.values),s.jsxs(k,{m:"20px",children:[s.jsx(ue,{anchorOrigin:{vertical:C,horizontal:v},open:q,autoHideDuration:6e3,onClose:G,children:s.jsx(ce,{sx:{width:"100%"},icon:s.jsx(re,{fontSize:"inherit"}),severity:"error",children:"No Student Data"})},C+v),s.jsxs("form",{ref:I,children:[s.jsxs(k,{display:"grid",gap:"10px",gridTemplateColumns:"repeat(4, minmax(0, 1fr))",sx:{"& > div":{gridColumn:L?void 0:"span 4"},marginBottom:"10px"},children:[s.jsx(_,{fullWidth:!0,variant:"filled",type:"text",label:"Class",value:e.values.class}),s.jsx(_,{fullWidth:!0,variant:"filled",type:"text",label:"Section",value:e.values.section}),s.jsxs(V,{variant:"filled",sx:{minWidth:120},error:!!e.touched.student&&!!e.errors.student,children:[s.jsx(ee,{id:"studentField",children:"Student"}),s.jsx(te,{labelId:"studentField",name:"student",value:e.values.student||N,onChange:a=>{e.setFieldValue("student",a.target.value)},children:((l=(R=p==null?void 0:p.listData)==null?void 0:R.rows)==null?void 0:l.length)&&p.listData.rows.map(a=>s.jsx(U,{value:a.id,name:`${a.firstname} ${a.lastname}`,children:`${a.firstname} ${a.lastname}`},a.id))}),s.jsx(ae,{children:e.touched.student&&e.errors.student})]}),s.jsxs(V,{variant:"filled",sx:{minWidth:120},error:!!e.touched.term&&!!e.errors.term,children:[s.jsx(ee,{id:"termField",children:"Term"}),s.jsxs(te,{variant:"filled",labelId:"termField",name:"term",value:e.values.term,onChange:e.handleChange,children:[s.jsx(U,{value:"I",children:"I"}),s.jsx(U,{value:"II",children:"II"}),s.jsx(U,{value:"III",children:"III"})]}),s.jsx(ae,{children:e.touched.term&&e.errors.term})]})]}),s.jsxs(k,{style:{display:"grid",gap:"10px",width:"171vh",gridTemplateColumns:"repeat(1, minmax(0, 1fr))"},children:[!o&&(f==null?void 0:f.length)&&f.map((a,t)=>s.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(5, minmax(0, 1fr))",gap:"10px"},children:[s.jsx(k,{style:{width:"28vh",marginTop:"20px"},children:a.subject_name}),s.jsx(_,{fullWidth:!0,variant:"outlined",type:"text",name:`marks_obtained_${t}`,label:"Marks obtained*",onBlur:e.handleBlur,onChange:e.handleChange,value:e.values[`marks_obtained_${t}`],error:!!e.touched[`marks_obtained_${t}`]&&!!e.errors[`marks_obtained_${t}`],helperText:e.touched[`marks_obtained_${t}`]&&e.errors[`marks_obtained_${t}`],sx:{width:"26vh"}}),s.jsx(_,{fullWidth:!0,variant:"outlined",type:"text",name:`total_marks_${t}`,label:"Total marks *",onBlur:e.handleBlur,onChange:e.handleChange,value:e.values[`total_marks_${t}`],error:!!e.touched[`total_marks_${t}`]&&!!e.errors[`total_marks_${t}`],helperText:e.touched[`total_marks_${t}`]&&e.errors[`total_marks_${t}`],sx:{width:"26vh",marginLeft:"-41px"}}),s.jsx(_,{fullWidth:!0,variant:"outlined",type:"text",name:`grade_${t}`,label:"Grade*",onBlur:e.handleBlur,onChange:e.handleChange,value:e.values[`grade_${t}`],error:!!e.touched[`grade_${t}`]&&!!e.errors[`grade_${t}`],helperText:e.touched[`grade_${t}`]&&e.errors[`grade_${t}`],sx:{width:"15vh",marginLeft:"-14vh"}}),s.jsx(_,{fullWidth:!0,variant:"outlined",type:"text",name:`remark_${t}`,label:"Remark",onBlur:e.handleBlur,onChange:e.handleChange,value:e.values[`remark_${t}`],error:!!e.touched[`remark_${t}`]&&!!e.errors[`remark_${t}`],helperText:e.touched[`remark_${t}`]&&e.errors[`remark_${t}`],sx:{width:"65vh",marginLeft:"-32vh"}})]},t)),o&&(o==null?void 0:o.rows.map((a,t)=>s.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(5, minmax(0, 1fr))",gap:"10px"},children:[s.jsx(k,{style:{width:"28vh",marginTop:"20px"},children:f.filter(r=>r.subject_id===a.subject_id)[0].subject_name}),s.jsx(_,{fullWidth:!0,variant:"outlined",type:"text",name:`marks_obtained_${t}`,label:"Marks obtained*",onBlur:e.handleBlur,onChange:e.handleChange,value:e.values[`marks_obtained_${t}`],error:!!e.touched[`marks_obtained_${t}`]&&!!e.errors[`marks_obtained_${t}`],helperText:e.touched[`marks_obtained_${t}`]&&e.errors[`marks_obtained_${t}`],sx:{width:"26vh"}}),s.jsx(_,{fullWidth:!0,variant:"outlined",type:"text",name:`total_marks_${t}`,label:"Total marks *",onBlur:e.handleBlur,onChange:e.handleChange,value:e.values[`total_marks_${t}`],error:!!e.touched[`total_marks_${t}`]&&!!e.errors[`total_marks_${t}`],helperText:e.touched[`total_marks_${t}`]&&e.errors[`total_marks_${t}`],sx:{width:"26vh",marginLeft:"-41px"}}),s.jsx(_,{fullWidth:!0,variant:"outlined",type:"text",name:`grade_${t}`,label:"Grade*",onBlur:e.handleBlur,onChange:e.handleChange,value:e.values[`grade_${t}`],error:!!e.touched[`grade_${t}`]&&!!e.errors[`grade_${t}`],helperText:e.touched[`grade_${t}`]&&e.errors[`grade_${t}`],sx:{width:"15vh",marginLeft:"-14vh"}}),s.jsx(_,{fullWidth:!0,variant:"outlined",type:"text",name:`remark_${t}`,label:"Remark",onBlur:e.handleBlur,onChange:e.handleChange,value:e.values[`remark_${t}`],error:!!e.touched[`remark_${t}`]&&!!e.errors[`remark_${t}`],helperText:e.touched[`remark_${t}`]&&e.errors[`remark_${t}`],sx:{width:"65vh",marginLeft:"-32vh"}})]},t)))]})]})]})},Ee=()=>{const[$,I]=n.useState("Create"),[O,m]=n.useState(!1),[u,Y]=n.useState({marksheetData:{values:null,validated:!1}}),[o,N]=n.useState(null),[F,J]=n.useState(!1),[f,B]=n.useState(!1),[q,M]=n.useState(!1),{marksheetClass:c,marksheetSection:i}=y(l=>l.allMarksheets),d=y(l=>l.menuItems.selected),p=y(l=>l.toastInfo),L=n.useRef(),S=me(),g=de(),x=he(),W=_e(),K=fe(W.palette.mode),{typography:C}=ge(W.palette.mode),{state:v}=ve(),{toastAndNavigate:e,getLocalStorage:G}=se();let b=(v==null?void 0:v.id)||(x==null?void 0:x.id),j=v==null?void 0:v.student_id;n.useEffect(()=>{const l=G("menu");g(pe(l.selected))},[]);const E=n.useCallback(l=>{m(!0),T.MarksheetAPI.updateMarksheet({...l.marksheetData.values}).then(({data:a})=>{(a==null?void 0:a.status)==="Success"&&(m(!1),e(g,!0,"info","Successfully Updated",S,`/${d.toLowerCase()}/listing`))}).catch(a=>{var t,r;throw m(!1),e(g,!0,"error",(r=(t=a==null?void 0:a.response)==null?void 0:t.data)==null?void 0:r.msg),a})},[]),A=(l,a)=>{m(!0);const t=[`/get-marksheet/?page=0&size=15&student=${a}`];T.CommonAPI.multipleAPICall("GET",t).then(r=>{console.log("response>>>>",r);const h={marksheetData:r[0].data.data};N(h),m(!1)}).catch(r=>{var h,w;throw m(!1),e(g,!0,"error",(w=(h=r==null?void 0:r.response)==null?void 0:h.data)==null?void 0:w.msg),r})},z=()=>{let l=[];m(!0),console.log("submitted data",u);let a={student_id:u.marksheetData.values.student,class_id:c==null?void 0:c.class_id,section_id:i==null?void 0:i.id,term:u.marksheetData.values.term};return console.log("payload",a),l=u.marksheetData.values.subjects.map((t,r)=>{a={...a,subject_id:t,marks_obtained:u.marksheetData.values[`marks_obtained_${r}`],total_marks:u.marksheetData.values[`total_marks_${r}`],grade:u.marksheetData.values[`grade_${r}`],remark:u.marksheetData.values[`remark_${r}`]?u.marksheetData.values[`remark_${r}`]:"",result:u.marksheetData.values.result},console.log("loop",t,a),T.MarksheetAPI.createMarksheet(a)}),Promise.all(l).then(t=>{t.every(h=>h.data.status==="Success")?(m(!1),e(g,!0,"success","Successfully Created",S,`/${d.toLowerCase()}/listing`)):(m(!1),e(g,!0,"error","Failed to create marksheet for one or more subjects"))}).catch(t=>{var r,h;throw m(!1),e(g,!0,"error",(h=(r=t==null?void 0:t.response)==null?void 0:r.data)==null?void 0:h.msg),t})};n.useEffect(()=>{var l;b&&!f&&(I("Update"),A(b,j)),u.marksheetData.validated?(l=u.marksheetData.values)!=null&&l.id?E(u):z():B(!1)},[b,f,j]);const P=async()=>{await L.current.Submit(),B(!0)},R=(l,a)=>{a==="marksheet"&&Y({...u,marksheetData:l})};return console.log("updatedValues",o),s.jsxs(k,{m:"10px",children:[s.jsx(ke,{fontFamily:C.fontFamily,fontSize:C.h2.fontSize,color:K.grey[100],fontWeight:"bold",display:"inline-block",marginLeft:"20px",children:`${$} ${d}`}),s.jsx(Ie,{onChange:l=>{R(l,"marksheet")},refId:L,setDirty:J,reset:q,setReset:M,userId:b,student_id:j,updatedValues:o==null?void 0:o.marksheetData}),s.jsxs(k,{display:"flex",justifyContent:"end",m:"20px 20px 70px 0",children:[$==="Update"?null:s.jsx(H,{type:"reset",color:"warning",variant:"contained",sx:{mr:3},disabled:!F||f,onClick:()=>{window.confirm("Do You Really Want To Reset?")&&M(!0)},children:"Reset"}),s.jsx(H,{color:"error",variant:"contained",sx:{mr:3},onClick:()=>S(`/${d.toLowerCase()}/listing`),children:"Cancel"}),s.jsx(H,{type:"submit",onClick:()=>P(),disabled:!F,color:$==="Update"?"info":"success",variant:"contained",children:"Submit"}),s.jsx($e,{alerting:p.toastAlert,severity:p.toastSeverity,message:p.toastMessage})]}),O===!0?s.jsx(je,{}):null]})};export{Ee as default};
