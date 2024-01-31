import{a as s,b as U,v as Y,R as J,j as a,B as _,m as b,n as K,I as X,S as Z,M as W,w as ee,h as te,k as ae,x as se,u as ne,t as re,d as oe,f as M,l as le,s as ie,A as j,T as ue,o as B,p as de,U as ce}from"./index-j0XQm0-z.js";import{A as he}from"./AddressFormComponent-Xw_mtYzY.js";import{c as me,a as v,L as fe}from"./Loader-qLG1U33i.js";import"./Validation-HZfcTO_W.js";const pe=/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,ve=me().shape({registration_no:v().required("This Field is Required"),driver:v().required("This Field is Required"),contact_no:v().matches(pe,"Phone Number Is Not Valid").required("This Field is Required"),license_no:v().required("This Field is Required"),route:v(),status:v()}),xe={registration_no:"",driver:"",contact_no:"",license_no:"",route:"",status:"inactive"},ge=({onChange:m,refId:C,setDirty:F,reset:n,setReset:l,updatedValues:f=null})=>{const[d,D]=s.useState(xe),S=U("(min-width:600px)");U("(max-width:480px)");const e=Y({initialValues:d,validationSchema:ve,enableReinitialize:!0,onSubmit:()=>x()});J.useImperativeHandle(C,()=>({Submit:async()=>{await e.submitForm()}}));const x=()=>{m&&m({values:e.values,validated:e.isSubmitting?Object.keys(e.errors).length===0:!1})};return s.useEffect(()=>{n&&(e.resetForm(),l(!1))},[n]),s.useEffect(()=>{e.dirty&&F(!0)},[e.dirty]),s.useEffect(()=>{f&&D(f)},[f]),a.jsx(_,{m:"20px",children:a.jsx("form",{ref:C,children:a.jsxs(_,{display:"grid",gap:"30px",gridTemplateColumns:"repeat(4, minmax(0, 1fr))",sx:{"& > div":{gridColumn:S?void 0:"span 4"}},children:[a.jsx(b,{fullWidth:!0,variant:"filled",type:"text",name:"driver",label:"Driver Name*",autoComplete:"new-driver-name",onBlur:e.handleBlur,onChange:e.handleChange,value:e.values.driver,error:!!e.touched.driver&&!!e.errors.driver,helperText:e.touched.driver&&e.errors.driver,sx:{gridColumn:"span 2"}}),a.jsx(b,{fullWidth:!0,variant:"filled",type:"text",name:"registration_no",label:"Registration Number*",onBlur:e.handleBlur,onChange:e.handleChange,value:e.values.registration_no,error:!!e.touched.registration_no&&!!e.errors.registration_no,helperText:e.touched.registration_no&&e.errors.registration_no,sx:{gridColumn:"span 2"}}),a.jsx(b,{fullWidth:!0,variant:"filled",type:"text",label:"Contact Number*",name:"contact_no",autoComplete:"new-contact",onBlur:e.handleBlur,onChange:e.handleChange,value:e.values.contact_no,error:!!e.touched.contact_no&&!!e.errors.contact_no,helperText:e.touched.contact_no&&e.errors.contact_no}),a.jsx(b,{fullWidth:!0,variant:"filled",type:"text",label:"License Number*",name:"license_no",onBlur:e.handleBlur,onChange:e.handleChange,value:e.values.license_no,error:!!e.touched.license_no&&!!e.errors.license_no,helperText:e.touched.license_no&&e.errors.license_no}),a.jsx(b,{fullWidth:!0,variant:"filled",type:"text",label:"Route*",name:"route",onBlur:e.handleBlur,onChange:e.handleChange,value:e.values.route,error:!!e.touched.route&&!!e.errors.route,helperText:e.touched.route&&e.errors.route}),a.jsxs(K,{variant:"filled",sx:{minWidth:120},error:!!e.touched.status&&!!e.errors.status,children:[a.jsx(X,{id:"statusField",children:"Status"}),a.jsxs(Z,{variant:"filled",labelId:"statusField",label:"Status",name:"status",autoComplete:"new-status",value:e.values.status,onChange:e.handleChange,children:[a.jsx(W,{value:"active",children:"Active"}),a.jsx(W,{value:"inactive",children:"Inactive"})]}),a.jsx(ee,{children:e.touched.status&&e.errors.status})]})]})})})},_e=()=>{const[m,C]=s.useState("Create"),[F,n]=s.useState(!1),[l,f]=s.useState({busData:{values:null,validated:!1},addressData:{values:null,validated:!1}}),[d,D]=s.useState(null),[S,e]=s.useState(!1),[x,k]=s.useState(!1),[E,I]=s.useState(!1),L=s.useRef(),$=s.useRef(),T=te(),c=ae(),w=se(),N=ne(),z=re(N.palette.mode),{typography:P}=oe(N.palette.mode),y=M(t=>t.menuItems.selected),A=M(t=>t.toastInfo),{state:R}=le(),{createSchoolCode:be,getLocalStorage:H,toastAndNavigate:p}=ce();let g=(R==null?void 0:R.id)||(w==null?void 0:w.id);s.useEffect(()=>{const t=H("menu");c(ie(t.selected))},[]);const O=s.useCallback(t=>{n(!0);const r=["/update-bus","/update-address"],o=[{...t.busData.values},{...t.addressData.values}];j.CommonAPI.multipleAPICall("PATCH",r,o).then(i=>{let u=!0;i.forEach(h=>{h.data.status!=="Success"&&(u=!1)}),u&&(n(!1),p(c,!0,"info","Successfully Updated",T,`/${y.toLowerCase()}/listing`)),n(!1)}).catch(i=>{var u,h;throw n(!1),p(c,!0,"error",(h=(u=i==null?void 0:i.response)==null?void 0:u.data)==null?void 0:h.msg),i})},[l]),G=t=>{n(!0);const r=[`/get-by-pk/bus/${t}`,`/get-address/bus/${t}`];j.CommonAPI.multipleAPICall("GET",r).then(o=>{var u,h;const i={busData:o[0].data.data,addressData:(h=(u=o[1])==null?void 0:u.data)==null?void 0:h.data};D(i),n(!1)}).catch(o=>{var i,u;throw n(!1),p(c,!0,"error",(u=(i=o==null?void 0:o.response)==null?void 0:i.data)==null?void 0:u.msg),o})},Q=()=>{n(!0),j.BusAPI.createBus({...l.busData.values}).then(({data:t})=>{(t==null?void 0:t.status)==="Success"&&j.AddressAPI.createAddress({...l.addressData.values,parent_id:t.data.id,parent:"bus"}).then(r=>{n(!1),p(c,!0,"success","Successfully Created",T,`/${y.toLowerCase()}/listing`)}).catch(r=>{throw n(!1),p(c,!0,r||"An Error Occurred"),r})}).catch(t=>{var r,o;throw n(!1),p(c,!0,"error",(o=(r=t==null?void 0:t.response)==null?void 0:r.data)==null?void 0:o.msg),t})};s.useEffect(()=>{var t;g&&!x&&(C("Update"),G(g)),l.busData.validated&&l.addressData.validated?(t=l.busData.values)!=null&&t.id?O(l):Q():k(!1)},[g,x]);const V=async()=>{await L.current.Submit(),await $.current.Submit(),k(!0)},q=(t,r)=>{f(r==="bus"?{...l,busData:t}:{...l,addressData:t})};return a.jsxs(_,{m:"10px",children:[a.jsx(ue,{fontFamily:P.fontFamily,fontSize:P.h2.fontSize,color:z.grey[100],fontWeight:"bold",display:"inline-block",marginLeft:"20px",children:`${m} ${y}`}),a.jsx(ge,{onChange:t=>{q(t,"bus")},refId:L,setDirty:e,reset:E,setReset:I,userId:g,updatedValues:d==null?void 0:d.busData}),a.jsx(he,{onChange:t=>{q(t,"address")},refId:$,update:!!g,setDirty:e,reset:E,setReset:I,updatedValues:d==null?void 0:d.addressData}),a.jsxs(_,{display:"flex",justifyContent:"end",m:"20px",children:[m==="Update"?null:a.jsx(B,{type:"reset",color:"warning",variant:"contained",sx:{mr:3},disabled:!S||x,onClick:()=>{window.confirm("Do You Really Want To Reset?")&&I(!0)},children:"Reset"}),a.jsx(B,{color:"error",variant:"contained",sx:{mr:3},onClick:()=>T(`/${y.toLowerCase()}/listing`),children:"Cancel"}),a.jsx(B,{type:"submit",onClick:()=>V(),disabled:!S,color:m==="Update"?"info":"success",variant:"contained",children:"Submit"}),a.jsx(de,{alerting:A.toastAlert,severity:A.toastSeverity,message:A.toastMessage})]}),F===!0?a.jsx(fe,{}):null]})};export{_e as default};
