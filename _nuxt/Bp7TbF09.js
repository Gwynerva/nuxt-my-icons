import{d as a,_ as u,f as _,w as l,c as d}from"./DvJ4FRf8.js";import{p as f,g,c as p}from"./C2VoMU96.js";import{e as y,j as I,z as h,I as E,o as v}from"./CDoVZ4Au.js";import"./CZwkuIqU.js";function r(){return document.getElementById(a)}function M(t){document.body.insertAdjacentHTML("beforeend",A())}function S(t,n){if(document.getElementById(t))return;const o=r();o&&o.insertAdjacentHTML("beforeend",n)}function A(t){return`
<svg id="${a}">
    <style>#${a} { position: fixed; opacity: 0; width: 0; height: 0; }</style></svg>
`}const R=y({__name:"MyRuntimeIcon",props:{svg:{}},setup(t){const n=t,o=I(),c=h(()=>{try{const e=f(n.svg),s=`__my-icons-runtime__${g(e)}`,m=p(e,s);return r()||M(),S(s,m),_(n,s)}catch(e){return l(`Failed to resolve runtime icon!
Reason: ${e?.message||e}`),d()}});return(e,i)=>(v(),E(u,{data:c.value},null,8,["data"]))}}),j=Object.assign(R,{__name:"MyRuntimeIcon"});export{j as default};
