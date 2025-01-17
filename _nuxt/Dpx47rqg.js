import{e as u,j as l,y as p,o as d,g}from"./G1Zc6AH1.js";import{d as o,_ as f,f as _,w as y,c as E}from"./BYURTlJk.js";import{p as h,g as v,c as I}from"./R3mG4QKk.js";function c(){return document.getElementById(o)}function S(n){const e=document.createElement("div");e.innerHTML=$(),document.body.append(e.firstChild)}function M(n,e){if(document.getElementById(n))return;const a=c();a&&(a.innerHTML+=e)}function $(n){return`
<svg id="${o}">
    <style>#${o} { position: fixed; opacity: 0; width: 0; height: 0; }</style></svg>
`}const L=u({__name:"MyRuntimeIcon",props:{svg:{},name:{},wrapper:{}},setup(n){const e=n,a=l(),r=p(()=>{try{const t=h(e.svg),s=`__my-icons-runtime__${v(t)}`,m=I(t,s);return c()||S(),M(s,m),_(e,"#"+s)}catch(t){return y(`Failed to resolve runtime icon "${e.name}"!
Reason: ${(t==null?void 0:t.message)||t}`),E(e)}});return(t,i)=>(d(),g(f,{data:r.value},null,8,["data"]))}});export{L as _};
