import{d as o,_ as u,f as l,w as p,c as d}from"./DR7ykWmi.js";import{p as f,g,c as _}from"./C2VoMU96.js";import{e as E,i as h,v,E as y,o as I}from"./Bl1GJwj2.js";function r(){return document.getElementById(o)}function S(n){document.body.insertAdjacentHTML("beforeend",M())}function A(n,t){if(document.getElementById(n))return;const a=r();a&&a.insertAdjacentHTML("beforeend",t)}function M(n){return`
<svg id="${o}">
    <style>#${o} { position: fixed; opacity: 0; width: 0; height: 0; }</style></svg>
`}const D=E({__name:"MyRuntimeIcon",props:{svg:{},name:{},wrapper:{}},setup(n){const t=n,a=h(),c=v(()=>{try{const e=f(t.svg),s=`__my-icons-runtime__${g(e)}`,m=_(e,s);return r()||S(),A(s,m),l(t,s)}catch(e){return p(`Failed to resolve runtime icon "${t.name}"!
Reason: ${(e==null?void 0:e.message)||e}`),d(t)}});return(e,i)=>(I(),y(u,{data:c.value},null,8,["data"]))}});export{D as _};
