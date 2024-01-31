import{a as l,f as E,b as K,v as ne,R as de,y as ie,A as g,j as a,B as U,n as D,I as w,S as F,M as u,w as A,m as R,h as re,k as oe,x as ue,u as ce,t as me,d as he,l as pe,s as fe,T as ye,o as G,p as ve,U as _e}from"./index-j0XQm0-z.js";import{d as X}from"./dayjs.min-cYAhUqIg.js";import"./Validation-HZfcTO_W.js";import{c as xe,a as ge,L as je}from"./Loader-qLG1U33i.js";import{a as Se}from"./SectionAction-WxHnx6S2.js";import{s as Ce}from"./StudentAction-K8wp7BqC.js";import{u as te}from"./index-WHxx72WB.js";import{L as Z,A as ee,D as ae}from"./DatePicker-3tyZ_BEZ.js";import"./index-CJPbghPq.js";import"./Chip-tKtg7KcT.js";import"./Dialog-ofLzUiMY.js";const be=xe().shape({academic_year:ge().min(2,"Firstname is Too Short!").max(20,"Firstname is Too Long!").required("This Field is Required")}),De={academic_year:"",amount:"",due_date:null,type:"school",payment_status:"pending",payment_method:"cash",payment_date:null,late_fee:""},we=({onChange:j,refId:k,setDirty:V,reset:d,setReset:m,userId:q,updatedValues:v=null})=>{var M,C,y,b,H,N,_,Y;const[z,B]=l.useState(De),[Q,P]=l.useState(null),r=E(t=>t.allClasses),[J,$]=l.useState(null),c=E(t=>t.allSections),[L,W]=l.useState(null),S=E(t=>t.allStudents),I=K("(min-width:600px)");K("(max-width:480px)");const{getPaginatedData:f,getStudents:T}=te(),e=ne({initialValues:z,validationSchema:be,enableReinitialize:!0,onSubmit:()=>O()});de.useImperativeHandle(k,()=>({Submit:async()=>{await e.submitForm()}}));const O=()=>{j&&j({values:e.values,validated:e.isSubmitting?Object.keys(e.errors).length===0:!1})};return l.useEffect(()=>{d&&(e.resetForm(),m(!1))},[d]),l.useEffect(()=>{e.dirty&&V(!0)},[e.dirty]),l.useEffect(()=>{v&&B(v)},[v]),l.useEffect(()=>{var t,o;(o=(t=r==null?void 0:r.listData)==null?void 0:t.rows)!=null&&o.length||f(0,100,ie,g.ClassAPI)},[(M=r==null?void 0:r.listData)==null?void 0:M.rows]),l.useEffect(()=>{var t,o;(o=(t=c==null?void 0:c.listData)==null?void 0:t.rows)!=null&&o.length||f(0,100,Se,g.SectionAPI)},[(C=c==null?void 0:c.listData)==null?void 0:C.rows]),l.useEffect(()=>{T(e.values.class_id,e.values.section_id,Ce,g)},[e.values.class_id,e.values.section_id]),a.jsx(U,{m:"20px",children:a.jsx("form",{ref:k,children:a.jsxs(U,{display:"grid",gap:"30px",gridTemplateColumns:"repeat(4, minmax(0, 1fr))",sx:{"& > div":{gridColumn:I?void 0:"span 4"}},children:[a.jsxs(D,{variant:"filled",sx:{minWidth:120},error:!!e.touched.class_id&&!!e.errors.class_id,children:[a.jsx(w,{id:"classField",children:"--Select class*--"}),a.jsx(F,{autoComplete:"new-class_id",name:"class_id",variant:"filled",value:e.values.class_id,onChange:t=>{const o=t.target.value;P(o),e.setFieldValue("class_id",t.target.value)},children:((b=(y=r==null?void 0:r.listData)==null?void 0:y.rows)==null?void 0:b.length)&&r.listData.rows.map(t=>a.jsx(u,{value:t.id,name:t.name,children:t.name},t.name))}),a.jsx(A,{children:e.touched.class_id&&e.errors.class_id})]}),a.jsxs(D,{variant:"filled",sx:{minWidth:120},error:!!e.touched.section_id&&!!e.errors.section_id,children:[a.jsx(w,{id:"sectionField",children:"--Select section*--"}),a.jsx(F,{autoComplete:"new-section_id",name:"section_id",variant:"filled",value:e.values.section_id,onChange:t=>{const o=t.target.value;$(o),e.setFieldValue("section_id",t.target.value)},children:((N=(H=c==null?void 0:c.listData)==null?void 0:H.rows)==null?void 0:N.length)&&c.listData.rows.map(t=>a.jsx(u,{value:t.id,name:t.name,children:t.name},t.name))}),a.jsx(A,{children:e.touched.section_id&&e.errors.section_id})]}),a.jsxs(D,{variant:"filled",sx:{minWidth:120},error:!!e.touched.student_id&&!!e.errors.student_id,children:[a.jsx(w,{id:"studentField",children:"--Select student*--"}),a.jsx(F,{autoComplete:"new-student_id",name:"student_id",variant:"filled",value:e.values.student_id,onChange:t=>{const o=t.target.value;W(o),e.setFieldValue("student_id",t.target.value)},children:((Y=(_=S==null?void 0:S.listData)==null?void 0:_.rows)==null?void 0:Y.length)&&S.listData.rows.map(t=>a.jsx(u,{value:t.id,name:`${t.firstname} ${t.lastname}`,children:`${t.firstname} ${t.lastname}`},t.firstname))}),a.jsx(A,{children:e.touched.student_id&&e.errors.student_id})]}),a.jsx(R,{fullWidth:!0,variant:"filled",type:"text",name:"academic_year",label:"Academic Year",autoComplete:"new-academic_year",onBlur:e.handleBlur,onChange:e.handleChange,value:e.values.academic_year,error:!!e.touched.academic_year&&!!e.errors.academic_year,helperText:e.touched.academic_year&&e.errors.academic_year}),a.jsxs(D,{variant:"filled",sx:{minWidth:120},error:!!e.touched.payment_status&&!!e.errors.payment_status,children:[a.jsx(w,{id:"payment_statusField",children:"Payment_status"}),a.jsxs(F,{variant:"filled",labelId:"payment_statusField",label:"Payment_Status",name:"payment_status",autoComplete:"new-payment_status",value:e.values.payment_status,onChange:e.handleChange,children:[a.jsx(u,{value:"pending",children:"Pending"}),a.jsx(u,{value:"partial",children:"partial"}),a.jsx(u,{value:"full",children:"full"})]}),a.jsx(A,{children:e.touched.payment_status&&e.errors.payment_status})]}),a.jsx(R,{fullWidth:!0,variant:"filled",type:"number",name:"amount",label:"Amount",autoComplete:"new-amount",onBlur:e.handleBlur,onChange:e.handleChange,value:e.values.amount,error:!!e.touched.amount&&!!e.errors.amount,helperText:e.touched.amount&&e.errors.amount}),a.jsx(Z,{dateAdapter:ee,children:a.jsx(ae,{format:"DD MMMM YYYY",views:["day","month","year"],label:"Select Due_Date",name:"due_date",required:!0,value:e.values.due_date,onChange:t=>{e.setFieldValue("date",t)}})}),a.jsxs(D,{variant:"filled",sx:{minWidth:120},error:!!e.touched.type&&!!e.errors.type,children:[a.jsx(w,{id:"typeField",children:"Type"}),a.jsxs(F,{variant:"filled",labelId:"typeField",label:"Type",name:"type",autoComplete:"new-type",value:e.values.type,onChange:e.handleChange,children:[a.jsx(u,{value:"school",children:"School"}),a.jsx(u,{value:"event",children:"Event"}),a.jsx(u,{value:"cycle stand",children:"Cycle Stand"}),a.jsx(u,{value:"bus",children:"Bus"})]}),a.jsx(A,{children:e.touched.type&&e.errors.type})]}),a.jsxs(D,{variant:"filled",sx:{minWidth:120},error:!!e.touched.payment_method&&!!e.errors.payment_method,children:[a.jsx(w,{id:"payment_methodField",children:"Payment_method"}),a.jsxs(F,{variant:"filled",labelId:"payment_methodField",label:"Payment Method",name:"payment_method",autoComplete:"new-payment_method",value:e.values.payment_method,onChange:e.handleChange,children:[a.jsx(u,{value:"cash",children:"cash"}),a.jsx(u,{value:"credit card",children:"credit card"}),a.jsx(u,{value:"online transfer",children:"online transfer"})]}),a.jsx(A,{children:e.touched.payment_method&&e.errors.payment_method})]}),a.jsx(Z,{dateAdapter:ee,children:a.jsx(ae,{format:"DD MMMM YYYY",views:["day","month","year"],label:"Select Payment_date",name:"payment_date",required:!0,value:e.values.payment_date,onChange:t=>{e.setFieldValue("date",t)}})}),a.jsx(R,{fullWidth:!0,variant:"filled",type:"number",label:"Late Fees",name:"late_fee",autoComplete:"new-late_fee",onBlur:e.handleBlur,onChange:e.handleChange,value:e.values.late_fee,error:!!e.touched.late_fee&&!!e.errors.late_fee,helperText:e.touched.late_fee&&e.errors.late_fee})]})})})},We=()=>{const[j,k]=l.useState("Create"),[V,d]=l.useState(!1),[m,q]=l.useState({paymentData:{values:null,validated:!1},addressData:{values:null,validated:!1},imageData:{values:null,validated:!0}}),[v,z]=l.useState(null);l.useState([]),l.useState([]);const[B,Q]=l.useState(!1),[P,r]=l.useState(!1),[J,$]=l.useState(!1),c=E(s=>s.menuItems.selected),L=E(s=>s.toastInfo),W=l.useRef(),S=l.useRef();l.useRef();const I=re(),f=oe(),T=ue(),e=ce(),O=me(e.palette.mode),{typography:M}=he(e.palette.mode),{state:C}=pe();te();const{toastAndNavigate:y,getLocalStorage:b,getIdsFromObjects:H,findMultipleById:N}=_e();let _=(C==null?void 0:C.id)||(T==null?void 0:T.id);l.useEffect(()=>{const s=b("menu");f(fe(s.selected))},[]);const Y=l.useCallback(s=>{console.log("formdataABCD",s);const i=[{...s.paymentData.values},{...s.addressData.values}],n=["/update-payment","/update-address"];d(!0),g.CommonAPI.multipleAPICall("PATCH",n,i).then(h=>{let p=!0;h.forEach(x=>{x.data.status!=="Success"&&(p=!1)}),p&&(d(!1),y(f,!0,"info","Successfully Updated",I,`/payment/listing/${b("class")}`)),d(!1)}).catch(h=>{var p,x;throw d(!1),y(f,!0,"error",(x=(p=h==null?void 0:h.response)==null?void 0:p.data)==null?void 0:x.msg),h})},[m]),t=s=>{d(!0);const i=[`/get-by-pk/payment/${s}`,`/get-address/payment/${s}`];g.CommonAPI.multipleAPICall("GET",i).then(n=>{var p,x;n[0].data.data&&(n[0].data.data.dob=X(n[0].data.data.dob),n[0].data.data.admission_date=X(n[0].data.data.admission_date));const h={paymentData:n[0].data.data,addressData:(x=(p=n[1])==null?void 0:p.data)==null?void 0:x.data};z(h),d(!1)}).catch(n=>{var h,p;throw d(!1),y(f,!0,"error",(p=(h=n==null?void 0:n.response)==null?void 0:h.data)==null?void 0:p.msg),n})},o=()=>{d(!0),g.PaymentAPI.createPayment({...m.paymentData.values}).then(({data:s})=>{(s==null?void 0:s.status)==="Success"&&g.AddressAPI.createAddress({...m.addressData.values,parent_id:s.data.id,parent:"payment"}).then(i=>{d(!1),y(f,!0,"success","Successfully Created",I,"/payment/listing")}).catch(i=>{throw d(!1),y(f,!0,i||"An Error Occurred"),i})}).catch(s=>{var i,n;throw d(!1),y(f,!0,"error",(n=(i=s==null?void 0:s.response)==null?void 0:i.data)==null?void 0:n.msg),s})};l.useEffect(()=>{var s;_&&!P&&(k("Update"),t(_)),m.paymentData.validated&&m.addressData.validated?(s=m.paymentData.values)!=null&&s.id?Y(m):o():r(!1)},[_,P]);const se=async()=>{await W.current.Submit(),await S.current.Submit(),r(!0)},le=(s,i)=>{i==="payment"?q({...m,paymentData:s}):i==="address"&&q({...m,addressData:s})};return a.jsxs(U,{m:"10px",children:[a.jsx(ye,{fontFamily:M.fontFamily,fontSize:M.h2.fontSize,color:O.grey[100],fontWeight:"bold",display:"inline-block",marginLeft:"20px",children:`${j} ${c}`}),a.jsx(we,{onChange:s=>{le(s,"payment")},refId:W,setDirty:Q,reset:J,setReset:$,userId:_,updatedValues:v==null?void 0:v.paymentData}),a.jsxs(U,{display:"flex",justifyContent:"end",m:"20px",children:[j==="Update"?null:a.jsx(G,{type:"reset",color:"warning",variant:"contained",sx:{mr:3},disabled:!B||P,onClick:()=>{window.confirm("Do You Really Want To Reset?")&&$(!0)},children:"Reset"}),a.jsx(G,{color:"error",variant:"contained",sx:{mr:3},onClick:()=>I(`/payment/listing/${b("class")||""}`),children:"Cancel"}),a.jsx(G,{type:"submit",onClick:()=>se(),disabled:!B,color:j==="Update"?"info":"success",variant:"contained",children:"Submit"}),a.jsx(ve,{alerting:L.toastAlert,severity:L.toastSeverity,message:L.toastMessage})]}),V===!0?a.jsx(je,{}):null]})};export{We as default};
