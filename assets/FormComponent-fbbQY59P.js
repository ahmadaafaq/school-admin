import{a as l,f as H,b as Q,v as X,R as ee,A as y,j as a,B as G,o as O,m as T,$ as ae,J as te,a0 as se,a1 as le,n as N,I as q,S as z,M as w,h as oe,k as ne,x as re,u as ie,t as de,d as ue,l as ce,s as he,T as me,p as pe,U as fe}from"./index-j0XQm0-z.js";import{A as ge}from"./AddressFormComponent-Xw_mtYzY.js";import{c as xe,a as j,L as ve}from"./Loader-qLG1U33i.js";import{s as we}from"./SchoolAction-AhFwU82D.js";import{u as Ce}from"./index-WHxx72WB.js";import"./Validation-HZfcTO_W.js";const be=/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,Se=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,je=xe().shape({username:j().min(2,"Username is Too Short!").max(50,"Username is Too Long!").required("This Field is Required"),password:j().min(8,"Password Must Be 8 Characters Long").matches(/[A-Z]/,"Password Must Contain At Least 1 Uppercase Letter").matches(/[a-z]/,"Password Must Contain At Least 1 Lowercase Letter").matches(/[0-9]/,"Password Must Contain At Least 1 Number").matches(/[^\w]/,"Password Must Contain At Least 1 Special Character").required("This Field is Required"),email:j().matches(Se,"Email Address is Not Valid"),contact_no:j().matches(be,"Phone Number Is Not Valid").required("This Field is Required"),gender:j(),status:j()}),ye={school_id:"",username:"",password:"",email:"",contact_no:"",designation:"",role:"",gender:"",status:"inactive"},Ae=({onChange:U,refId:C,setDirty:V,reset:R,setReset:n,userId:u,rolePriority:L,updatedValues:m=null})=>{var f,W;const[b,A]=l.useState(!1),[S,g]=l.useState({clicked:!1,password:null}),[E,_]=l.useState(ye),[B,M]=l.useState(null),[F,I]=l.useState([]),o=H(s=>s.allSchools),D=Q("(min-width:600px)"),x=Q("(max-width:480px)"),p=document.getElementById("pwField"),{getPaginatedData:$}=Ce(),e=X({initialValues:E,validationSchema:je,enableReinitialize:!0,onSubmit:()=>P()});ee.useImperativeHandle(C,()=>({Submit:async()=>{await e.submitForm()}}));const P=()=>{U&&(p.disabled&&delete e.values.password,U({values:e.values,validated:e.isSubmitting?Object.keys(e.errors).length===0:!1}))};l.useEffect(()=>{R&&(e.resetForm(),n(!1))},[R]),l.useEffect(()=>{e.dirty&&V(!0)},[e.dirty]),l.useEffect(()=>{m&&(_(m),p.setAttribute("disabled",!0),p.style.backgroundColor="#777",g({clicked:!0}))},[m]),l.useEffect(()=>{var s,i;(i=(s=o==null?void 0:o.listData)==null?void 0:s.rows)!=null&&i.length||$(0,50,we,y.SchoolAPI)},[o]),l.useEffect(()=>{(()=>{y.UserRoleAPI.getAll().then(i=>{i.status==="Success"?I(i.data.rows):console.log("An Error Occurred, Please Try Again")}).catch(i=>{throw i})})()},[]);const k=()=>{S.clicked?(p.removeAttribute("disabled"),p.style.backgroundColor="rgba(255, 255, 255, 0.09)",p.focus(),g({clicked:!1,password:e.values.password}),e.values.password=""):(p.setAttribute("disabled",!0),p.style.backgroundColor="#777",g({clicked:!0}),e.values.password=S.password)};return a.jsxs(G,{m:"20px",children:[u?a.jsxs(O,{type:"button",color:"primary",variant:"contained",sx:{position:x?"relative":"absolute",right:x?"0":30,top:x?98:110,zIndex:x?1:0},onClick:k,children:[S.clicked===!0?"Update":"Cancel Update"," Password "]}):null,a.jsx("form",{ref:C,children:a.jsxs(G,{display:"grid",gap:"30px",gridTemplateColumns:"repeat(4, minmax(0, 1fr))",sx:{"& > div":{gridColumn:D?void 0:"span 4"}},children:[a.jsx(T,{fullWidth:!0,variant:"filled",type:"text",name:"username",label:"Username*",autoComplete:"new-username",onBlur:e.handleBlur,onChange:e.handleChange,value:e.values.username,error:!!e.touched.username&&!!e.errors.username,helperText:e.touched.username&&e.errors.username,sx:{gridColumn:"span 2",marginBottom:"20px"}}),a.jsx(T,{fullWidth:!0,variant:"filled",id:"pwField",label:"Password*",name:"password",type:b?"text":"password",autoComplete:"new-password",onBlur:e.handleBlur,onChange:e.handleChange,value:e.values.password,error:!!e.touched.password&&!!e.errors.password,helperText:e.touched.password&&e.errors.password,sx:{gridColumn:"span 2"},InputProps:{endAdornment:a.jsx(ae,{position:"end",children:a.jsx(te,{"aria-label":"toggle password visibility",onClick:()=>A(!b),onMouseDown:()=>A(!b),children:b?a.jsx(se,{}):a.jsx(le,{})})})}}),a.jsx(T,{fullWidth:!0,variant:"filled",type:"text",label:"Email",name:"email",autoComplete:"new-email",onBlur:e.handleBlur,onChange:e.handleChange,value:e.values.email,error:!!e.touched.email&&!!e.errors.email,helperText:e.touched.email&&e.errors.email,sx:{gridColumn:"span 2"}}),a.jsx(T,{fullWidth:!0,variant:"filled",type:"text",label:"Contact Number*",name:"contact_no",autoComplete:"new-contact",onBlur:e.handleBlur,onChange:e.handleChange,value:e.values.contact_no,error:!!e.touched.contact_no&&!!e.errors.contact_no,helperText:e.touched.contact_no&&e.errors.contact_no}),a.jsx(T,{fullWidth:!0,variant:"filled",type:"text",label:"Designation",name:"designation",autoComplete:"new-contact",onBlur:e.handleBlur,onChange:e.handleChange,value:e.values.designation,error:!!e.touched.designation&&!!e.errors.designation,helperText:e.touched.designation&&e.errors.designation}),a.jsxs(N,{variant:"filled",sx:{minWidth:120},error:!!e.touched.gender&&!!e.errors.gender,children:[a.jsx(q,{id:"genderField",children:"Gender"}),a.jsxs(z,{variant:"filled",labelId:"genderField",label:"Gender",name:"gender",autoComplete:"new-gender",value:e.values.gender,onChange:e.handleChange,children:[a.jsx(w,{value:"male",children:"Male"}),a.jsx(w,{value:"female",children:"Female"}),a.jsx(w,{value:"other",children:"Other"})]})]}),a.jsxs(N,{variant:"filled",sx:{minWidth:120},error:!!e.touched.school_id&&!!e.errors.school_id,children:[a.jsx(q,{id:"schoolField",children:"School"}),a.jsx(z,{variant:"filled",labelId:"schoolField",label:"School",name:"school_id",autoComplete:"new-school_id",value:e.values.school_id,onChange:s=>{const i=s.target.value;M(i),e.setFieldValue("school_id",i)},children:((W=(f=o==null?void 0:o.listData)==null?void 0:f.rows)==null?void 0:W.length)&&o.listData.rows.map(s=>a.jsx(w,{value:s.id,name:s.name,children:s.name},s.name))})]}),a.jsxs(N,{variant:"filled",sx:{minWidth:120},error:!!e.touched.role&&!!e.errors.role,children:[a.jsx(q,{id:"roleField",children:"Role"}),a.jsx(z,{variant:"filled",labelId:"roleField",label:"role",name:"role",autoComplete:"new-role",value:e.values.role,onChange:e.handleChange,children:F.length&&F.filter(s=>s.id>L).map(s=>a.jsx(w,{value:s.id,name:s.name,children:s.name.charAt(0).toUpperCase()+s.name.slice(1)},s.name))})]}),a.jsxs(N,{variant:"filled",sx:{minWidth:120},error:!!e.touched.status&&!!e.errors.status,children:[a.jsx(q,{id:"statusField",children:"Status"}),a.jsxs(z,{variant:"filled",labelId:"statusField",label:"Status",name:"status",autoComplete:"new-status",value:e.values.status,onChange:e.handleChange,children:[a.jsx(w,{value:"active",children:"Active"}),a.jsx(w,{value:"inactive",children:"Inactive"})]})]})]})})]})},Ue=({rolePriority:U})=>{const[C,V]=l.useState("Create"),[R,n]=l.useState(!1),[u,L]=l.useState({userData:{values:null,validated:!1},addressData:{values:null,validated:!1}}),[m,b]=l.useState(null),[A,S]=l.useState(!1),[g,E]=l.useState(!1),[_,B]=l.useState(!1),M=l.useRef(),F=l.useRef(),I=oe(),o=ne(),D=re(),x=ie(),p=de(x.palette.mode),{typography:$}=ue(x.palette.mode),e=H(t=>t.menuItems.selected),P=H(t=>t.toastInfo),{state:k}=ce(),{toastAndNavigate:f,getLocalStorage:W}=fe();let s=(k==null?void 0:k.id)||(D==null?void 0:D.id);l.useEffect(()=>{const t=W("menu");o(he(t.selected))},[]);const i=l.useCallback(t=>{const r=[{...t.userData.values},{...t.addressData.values}],d=["/update-user","/update-address"];n(!0),t.userData.password||delete t.userData.password,y.CommonAPI.multipleAPICall("PATCH",d,r).then(c=>{let h=!0;c.forEach(v=>{v.data.status!=="Success"&&(h=!1)}),h&&(n(!1),f(o,!0,"info","Successfully Updated",I,`/${e.toLowerCase()}/listing`)),n(!1)}).catch(c=>{var h,v;throw n(!1),f(o,!0,"error",(v=(h=c==null?void 0:c.response)==null?void 0:h.data)==null?void 0:v.msg),c})},[u]),Y=t=>{n(!0);const r=[`/get-by-pk/user/${t}`,`/get-address/user/${t}`];y.CommonAPI.multipleAPICall("GET",r).then(d=>{var h,v;const c={userData:d[0].data.data,addressData:(v=(h=d[1])==null?void 0:h.data)==null?void 0:v.data};b(c),n(!1)}).catch(d=>{var c,h;throw n(!1),f(o,!0,"error",(h=(c=d==null?void 0:d.response)==null?void 0:c.data)==null?void 0:h.msg),d})},Z=()=>{n(!0),y.UserAPI.register({...u.userData.values}).then(({data:t})=>{(t==null?void 0:t.status)==="Success"&&y.AddressAPI.createAddress({...u.addressData.values,parent_id:t.data.id,parent:"user"}).then(r=>{n(!1),f(o,!0,"success","Successfully Created",I,`/${e.toLowerCase()}/listing`)}).catch(r=>{throw n(!1),f(o,!0,r||"An Error Occurred"),r})}).catch(t=>{var r,d;throw n(!1),f(o,!0,"error",(d=(r=t==null?void 0:t.response)==null?void 0:r.data)==null?void 0:d.msg),t})};l.useEffect(()=>{var t;s&&!g&&(V("Update"),Y(s)),u.userData.validated&&u.addressData.validated?(t=u.userData.values)!=null&&t.id?i(u):Z():E(!1)},[s,g]);const K=async()=>{await M.current.Submit(),await F.current.Submit(),E(!0)},J=(t,r)=>{L(r==="user"?{...u,userData:t}:{...u,addressData:t})};return a.jsxs(G,{m:"10px",children:[a.jsx(me,{fontFamily:$.fontFamily,fontSize:$.h2.fontSize,color:p.grey[100],fontWeight:"bold",display:"inline-block",marginLeft:"20px",children:`${C} ${e}`}),a.jsx(Ae,{onChange:t=>{J(t,"user")},refId:M,setDirty:S,reset:_,setReset:B,userId:s,rolePriority:U,updatedValues:m==null?void 0:m.userData}),a.jsx(ge,{onChange:t=>{J(t,"address")},refId:F,update:!!s,setDirty:S,reset:_,setReset:B,updatedValues:m==null?void 0:m.addressData}),a.jsxs(G,{display:"flex",justifyContent:"end",m:"20px",children:[C==="Update"?null:a.jsx(O,{type:"reset",color:"warning",variant:"contained",sx:{mr:3},disabled:!A||g,onClick:()=>{window.confirm("Do You Really Want To Reset?")&&B(!0)},children:"Reset"}),a.jsx(O,{color:"error",variant:"contained",sx:{mr:3},onClick:()=>I(`/${e.toLowerCase()}/listing`),children:"Cancel"}),a.jsx(O,{type:"submit",onClick:()=>K(),disabled:!A,color:C==="Update"?"info":"success",variant:"contained",children:"Submit"}),a.jsx(pe,{alerting:P.toastAlert,severity:P.toastSeverity,message:P.toastMessage})]}),R===!0?a.jsx(ve,{}):null]})};export{Ue as default};
