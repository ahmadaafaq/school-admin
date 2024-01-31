import{a as s,b as q,v as J,R as K,j as a,B as j,m as N,n as X,I as Z,S as ee,M as L,w as te,f as U,h as ae,k as se,x as oe,u as le,t as ie,d as de,l as ne,s as re,A as b,T as ue,o as M,p as ce,U as me}from"./index-j0XQm0-z.js";import{d as O}from"./dayjs.min-cYAhUqIg.js";import{A as he}from"./AddressFormComponent-Xw_mtYzY.js";import{c as fe,a as p,L as pe}from"./Loader-qLG1U33i.js";import{L as ye,A as xe,D as ge}from"./DatePicker-3tyZ_BEZ.js";import{u as ve}from"./index-WHxx72WB.js";import"./Validation-HZfcTO_W.js";import"./index-CJPbghPq.js";import"./Chip-tKtg7KcT.js";import"./Dialog-ofLzUiMY.js";const Se=/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,Ce=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,be=fe().shape({firstname:p().min(2,"Firstname is Too Short!").max(20,"Firstname is Too Long!").required("This Field is Required"),lastname:p().min(2,"Lastname is Too Short!").max(20,"Lastname is Too Long!").required("This Field is Required"),email:p().matches(Ce,"Email Address is Not Valid"),contact_no:p().matches(Se,"Phone Number Is Not Valid").required("This Field is Required"),gender:p(),status:p()}),je={name:"",date:null,type:"school_closure",notes:""},De=({onChange:h,refId:x,setDirty:D,reset:l,setReset:d,userId:F,updatedValues:u=null})=>{const[T,g]=s.useState(je),v=q("(min-width:600px)");q("(max-width:480px)");const e=J({initialValues:T,validationSchema:be,enableReinitialize:!0,onSubmit:()=>S()});K.useImperativeHandle(x,()=>({Submit:async()=>{await e.submitForm()}}));const S=()=>{h&&h({values:e.values,validated:e.isSubmitting?Object.keys(e.errors).length===0:!1})};return s.useEffect(()=>{l&&(e.resetForm(),d(!1))},[l]),s.useEffect(()=>{e.dirty&&D(!0)},[e.dirty]),s.useEffect(()=>{u&&g(u)},[u]),a.jsx(j,{m:"20px",children:a.jsx("form",{ref:x,children:a.jsxs(j,{display:"grid",gap:"30px",gridTemplateColumns:"repeat(4, minmax(0, 1fr))",sx:{"& > div":{gridColumn:v?void 0:"span 4"}},children:[a.jsx(N,{fullWidth:!0,variant:"filled",type:"text",name:"title",label:"Title*",autoComplete:"new-title",onBlur:e.handleBlur,onChange:e.handleChange,value:e.values.title,error:!!e.touched.title&&!!e.errors.title,helperText:e.touched.title&&e.errors.title}),a.jsx(ye,{dateAdapter:xe,children:a.jsx(ge,{format:"DD MMMM YYYY",views:["day","month","year"],label:"Select Date",name:"date",required:!0,value:e.values.date,onChange:C=>{e.setFieldValue("date",C)}})}),a.jsxs(X,{variant:"filled",sx:{minWidth:120},error:!!e.touched.type&&!!e.errors.type,children:[a.jsx(Z,{id:"typeField",children:"Type"}),a.jsxs(ee,{variant:"filled",labelId:"typeField",label:"Type",name:"type",autoComplete:"new-type",value:e.values.type,onChange:e.handleChange,children:[a.jsx(L,{value:"school_closure",children:"School Closure"}),a.jsx(L,{value:"partial_closure",children:"Partial Closure"}),a.jsx(L,{value:"staff_only",children:"Staff Only"})]}),a.jsx(te,{children:e.touched.type&&e.errors.type})]}),a.jsx(N,{fullWidth:!0,variant:"filled",type:"text",label:"Note",name:"notes",autoComplete:"new-notes",onBlur:e.handleBlur,onChange:e.handleChange,value:e.values.notes,error:!!e.touched.notes&&!!e.errors.notes,helperText:e.touched.notes&&e.errors.notes})]})})})},Be=()=>{const[h,x]=s.useState("Create"),[D,l]=s.useState(!1),[d,F]=s.useState({holidayData:{values:null,validated:!1},addressData:{values:null,validated:!1},imageData:{values:null,validated:!0}}),[u,T]=s.useState(null);s.useState([]),s.useState([]);const[g,v]=s.useState(!1),[e,S]=s.useState(!1),[C,w]=s.useState(!1),W=U(t=>t.menuItems.selected),A=U(t=>t.toastInfo),P=s.useRef(),$=s.useRef();s.useRef();const I=ae(),c=se(),R=oe(),B=le(),Y=ie(B.palette.mode),{typography:H}=de(B.palette.mode),{state:k}=ne();ve();const{toastAndNavigate:f,getLocalStorage:E,getIdsFromObjects:Fe,findMultipleById:Te}=me();let y=(k==null?void 0:k.id)||(R==null?void 0:R.id);s.useEffect(()=>{const t=E("menu");c(re(t.selected))},[]);const z=s.useCallback(t=>{console.log("formdataABCD",t);const i=[{...t.holidayData.values},{...t.addressData.values}],o=["/update-holiday","/update-address"];l(!0),b.CommonAPI.multipleAPICall("PATCH",o,i).then(n=>{let r=!0;n.forEach(m=>{m.data.status!=="Success"&&(r=!1)}),r&&(l(!1),f(c,!0,"info","Successfully Updated",I,`/holiday/listing/${E("class")}`)),l(!1)}).catch(n=>{var r,m;throw l(!1),f(c,!0,"error",(m=(r=n==null?void 0:n.response)==null?void 0:r.data)==null?void 0:m.msg),n})},[d]),V=t=>{l(!0);const i=[`/get-by-pk/holiday/${t}`,`/get-address/holiday/${t}`];b.CommonAPI.multipleAPICall("GET",i).then(o=>{var r,m;o[0].data.data&&(o[0].data.data.dob=O(o[0].data.data.dob),o[0].data.data.admission_date=O(o[0].data.data.admission_date));const n={holidayData:o[0].data.data,addressData:(m=(r=o[1])==null?void 0:r.data)==null?void 0:m.data};T(n),l(!1)}).catch(o=>{var n,r;throw l(!1),f(c,!0,"error",(r=(n=o==null?void 0:o.response)==null?void 0:n.data)==null?void 0:r.msg),o})},G=()=>{l(!0),b.HolidayAPI.createHoliday({...d.holidayData.values}).then(({data:t})=>{(t==null?void 0:t.status)==="Success"&&b.AddressAPI.createAddress({...d.addressData.values,parent_id:t.data.id,parent:"holiday"}).then(i=>{l(!1),f(c,!0,"success","Successfully Created",I,"/holiday/listing")}).catch(i=>{throw l(!1),f(c,!0,i||"An Error Occurred"),i})}).catch(t=>{var i,o;throw l(!1),f(c,!0,"error",(o=(i=t==null?void 0:t.response)==null?void 0:i.data)==null?void 0:o.msg),t})};s.useEffect(()=>{var t;y&&!e&&(x("Update"),V(y)),d.holidayData.validated&&d.addressData.validated?(t=d.holidayData.values)!=null&&t.id?z(d):G():S(!1)},[y,e]);const Q=async()=>{await P.current.Submit(),await $.current.Submit(),S(!0)},_=(t,i)=>{i==="holiday"?F({...d,holidayData:t}):i==="address"&&F({...d,addressData:t})};return a.jsxs(j,{m:"10px",children:[a.jsx(ue,{fontFamily:H.fontFamily,fontSize:H.h2.fontSize,color:Y.grey[100],fontWeight:"bold",display:"inline-block",marginLeft:"20px",children:`${h} ${W}`}),a.jsx(De,{onChange:t=>{_(t,"holiday")},refId:P,setDirty:v,reset:C,setReset:w,userId:y,updatedValues:u==null?void 0:u.holidayData}),a.jsx(he,{onChange:t=>{_(t,"address")},refId:$,update:!!y,setDirty:v,reset:C,setReset:w,updatedValues:u==null?void 0:u.addressData}),a.jsxs(j,{display:"flex",justifyContent:"end",m:"20px",children:[h==="Update"?null:a.jsx(M,{type:"reset",color:"warning",variant:"contained",sx:{mr:3},disabled:!g||e,onClick:()=>{window.confirm("Do You Really Want To Reset?")&&w(!0)},children:"Reset"}),a.jsx(M,{color:"error",variant:"contained",sx:{mr:3},onClick:()=>I(`/holiday/listing/${E("class")||""}`),children:"Cancel"}),a.jsx(M,{type:"submit",onClick:()=>Q(),disabled:!g,color:h==="Update"?"info":"success",variant:"contained",children:"Submit"}),a.jsx(ce,{alerting:A.toastAlert,severity:A.toastSeverity,message:A.toastMessage})]}),D===!0?a.jsx(pe,{}):null]})};export{Be as default};
