import{b as u,c as m}from"./CZwkuIqU.js";import{z as l,e as f,r as p,I as y,E as d,N as I,n as _,w as h,o as s,c as r,O as M,a as E,u as w}from"./BdCi6xpR.js";function C(){return l().app.baseURL+u+"/icons.svg?"+m}const D="My Icons",B="nuxt-my-icons",k="_my-icons",c="__missing";function o(e){return{name:e.name,wrapper:e.wrapper||"div"}}function R(e){return{...o(e),type:"bundle",href:e.name}}function A(e,a){return{...o(e),type:"runtime",href:a}}function O(e,a,t){return{...o(e),type:"inline",href:a,symbol:t}}function T(e){return{...o(e),type:"bundle",name:c,href:c}}function U(e){console.warn(`[${D}] ${e}`)}const N=["innerHTML"],b=["href"],P=f({__name:"Icon",props:{data:{}},setup(e){const a=e,t=p(0),i=C();return y(a,()=>{a.data.type==="inline"&&t.value++}),(n,L)=>(s(),d(I(_(n.data.wrapper)),{"my-icon":n.data.name,"my-icon-type":n.data.type},{default:h(()=>[(s(),r("svg",{key:t.value},[n.data.type==="inline"?(s(),r("defs",{key:0,innerHTML:n.data.symbol},null,8,N)):M("",!0),E("use",{href:(n.data.type==="bundle"?w(i):"")+"#"+n.data.href},null,8,b)]))]),_:1},8,["my-icon","my-icon-type"]))}});export{c as M,P as _,R as a,O as b,T as c,B as d,k as e,A as f,C as u,U as w};
