import{e as u,i as l,v as p,o as d,E as f}from"./COpQeP-G.js";import{d as o,_ as g,f as _,w as E,c as h}from"./BR-pbtti.js";import{p as v,g as y,c as I}from"./R3mG4QKk.js";function r(){return document.getElementById(o)}function S(n){document.body.insertAdjacentHTML("beforeend",M())}function A(n,t){if(document.getElementById(n))return;const a=r();a&&a.insertAdjacentHTML("beforeend",t)}function M(n){return`
<svg id="${o}">
    <style>#${o} { position: fixed; opacity: 0; width: 0; height: 0; }</style></svg>
`}const D=u({__name:"MyRuntimeIcon",props:{svg:{},name:{},wrapper:{}},setup(n){const t=n,a=l(),c=p(()=>{try{const e=v(t.svg),s=`__my-icons-runtime__${y(e)}`,m=I(e,s);return r()||S(),A(s,m),_(t,"#"+s)}catch(e){return E(`Failed to resolve runtime icon "${t.name}"!
Reason: ${(e==null?void 0:e.message)||e}`),h(t)}});return(e,i)=>(d(),f(g,{data:c.value},null,8,["data"]))}});export{D as _};
