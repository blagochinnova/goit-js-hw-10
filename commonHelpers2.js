import"./assets/header-45e62a5d.js";/* empty css                      */import{i as s}from"./assets/vendor-651d7991.js";document.querySelector(".form").addEventListener("submit",function(o){o.preventDefault();const r=document.querySelector('[name="delay"]'),i=document.querySelector('[name="state"]:checked'),t=parseInt(r.value,10);new Promise((e,m)=>{setTimeout(()=>{i.value==="fulfilled"?e(t):m(t)},t)}).then(e=>{s.success({title:"Success",message:`✅ Fulfilled promise in ${e}ms`})}).catch(e=>{s.error({title:"Error",message:`❌ Rejected promise in ${e}ms`})})});
//# sourceMappingURL=commonHelpers2.js.map
