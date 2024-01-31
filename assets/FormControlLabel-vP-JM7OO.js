import{a as y,aE as Bt,aF as wt,_ as p,aG as It,aH as dt,aI as Dt,aJ as zt,aK as jt,aL as Et,Q as he,j as g,V as ne,aM as Vt,W as Me,N as Ne,aN as vt,am as Ht,ad as nt,ae as ot,aO as _t,K as _e,O as F,aq as re,P as Ue,aP as ft,aQ as Ie,aR as Pt,aS as Fe,J as Rt,ag as At,X as Tt,a6 as rt,aT as Ut,aU as Wt,a8 as Gt,aa as qt,aV as Ft,aW as Mt,ab as mt,aX as Kt,T as kt}from"./index-j0XQm0-z.js";import{C as Jt}from"./Chip-tKtg7KcT.js";const Qt=e=>{const o=y.useRef({});return y.useEffect(()=>{o.current=e}),o.current},Xt=Bt(),Yt=["component","direction","spacing","divider","children","className","useFlexGap"],Zt=wt(),eo=Xt("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,o)=>o.root});function to(e){return Vt({props:e,name:"MuiStack",defaultTheme:Zt})}function oo(e,o){const s=y.Children.toArray(e).filter(Boolean);return s.reduce((c,u,l)=>(c.push(u),l<s.length-1&&c.push(y.cloneElement(o,{key:`separator-${l}`})),c),[])}const no=e=>({row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"})[e],ro=({ownerState:e,theme:o})=>{let s=p({display:"flex",flexDirection:"column"},It({theme:o},dt({values:e.direction,breakpoints:o.breakpoints.values}),c=>({flexDirection:c})));if(e.spacing){const c=Dt(o),u=Object.keys(o.breakpoints.values).reduce((m,f)=>((typeof e.spacing=="object"&&e.spacing[f]!=null||typeof e.direction=="object"&&e.direction[f]!=null)&&(m[f]=!0),m),{}),l=dt({values:e.direction,base:u}),x=dt({values:e.spacing,base:u});typeof l=="object"&&Object.keys(l).forEach((m,f,P)=>{if(!l[m]){const L=f>0?l[P[f-1]]:"column";l[m]=L}}),s=zt(s,It({theme:o},x,(m,f)=>e.useFlexGap?{gap:vt(c,m)}:{"& > :not(style):not(style)":{margin:0},"& > :not(style) ~ :not(style)":{[`margin${no(f?l[f]:e.direction)}`]:vt(c,m)}}))}return s=jt(o.breakpoints,s),s};function so(e={}){const{createStyledComponent:o=eo,useThemeProps:s=to,componentName:c="MuiStack"}=e,u=()=>Me({root:["root"]},m=>Ne(c,m),{}),l=o(ro);return y.forwardRef(function(m,f){const P=s(m),$=Et(P),{component:L="div",direction:k="column",spacing:Q=0,divider:U,children:w,className:M,useFlexGap:O=!1}=$,N=he($,Yt),ce={direction:k,spacing:Q,useFlexGap:O},q=u();return g.jsx(l,p({as:L,ownerState:ce,ref:f,className:ne(q.root,M)},N,{children:U?oo(w,U):w}))})}function $t(e){return typeof e.normalize<"u"?e.normalize("NFD").replace(/[\u0300-\u036f]/g,""):e}function ao(e={}){const{ignoreAccents:o=!0,ignoreCase:s=!0,limit:c,matchFrom:u="any",stringify:l,trim:x=!1}=e;return(h,{inputValue:m,getOptionLabel:f})=>{let P=x?m.trim():m;s&&(P=P.toLowerCase()),o&&(P=$t(P));const $=P?h.filter(L=>{let k=(l||f)(L);return s&&(k=k.toLowerCase()),o&&(k=$t(k)),u==="start"?k.indexOf(P)===0:k.indexOf(P)>-1}):h;return typeof c=="number"?$.slice(0,c):$}}function gt(e,o){for(let s=0;s<e.length;s+=1)if(o(e[s]))return s;return-1}const lo=ao(),Ot=5,io=e=>{var o;return e.current!==null&&((o=e.current.parentElement)==null?void 0:o.contains(document.activeElement))};function co(e){const{unstable_isActiveElementInListbox:o=io,unstable_classNamePrefix:s="Mui",autoComplete:c=!1,autoHighlight:u=!1,autoSelect:l=!1,blurOnSelect:x=!1,clearOnBlur:h=!e.freeSolo,clearOnEscape:m=!1,componentName:f="useAutocomplete",defaultValue:P=e.multiple?[]:null,disableClearable:$=!1,disableCloseOnSelect:L=!1,disabled:k,disabledItemsFocusable:Q=!1,disableListWrap:U=!1,filterOptions:w=lo,filterSelectedOptions:M=!1,freeSolo:O=!1,getOptionDisabled:N,getOptionKey:ce,getOptionLabel:q=n=>{var t;return(t=n.label)!=null?t:n},groupBy:V,handleHomeEndKeys:D=!e.freeSolo,id:X,includeInputInList:Y=!1,inputValue:ve,isOptionEqualToValue:z=(n,t)=>n===t,multiple:I=!1,onChange:me,onClose:Pe,onHighlightChange:se,onInputChange:Z,onOpen:de,open:Be,openOnFocus:K=!1,options:fe,readOnly:be=!1,selectOnFocus:we=!e.freeSolo,value:We}=e,W=Ht(X);let j=q;j=n=>{const t=q(n);return typeof t!="string"?String(t):t};const De=y.useRef(!1),Ge=y.useRef(!0),R=y.useRef(null),G=y.useRef(null),[ke,st]=y.useState(null),[H,ze]=y.useState(-1),qe=u?0:-1,E=y.useRef(qe),[i,bt]=nt({controlled:We,default:P,name:f}),[C,pe]=nt({controlled:ve,default:"",name:f,state:"inputValue"}),[$e,Ke]=y.useState(!1),xe=y.useCallback((n,t)=>{if(!(I?i.length<t.length:t!==null)&&!h)return;let a;if(I)a="";else if(t==null)a="";else{const b=j(t);a=typeof b=="string"?b:""}C!==a&&(pe(a),Z&&Z(n,a,"reset"))},[j,C,I,Z,pe,h,i]),[ge,Je]=nt({controlled:Be,default:!1,name:f,state:"open"}),[at,Qe]=y.useState(!0),Xe=!I&&i!=null&&C===j(i),_=ge&&!be,v=_?w(fe.filter(n=>!(M&&(I?i:[i]).some(t=>t!==null&&z(n,t)))),{inputValue:Xe&&at?"":C,getOptionLabel:j}):[],ee=Qt({filteredOptions:v,value:i,inputValue:C});y.useEffect(()=>{const n=i!==ee.value;$e&&!n||O&&!n||xe(null,i)},[i,xe,$e,ee.value,O]);const je=ge&&v.length>0&&!be,Oe=ot(n=>{n===-1?R.current.focus():ke.querySelector(`[data-tag-index="${n}"]`).focus()});y.useEffect(()=>{I&&H>i.length-1&&(ze(-1),Oe(-1))},[i,I,H,Oe]);function Se(n,t){if(!G.current||n<0||n>=v.length)return-1;let r=n;for(;;){const a=G.current.querySelector(`[data-option-index="${r}"]`),b=Q?!1:!a||a.disabled||a.getAttribute("aria-disabled")==="true";if(a&&a.hasAttribute("tabindex")&&!b)return r;if(t==="next"?r=(r+1)%v.length:r=(r-1+v.length)%v.length,r===n)return-1}}const ae=ot(({event:n,index:t,reason:r="auto"})=>{if(E.current=t,t===-1?R.current.removeAttribute("aria-activedescendant"):R.current.setAttribute("aria-activedescendant",`${W}-option-${t}`),se&&se(n,t===-1?null:v[t],r),!G.current)return;const a=G.current.querySelector(`[role="option"].${s}-focused`);a&&(a.classList.remove(`${s}-focused`),a.classList.remove(`${s}-focusVisible`));let b=G.current;if(G.current.getAttribute("role")!=="listbox"&&(b=G.current.parentElement.querySelector('[role="listbox"]')),!b)return;if(t===-1){b.scrollTop=0;return}const S=G.current.querySelector(`[data-option-index="${t}"]`);if(S&&(S.classList.add(`${s}-focused`),r==="keyboard"&&S.classList.add(`${s}-focusVisible`),b.scrollHeight>b.clientHeight&&r!=="mouse"&&r!=="touch")){const A=S,ie=b.clientHeight+b.scrollTop,yt=A.offsetTop+A.offsetHeight;yt>ie?b.scrollTop=yt-b.clientHeight:A.offsetTop-A.offsetHeight*(V?1.3:0)<b.scrollTop&&(b.scrollTop=A.offsetTop-A.offsetHeight*(V?1.3:0))}}),te=ot(({event:n,diff:t,direction:r="next",reason:a="auto"})=>{if(!_)return;const S=Se((()=>{const A=v.length-1;if(t==="reset")return qe;if(t==="start")return 0;if(t==="end")return A;const ie=E.current+t;return ie<0?ie===-1&&Y?-1:U&&E.current!==-1||Math.abs(t)>1?0:A:ie>A?ie===A+1&&Y?-1:U||Math.abs(t)>1?A:0:ie})(),r);if(ae({index:S,reason:a,event:n}),c&&t!=="reset")if(S===-1)R.current.value=C;else{const A=j(v[S]);R.current.value=A,A.toLowerCase().indexOf(C.toLowerCase())===0&&C.length>0&&R.current.setSelectionRange(C.length,A.length)}}),Le=()=>{const n=(t,r)=>{const a=t?j(t):"",b=r?j(r):"";return a===b};if(E.current!==-1&&ee.filteredOptions&&ee.filteredOptions.length!==v.length&&ee.inputValue===C&&(I?i.length===ee.value.length&&ee.value.every((t,r)=>j(i[r])===j(t)):n(ee.value,i))){const t=ee.filteredOptions[E.current];if(t&&v.some(a=>j(a)===j(t)))return!0}return!1},Ee=y.useCallback(()=>{if(!_||Le())return;const n=I?i[0]:i;if(v.length===0||n==null){te({diff:"reset"});return}if(G.current){if(n!=null){const t=v[E.current];if(I&&t&&gt(i,a=>z(t,a))!==-1)return;const r=gt(v,a=>z(a,n));r===-1?te({diff:"reset"}):ae({index:r});return}if(E.current>=v.length-1){ae({index:v.length-1});return}ae({index:E.current})}},[v.length,I?!1:i,M,te,ae,_,C,I]),lt=ot(n=>{_t(G,n),n&&Ee()});y.useEffect(()=>{Ee()},[Ee]);const J=n=>{ge||(Je(!0),Qe(!0),de&&de(n))},ue=(n,t)=>{ge&&(Je(!1),Pe&&Pe(n,t))},le=(n,t,r,a)=>{if(I){if(i.length===t.length&&i.every((b,S)=>b===t[S]))return}else if(i===t)return;me&&me(n,t,r,a),bt(t)},Re=y.useRef(!1),Ce=(n,t,r="selectOption",a="options")=>{let b=r,S=t;if(I){S=Array.isArray(i)?i.slice():[];const A=gt(S,ie=>z(t,ie));A===-1?S.push(t):a!=="freeSolo"&&(S.splice(A,1),b="removeOption")}xe(n,S),le(n,S,b,{option:t}),!L&&(!n||!n.ctrlKey&&!n.metaKey)&&ue(n,b),(x===!0||x==="touch"&&Re.current||x==="mouse"&&!Re.current)&&R.current.blur()};function Ye(n,t){if(n===-1)return-1;let r=n;for(;;){if(t==="next"&&r===i.length||t==="previous"&&r===-1)return-1;const a=ke.querySelector(`[data-tag-index="${r}"]`);if(!a||!a.hasAttribute("tabindex")||a.disabled||a.getAttribute("aria-disabled")==="true")r+=t==="next"?1:-1;else return r}}const Ze=(n,t)=>{if(!I)return;C===""&&ue(n,"toggleInput");let r=H;H===-1?C===""&&t==="previous"&&(r=i.length-1):(r+=t==="next"?1:-1,r<0&&(r=0),r===i.length&&(r=-1)),r=Ye(r,t),ze(r),Oe(r)},et=n=>{De.current=!0,pe(""),Z&&Z(n,"","clear"),le(n,I?[]:null,"clear")},it=n=>t=>{if(n.onKeyDown&&n.onKeyDown(t),!t.defaultMuiPrevented&&(H!==-1&&["ArrowLeft","ArrowRight"].indexOf(t.key)===-1&&(ze(-1),Oe(-1)),t.which!==229))switch(t.key){case"Home":_&&D&&(t.preventDefault(),te({diff:"start",direction:"next",reason:"keyboard",event:t}));break;case"End":_&&D&&(t.preventDefault(),te({diff:"end",direction:"previous",reason:"keyboard",event:t}));break;case"PageUp":t.preventDefault(),te({diff:-Ot,direction:"previous",reason:"keyboard",event:t}),J(t);break;case"PageDown":t.preventDefault(),te({diff:Ot,direction:"next",reason:"keyboard",event:t}),J(t);break;case"ArrowDown":t.preventDefault(),te({diff:1,direction:"next",reason:"keyboard",event:t}),J(t);break;case"ArrowUp":t.preventDefault(),te({diff:-1,direction:"previous",reason:"keyboard",event:t}),J(t);break;case"ArrowLeft":Ze(t,"previous");break;case"ArrowRight":Ze(t,"next");break;case"Enter":if(E.current!==-1&&_){const r=v[E.current],a=N?N(r):!1;if(t.preventDefault(),a)return;Ce(t,r,"selectOption"),c&&R.current.setSelectionRange(R.current.value.length,R.current.value.length)}else O&&C!==""&&Xe===!1&&(I&&t.preventDefault(),Ce(t,C,"createOption","freeSolo"));break;case"Escape":_?(t.preventDefault(),t.stopPropagation(),ue(t,"escape")):m&&(C!==""||I&&i.length>0)&&(t.preventDefault(),t.stopPropagation(),et(t));break;case"Backspace":if(I&&!be&&C===""&&i.length>0){const r=H===-1?i.length-1:H,a=i.slice();a.splice(r,1),le(t,a,"removeOption",{option:i[r]})}break;case"Delete":if(I&&!be&&C===""&&i.length>0&&H!==-1){const r=H,a=i.slice();a.splice(r,1),le(t,a,"removeOption",{option:i[r]})}break}},xt=n=>{Ke(!0),K&&!De.current&&J(n)},Ae=n=>{if(o(G)){R.current.focus();return}Ke(!1),Ge.current=!0,De.current=!1,l&&E.current!==-1&&_?Ce(n,v[E.current],"blur"):l&&O&&C!==""?Ce(n,C,"blur","freeSolo"):h&&xe(n,i),ue(n,"blur")},B=n=>{const t=n.target.value;C!==t&&(pe(t),Qe(!1),Z&&Z(n,t,"input")),t===""?!$&&!I&&le(n,null,"clear"):J(n)},T=n=>{const t=Number(n.currentTarget.getAttribute("data-option-index"));E.current!==t&&ae({event:n,index:t,reason:"mouse"})},oe=n=>{ae({event:n,index:Number(n.currentTarget.getAttribute("data-option-index")),reason:"touch"}),Re.current=!0},Ct=n=>{const t=Number(n.currentTarget.getAttribute("data-option-index"));Ce(n,v[t],"selectOption"),Re.current=!1},ct=n=>t=>{const r=i.slice();r.splice(n,1),le(t,r,"removeOption",{option:i[n]})},pt=n=>{ge?ue(n,"toggleInput"):J(n)},ut=n=>{n.currentTarget.contains(n.target)&&n.target.getAttribute("id")!==W&&n.preventDefault()},tt=n=>{n.currentTarget.contains(n.target)&&(R.current.focus(),we&&Ge.current&&R.current.selectionEnd-R.current.selectionStart===0&&R.current.select(),Ge.current=!1)},Ve=n=>{!k&&(C===""||!ge)&&pt(n)};let ye=O&&C.length>0;ye=ye||(I?i.length>0:i!==null);let Te=v;return V&&(Te=v.reduce((n,t,r)=>{const a=V(t);return n.length>0&&n[n.length-1].group===a?n[n.length-1].options.push(t):n.push({key:r,index:r,group:a,options:[t]}),n},[])),k&&$e&&Ae(),{getRootProps:(n={})=>p({"aria-owns":je?`${W}-listbox`:null},n,{onKeyDown:it(n),onMouseDown:ut,onClick:tt}),getInputLabelProps:()=>({id:`${W}-label`,htmlFor:W}),getInputProps:()=>({id:W,value:C,onBlur:Ae,onFocus:xt,onChange:B,onMouseDown:Ve,"aria-activedescendant":_?"":null,"aria-autocomplete":c?"both":"list","aria-controls":je?`${W}-listbox`:void 0,"aria-expanded":je,autoComplete:"off",ref:R,autoCapitalize:"none",spellCheck:"false",role:"combobox",disabled:k}),getClearProps:()=>({tabIndex:-1,type:"button",onClick:et}),getPopupIndicatorProps:()=>({tabIndex:-1,type:"button",onClick:pt}),getTagProps:({index:n})=>p({key:n,"data-tag-index":n,tabIndex:-1},!be&&{onDelete:ct(n)}),getListboxProps:()=>({role:"listbox",id:`${W}-listbox`,"aria-labelledby":`${W}-label`,ref:lt,onMouseDown:n=>{n.preventDefault()}}),getOptionProps:({index:n,option:t})=>{var r;const a=(I?i:[i]).some(S=>S!=null&&z(t,S)),b=N?N(t):!1;return{key:(r=ce==null?void 0:ce(t))!=null?r:j(t),tabIndex:-1,role:"option",id:`${W}-option-${n}`,onMouseMove:T,onClick:Ct,onTouchStart:oe,"data-option-index":n,"aria-disabled":b,"aria-selected":a}},id:W,inputValue:C,value:i,dirty:ye,expanded:_&&ke,popupOpen:_,focused:$e||H!==-1,anchorEl:ke,setAnchorEl:st,focusedTag:H,groupedOptions:Te}}function po(e){return Ne("MuiListSubheader",e)}_e("MuiListSubheader",["root","colorPrimary","colorInherit","gutters","inset","sticky"]);const uo=["className","color","component","disableGutters","disableSticky","inset"],fo=e=>{const{classes:o,color:s,disableGutters:c,inset:u,disableSticky:l}=e,x={root:["root",s!=="default"&&`color${re(s)}`,!c&&"gutters",u&&"inset",!l&&"sticky"]};return Me(x,po,o)},go=F("li",{name:"MuiListSubheader",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:s}=e;return[o.root,s.color!=="default"&&o[`color${re(s.color)}`],!s.disableGutters&&o.gutters,s.inset&&o.inset,!s.disableSticky&&o.sticky]}})(({theme:e,ownerState:o})=>p({boxSizing:"border-box",lineHeight:"48px",listStyle:"none",color:(e.vars||e).palette.text.secondary,fontFamily:e.typography.fontFamily,fontWeight:e.typography.fontWeightMedium,fontSize:e.typography.pxToRem(14)},o.color==="primary"&&{color:(e.vars||e).palette.primary.main},o.color==="inherit"&&{color:"inherit"},!o.disableGutters&&{paddingLeft:16,paddingRight:16},o.inset&&{paddingLeft:72},!o.disableSticky&&{position:"sticky",top:0,zIndex:1,backgroundColor:(e.vars||e).palette.background.paper})),Nt=y.forwardRef(function(o,s){const c=Ue({props:o,name:"MuiListSubheader"}),{className:u,color:l="default",component:x="li",disableGutters:h=!1,disableSticky:m=!1,inset:f=!1}=c,P=he(c,uo),$=p({},c,{color:l,component:x,disableGutters:h,disableSticky:m,inset:f}),L=fo($);return g.jsx(go,p({as:x,className:ne(L.root,u),ref:s,ownerState:$},P))});Nt.muiSkipListHighlight=!0;const ho=Nt;function mo(e){return Ne("MuiAutocomplete",e)}const bo=_e("MuiAutocomplete",["root","expanded","fullWidth","focused","focusVisible","tag","tagSizeSmall","tagSizeMedium","hasPopupIcon","hasClearIcon","inputRoot","input","inputFocused","endAdornment","clearIndicator","popupIndicator","popupIndicatorOpen","popper","popperDisablePortal","paper","listbox","loading","noOptions","option","groupLabel","groupUl"]),d=bo;var St,Lt;const xo=["autoComplete","autoHighlight","autoSelect","blurOnSelect","ChipProps","className","clearIcon","clearOnBlur","clearOnEscape","clearText","closeText","componentsProps","defaultValue","disableClearable","disableCloseOnSelect","disabled","disabledItemsFocusable","disableListWrap","disablePortal","filterOptions","filterSelectedOptions","forcePopupIcon","freeSolo","fullWidth","getLimitTagsText","getOptionDisabled","getOptionKey","getOptionLabel","isOptionEqualToValue","groupBy","handleHomeEndKeys","id","includeInputInList","inputValue","limitTags","ListboxComponent","ListboxProps","loading","loadingText","multiple","noOptionsText","onChange","onClose","onHighlightChange","onInputChange","onOpen","open","openOnFocus","openText","options","PaperComponent","PopperComponent","popupIcon","readOnly","renderGroup","renderInput","renderOption","renderTags","selectOnFocus","size","slotProps","value"],Co=["ref"],yo=["key"],Io=e=>{const{classes:o,disablePortal:s,expanded:c,focused:u,fullWidth:l,hasClearIcon:x,hasPopupIcon:h,inputFocused:m,popupOpen:f,size:P}=e,$={root:["root",c&&"expanded",u&&"focused",l&&"fullWidth",x&&"hasClearIcon",h&&"hasPopupIcon"],inputRoot:["inputRoot"],input:["input",m&&"inputFocused"],tag:["tag",`tagSize${re(P)}`],endAdornment:["endAdornment"],clearIndicator:["clearIndicator"],popupIndicator:["popupIndicator",f&&"popupIndicatorOpen"],popper:["popper",s&&"popperDisablePortal"],paper:["paper"],listbox:["listbox"],loading:["loading"],noOptions:["noOptions"],option:["option"],groupLabel:["groupLabel"],groupUl:["groupUl"]};return Me($,mo,o)},vo=F("div",{name:"MuiAutocomplete",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:s}=e,{fullWidth:c,hasClearIcon:u,hasPopupIcon:l,inputFocused:x,size:h}=s;return[{[`& .${d.tag}`]:o.tag},{[`& .${d.tag}`]:o[`tagSize${re(h)}`]},{[`& .${d.inputRoot}`]:o.inputRoot},{[`& .${d.input}`]:o.input},{[`& .${d.input}`]:x&&o.inputFocused},o.root,c&&o.fullWidth,l&&o.hasPopupIcon,u&&o.hasClearIcon]}})(({ownerState:e})=>p({[`&.${d.focused} .${d.clearIndicator}`]:{visibility:"visible"},"@media (pointer: fine)":{[`&:hover .${d.clearIndicator}`]:{visibility:"visible"}}},e.fullWidth&&{width:"100%"},{[`& .${d.tag}`]:p({margin:3,maxWidth:"calc(100% - 6px)"},e.size==="small"&&{margin:2,maxWidth:"calc(100% - 4px)"}),[`& .${d.inputRoot}`]:{flexWrap:"wrap",[`.${d.hasPopupIcon}&, .${d.hasClearIcon}&`]:{paddingRight:30},[`.${d.hasPopupIcon}.${d.hasClearIcon}&`]:{paddingRight:56},[`& .${d.input}`]:{width:0,minWidth:30}},[`& .${ft.root}`]:{paddingBottom:1,"& .MuiInput-input":{padding:"4px 4px 4px 0px"}},[`& .${ft.root}.${Ie.sizeSmall}`]:{[`& .${ft.input}`]:{padding:"2px 4px 3px 0"}},[`& .${Pt.root}`]:{padding:9,[`.${d.hasPopupIcon}&, .${d.hasClearIcon}&`]:{paddingRight:39},[`.${d.hasPopupIcon}.${d.hasClearIcon}&`]:{paddingRight:65},[`& .${d.input}`]:{padding:"7.5px 4px 7.5px 5px"},[`& .${d.endAdornment}`]:{right:9}},[`& .${Pt.root}.${Ie.sizeSmall}`]:{paddingTop:6,paddingBottom:6,paddingLeft:6,[`& .${d.input}`]:{padding:"2.5px 4px 2.5px 8px"}},[`& .${Fe.root}`]:{paddingTop:19,paddingLeft:8,[`.${d.hasPopupIcon}&, .${d.hasClearIcon}&`]:{paddingRight:39},[`.${d.hasPopupIcon}.${d.hasClearIcon}&`]:{paddingRight:65},[`& .${Fe.input}`]:{padding:"7px 4px"},[`& .${d.endAdornment}`]:{right:9}},[`& .${Fe.root}.${Ie.sizeSmall}`]:{paddingBottom:1,[`& .${Fe.input}`]:{padding:"2.5px 4px"}},[`& .${Ie.hiddenLabel}`]:{paddingTop:8},[`& .${Fe.root}.${Ie.hiddenLabel}`]:{paddingTop:0,paddingBottom:0,[`& .${d.input}`]:{paddingTop:16,paddingBottom:17}},[`& .${Fe.root}.${Ie.hiddenLabel}.${Ie.sizeSmall}`]:{[`& .${d.input}`]:{paddingTop:8,paddingBottom:9}},[`& .${d.input}`]:p({flexGrow:1,textOverflow:"ellipsis",opacity:0},e.inputFocused&&{opacity:1})})),Po=F("div",{name:"MuiAutocomplete",slot:"EndAdornment",overridesResolver:(e,o)=>o.endAdornment})({position:"absolute",right:0,top:"calc(50% - 14px)"}),ko=F(Rt,{name:"MuiAutocomplete",slot:"ClearIndicator",overridesResolver:(e,o)=>o.clearIndicator})({marginRight:-2,padding:4,visibility:"hidden"}),$o=F(Rt,{name:"MuiAutocomplete",slot:"PopupIndicator",overridesResolver:({ownerState:e},o)=>p({},o.popupIndicator,e.popupOpen&&o.popupIndicatorOpen)})(({ownerState:e})=>p({padding:2,marginRight:-2},e.popupOpen&&{transform:"rotate(180deg)"})),Oo=F(At,{name:"MuiAutocomplete",slot:"Popper",overridesResolver:(e,o)=>{const{ownerState:s}=e;return[{[`& .${d.option}`]:o.option},o.popper,s.disablePortal&&o.popperDisablePortal]}})(({theme:e,ownerState:o})=>p({zIndex:(e.vars||e).zIndex.modal},o.disablePortal&&{position:"absolute"})),So=F(Tt,{name:"MuiAutocomplete",slot:"Paper",overridesResolver:(e,o)=>o.paper})(({theme:e})=>p({},e.typography.body1,{overflow:"auto"})),Lo=F("div",{name:"MuiAutocomplete",slot:"Loading",overridesResolver:(e,o)=>o.loading})(({theme:e})=>({color:(e.vars||e).palette.text.secondary,padding:"14px 16px"})),Ro=F("div",{name:"MuiAutocomplete",slot:"NoOptions",overridesResolver:(e,o)=>o.noOptions})(({theme:e})=>({color:(e.vars||e).palette.text.secondary,padding:"14px 16px"})),Ao=F("div",{name:"MuiAutocomplete",slot:"Listbox",overridesResolver:(e,o)=>o.listbox})(({theme:e})=>({listStyle:"none",margin:0,padding:"8px 0",maxHeight:"40vh",overflow:"auto",position:"relative",[`& .${d.option}`]:{minHeight:48,display:"flex",overflow:"hidden",justifyContent:"flex-start",alignItems:"center",cursor:"pointer",paddingTop:6,boxSizing:"border-box",outline:"0",WebkitTapHighlightColor:"transparent",paddingBottom:6,paddingLeft:16,paddingRight:16,[e.breakpoints.up("sm")]:{minHeight:"auto"},[`&.${d.focused}`]:{backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},'&[aria-disabled="true"]':{opacity:(e.vars||e).palette.action.disabledOpacity,pointerEvents:"none"},[`&.${d.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},'&[aria-selected="true"]':{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:rt(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${d.focused}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:rt(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:(e.vars||e).palette.action.selected}},[`&.${d.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:rt(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}}}})),To=F(ho,{name:"MuiAutocomplete",slot:"GroupLabel",overridesResolver:(e,o)=>o.groupLabel})(({theme:e})=>({backgroundColor:(e.vars||e).palette.background.paper,top:-8})),Fo=F("ul",{name:"MuiAutocomplete",slot:"GroupUl",overridesResolver:(e,o)=>o.groupUl})({padding:0,[`& .${d.option}`]:{paddingLeft:24}}),Mo=y.forwardRef(function(o,s){var c,u,l,x;const h=Ue({props:o,name:"MuiAutocomplete"}),{autoComplete:m=!1,autoHighlight:f=!1,autoSelect:P=!1,blurOnSelect:$=!1,ChipProps:L,className:k,clearIcon:Q=St||(St=g.jsx(Ut,{fontSize:"small"})),clearOnBlur:U=!h.freeSolo,clearOnEscape:w=!1,clearText:M="Clear",closeText:O="Close",componentsProps:N={},defaultValue:ce=h.multiple?[]:null,disableClearable:q=!1,disableCloseOnSelect:V=!1,disabled:D=!1,disabledItemsFocusable:X=!1,disableListWrap:Y=!1,disablePortal:ve=!1,filterSelectedOptions:z=!1,forcePopupIcon:I="auto",freeSolo:me=!1,fullWidth:Pe=!1,getLimitTagsText:se=t=>`+${t}`,getOptionLabel:Z,groupBy:de,handleHomeEndKeys:Be=!h.freeSolo,includeInputInList:K=!1,limitTags:fe=-1,ListboxComponent:be="ul",ListboxProps:we,loading:We=!1,loadingText:W="Loading…",multiple:j=!1,noOptionsText:De="No options",openOnFocus:Ge=!1,openText:R="Open",PaperComponent:G=Tt,PopperComponent:ke=At,popupIcon:st=Lt||(Lt=g.jsx(Wt,{})),readOnly:H=!1,renderGroup:ze,renderInput:qe,renderOption:E,renderTags:i,selectOnFocus:bt=!h.freeSolo,size:C="medium",slotProps:pe={}}=h,$e=he(h,xo),{getRootProps:Ke,getInputProps:xe,getInputLabelProps:ge,getPopupIndicatorProps:Je,getClearProps:at,getTagProps:Qe,getListboxProps:Xe,getOptionProps:_,value:v,dirty:ee,expanded:je,id:Oe,popupOpen:Se,focused:ae,focusedTag:te,anchorEl:Le,setAnchorEl:Ee,inputValue:lt,groupedOptions:J}=co(p({},h,{componentName:"Autocomplete"})),ue=!q&&!D&&ee&&!H,le=(!me||I===!0)&&I!==!1,{onMouseDown:Re}=xe(),{ref:Ce}=we??{},Ye=Xe(),{ref:Ze}=Ye,et=he(Ye,Co),it=Gt(Ze,Ce),Ae=Z||(t=>{var r;return(r=t.label)!=null?r:t}),B=p({},h,{disablePortal:ve,expanded:je,focused:ae,fullWidth:Pe,getOptionLabel:Ae,hasClearIcon:ue,hasPopupIcon:le,inputFocused:te===-1,popupOpen:Se,size:C}),T=Io(B);let oe;if(j&&v.length>0){const t=r=>p({className:T.tag,disabled:D},Qe(r));i?oe=i(v,t,B):oe=v.map((r,a)=>g.jsx(Jt,p({label:Ae(r),size:C},t({index:a}),L)))}if(fe>-1&&Array.isArray(oe)){const t=oe.length-fe;!ae&&t>0&&(oe=oe.splice(0,fe),oe.push(g.jsx("span",{className:T.tag,children:se(t)},oe.length)))}const ct=ze||(t=>g.jsxs("li",{children:[g.jsx(To,{className:T.groupLabel,ownerState:B,component:"div",children:t.group}),g.jsx(Fo,{className:T.groupUl,ownerState:B,children:t.children})]},t.key)),ut=E||((t,r)=>{const{key:a}=t,b=he(t,yo);return g.jsx("li",p({},b,{children:Ae(r)}),a)}),tt=(t,r)=>{const a=_({option:t,index:r});return ut(p({},a,{className:T.option}),t,{selected:a["aria-selected"],index:r,inputValue:lt},B)},Ve=(c=pe.clearIndicator)!=null?c:N.clearIndicator,ye=(u=pe.paper)!=null?u:N.paper,Te=(l=pe.popper)!=null?l:N.popper,n=(x=pe.popupIndicator)!=null?x:N.popupIndicator;return g.jsxs(y.Fragment,{children:[g.jsx(vo,p({ref:s,className:ne(T.root,k),ownerState:B},Ke($e),{children:qe({id:Oe,disabled:D,fullWidth:!0,size:C==="small"?"small":void 0,InputLabelProps:ge(),InputProps:p({ref:Ee,className:T.inputRoot,startAdornment:oe,onClick:t=>{t.target===t.currentTarget&&Re(t)}},(ue||le)&&{endAdornment:g.jsxs(Po,{className:T.endAdornment,ownerState:B,children:[ue?g.jsx(ko,p({},at(),{"aria-label":M,title:M,ownerState:B},Ve,{className:ne(T.clearIndicator,Ve==null?void 0:Ve.className),children:Q})):null,le?g.jsx($o,p({},Je(),{disabled:D,"aria-label":Se?O:R,title:Se?O:R,ownerState:B},n,{className:ne(T.popupIndicator,n==null?void 0:n.className),children:st})):null]})}),inputProps:p({className:T.input,disabled:D,readOnly:H},xe())})})),Le?g.jsx(Oo,p({as:ke,disablePortal:ve,style:{width:Le?Le.clientWidth:null},ownerState:B,role:"presentation",anchorEl:Le,open:Se},Te,{className:ne(T.popper,Te==null?void 0:Te.className),children:g.jsxs(So,p({ownerState:B,as:G},ye,{className:ne(T.paper,ye==null?void 0:ye.className),children:[We&&J.length===0?g.jsx(Lo,{className:T.loading,ownerState:B,children:W}):null,J.length===0&&!me&&!We?g.jsx(Ro,{className:T.noOptions,ownerState:B,role:"presentation",onMouseDown:t=>{t.preventDefault()},children:De}):null,J.length>0?g.jsx(Ao,p({as:be,className:T.listbox,ownerState:B},et,we,{ref:it,children:J.map((t,r)=>de?ct({key:t.key,group:t.group,children:t.options.map((a,b)=>tt(a,t.index+b))}):tt(t,r))})):null]}))})):null]})}),un=Mo;function No(e){return Ne("PrivateSwitchBase",e)}_e("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);const Bo=["autoFocus","checked","checkedIcon","className","defaultChecked","disabled","disableFocusRipple","edge","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"],wo=e=>{const{classes:o,checked:s,disabled:c,edge:u}=e,l={root:["root",s&&"checked",c&&"disabled",u&&`edge${re(u)}`],input:["input"]};return Me(l,No,o)},Do=F(qt)(({ownerState:e})=>p({padding:9,borderRadius:"50%"},e.edge==="start"&&{marginLeft:e.size==="small"?-3:-12},e.edge==="end"&&{marginRight:e.size==="small"?-3:-12})),zo=F("input",{shouldForwardProp:Ft})({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),jo=y.forwardRef(function(o,s){const{autoFocus:c,checked:u,checkedIcon:l,className:x,defaultChecked:h,disabled:m,disableFocusRipple:f=!1,edge:P=!1,icon:$,id:L,inputProps:k,inputRef:Q,name:U,onBlur:w,onChange:M,onFocus:O,readOnly:N,required:ce=!1,tabIndex:q,type:V,value:D}=o,X=he(o,Bo),[Y,ve]=nt({controlled:u,default:!!h,name:"SwitchBase",state:"checked"}),z=Mt(),I=K=>{O&&O(K),z&&z.onFocus&&z.onFocus(K)},me=K=>{w&&w(K),z&&z.onBlur&&z.onBlur(K)},Pe=K=>{if(K.nativeEvent.defaultPrevented)return;const fe=K.target.checked;ve(fe),M&&M(K,fe)};let se=m;z&&typeof se>"u"&&(se=z.disabled);const Z=V==="checkbox"||V==="radio",de=p({},o,{checked:Y,disabled:se,disableFocusRipple:f,edge:P}),Be=wo(de);return g.jsxs(Do,p({component:"span",className:ne(Be.root,x),centerRipple:!0,focusRipple:!f,disabled:se,tabIndex:null,role:void 0,onFocus:I,onBlur:me,ownerState:de,ref:s},X,{children:[g.jsx(zo,p({autoFocus:c,checked:u,defaultChecked:h,className:Be.input,disabled:se,id:Z?L:void 0,name:U,onChange:Pe,readOnly:N,ref:Q,required:ce,ownerState:de,tabIndex:q,type:V},V==="checkbox"&&D===void 0?{}:{value:D},k)),Y?l:$]}))}),Eo=jo,Vo=mt(g.jsx("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),Ho=mt(g.jsx("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),_o=mt(g.jsx("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox");function Uo(e){return Ne("MuiCheckbox",e)}const Wo=_e("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary","sizeSmall","sizeMedium"]),ht=Wo,Go=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size","className"],qo=e=>{const{classes:o,indeterminate:s,color:c,size:u}=e,l={root:["root",s&&"indeterminate",`color${re(c)}`,`size${re(u)}`]},x=Me(l,Uo,o);return p({},o,x)},Ko=F(Eo,{shouldForwardProp:e=>Ft(e)||e==="classes",name:"MuiCheckbox",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:s}=e;return[o.root,s.indeterminate&&o.indeterminate,o[`size${re(s.size)}`],s.color!=="default"&&o[`color${re(s.color)}`]]}})(({theme:e,ownerState:o})=>p({color:(e.vars||e).palette.text.secondary},!o.disableRipple&&{"&:hover":{backgroundColor:e.vars?`rgba(${o.color==="default"?e.vars.palette.action.activeChannel:e.vars.palette[o.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:rt(o.color==="default"?e.palette.action.active:e.palette[o.color].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},o.color!=="default"&&{[`&.${ht.checked}, &.${ht.indeterminate}`]:{color:(e.vars||e).palette[o.color].main},[`&.${ht.disabled}`]:{color:(e.vars||e).palette.action.disabled}})),Jo=g.jsx(Ho,{}),Qo=g.jsx(Vo,{}),Xo=g.jsx(_o,{}),Yo=y.forwardRef(function(o,s){var c,u;const l=Ue({props:o,name:"MuiCheckbox"}),{checkedIcon:x=Jo,color:h="primary",icon:m=Qo,indeterminate:f=!1,indeterminateIcon:P=Xo,inputProps:$,size:L="medium",className:k}=l,Q=he(l,Go),U=f?P:m,w=f?P:x,M=p({},l,{color:h,indeterminate:f,size:L}),O=qo(M);return g.jsx(Ko,p({type:"checkbox",inputProps:p({"data-indeterminate":f},$),icon:y.cloneElement(U,{fontSize:(c=U.props.fontSize)!=null?c:L}),checkedIcon:y.cloneElement(w,{fontSize:(u=w.props.fontSize)!=null?u:L}),ownerState:M,ref:s,className:ne(O.root,k)},Q,{classes:O}))}),dn=Yo,Zo=so({createStyledComponent:F("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,o)=>o.root}),useThemeProps:e=>Ue({props:e,name:"MuiStack"})}),en=Zo;function tn(e){return Ne("MuiFormControlLabel",e)}const on=_e("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error","required","asterisk"]),He=on,nn=["checked","className","componentsProps","control","disabled","disableTypography","inputRef","label","labelPlacement","name","onChange","required","slotProps","value"],rn=e=>{const{classes:o,disabled:s,labelPlacement:c,error:u,required:l}=e,x={root:["root",s&&"disabled",`labelPlacement${re(c)}`,u&&"error",l&&"required"],label:["label",s&&"disabled"],asterisk:["asterisk",u&&"error"]};return Me(x,tn,o)},sn=F("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:s}=e;return[{[`& .${He.label}`]:o.label},o.root,o[`labelPlacement${re(s.labelPlacement)}`]]}})(({theme:e,ownerState:o})=>p({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,[`&.${He.disabled}`]:{cursor:"default"}},o.labelPlacement==="start"&&{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},o.labelPlacement==="top"&&{flexDirection:"column-reverse",marginLeft:16},o.labelPlacement==="bottom"&&{flexDirection:"column",marginLeft:16},{[`& .${He.label}`]:{[`&.${He.disabled}`]:{color:(e.vars||e).palette.text.disabled}}})),an=F("span",{name:"MuiFormControlLabel",slot:"Asterisk",overridesResolver:(e,o)=>o.asterisk})(({theme:e})=>({[`&.${He.error}`]:{color:(e.vars||e).palette.error.main}})),ln=y.forwardRef(function(o,s){var c,u;const l=Ue({props:o,name:"MuiFormControlLabel"}),{className:x,componentsProps:h={},control:m,disabled:f,disableTypography:P,label:$,labelPlacement:L="end",required:k,slotProps:Q={}}=l,U=he(l,nn),w=Mt(),M=(c=f??m.props.disabled)!=null?c:w==null?void 0:w.disabled,O=k??m.props.required,N={disabled:M,required:O};["checked","name","onChange","value","inputRef"].forEach(Y=>{typeof m.props[Y]>"u"&&typeof l[Y]<"u"&&(N[Y]=l[Y])});const ce=Kt({props:l,muiFormControl:w,states:["error"]}),q=p({},l,{disabled:M,labelPlacement:L,required:O,error:ce.error}),V=rn(q),D=(u=Q.typography)!=null?u:h.typography;let X=$;return X!=null&&X.type!==kt&&!P&&(X=g.jsx(kt,p({component:"span"},D,{className:ne(V.label,D==null?void 0:D.className),children:X}))),g.jsxs(sn,p({className:ne(V.root,x),ownerState:q,ref:s},U,{children:[y.cloneElement(m,N),O?g.jsxs(en,{display:"block",children:[X,g.jsxs(an,{ownerState:q,"aria-hidden":!0,className:V.asterisk,children:[" ","*"]})]}):X]}))}),fn=ln;export{un as A,dn as C,fn as F,Eo as S,ao as c,Xt as s,Qt as u};
