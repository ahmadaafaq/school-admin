import{O as I,aC as h,_ as n,a as g,P as v,Q as C,a5 as j,T as p,j as d,V as N,W as R,aD as _}from"./index-j0XQm0-z.js";const W=["children","className","disableTypography","inset","primary","primaryTypographyProps","secondary","secondaryTypographyProps"],$=e=>{const{classes:s,inset:r,primary:t,secondary:c,dense:y}=e;return R({root:["root",r&&"inset",y&&"dense",t&&c&&"multiline"],primary:["primary"],secondary:["secondary"]},_,s)},k=I("div",{name:"MuiListItemText",slot:"Root",overridesResolver:(e,s)=>{const{ownerState:r}=e;return[{[`& .${h.primary}`]:s.primary},{[`& .${h.secondary}`]:s.secondary},s.root,r.inset&&s.inset,r.primary&&r.secondary&&s.multiline,r.dense&&s.dense]}})(({ownerState:e})=>n({flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4},e.primary&&e.secondary&&{marginTop:6,marginBottom:6},e.inset&&{paddingLeft:56})),B=g.forwardRef(function(s,r){const t=v({props:s,name:"MuiListItemText"}),{children:c,className:y,disableTypography:i=!1,inset:L=!1,primary:x,primaryTypographyProps:l,secondary:f,secondaryTypographyProps:P}=t,b=C(t,W),{dense:u}=g.useContext(j);let o=x??c,a=f;const T=n({},t,{disableTypography:i,inset:L,primary:!!o,secondary:!!a,dense:u}),m=$(T);return o!=null&&o.type!==p&&!i&&(o=d.jsx(p,n({variant:u?"body2":"body1",className:m.primary,component:l!=null&&l.variant?void 0:"span",display:"block"},l,{children:o}))),a!=null&&a.type!==p&&!i&&(a=d.jsx(p,n({variant:"body2",className:m.secondary,color:"text.secondary",display:"block"},P,{children:a}))),d.jsxs(k,n({className:N(m.root,y),ownerState:T,ref:r},b,{children:[o,a]}))}),M=B;export{M as L};
