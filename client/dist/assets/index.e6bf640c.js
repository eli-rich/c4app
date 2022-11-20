(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const r of l)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(l){const r={};return l.integrity&&(r.integrity=l.integrity),l.referrerpolicy&&(r.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?r.credentials="include":l.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(l){if(l.ep)return;l.ep=!0;const r=n(l);fetch(l.href,r)}})();const E={},pe=(e,t)=>e===t,ge=Symbol("solid-track"),U={equals:pe};let be=fe;const O=1,X=2,re={owned:null,cleanups:null,context:null,owner:null};var w=null;let T=null,b=null,y=null,L=null,J=0;function F(e,t){const n=b,s=w,l=e.length===0,r=l?re:{owned:null,cleanups:null,context:null,owner:t||s},o=l?e:()=>e(()=>q(()=>Z(r)));w=r,b=null;try{return G(o,!0)}finally{b=n,w=s}}function k(e,t){t=t?Object.assign({},U,t):U;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=l=>(typeof l=="function"&&(l=l(n.value)),oe(n,l));return[ie.bind(n),s]}function P(e,t,n){const s=ce(e,t,!1,O);H(s)}function I(e,t,n){n=n?Object.assign({},U,n):U;const s=ce(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,H(s),ie.bind(s)}function q(e){const t=b;b=null;try{return e()}finally{b=t}}function me(e){return w===null||(w.cleanups===null?w.cleanups=[e]:w.cleanups.push(e)),e}function we(e){const t=I(e),n=I(()=>V(t()));return n.toArray=()=>{const s=n();return Array.isArray(s)?s:s!=null?[s]:[]},n}function ie(){const e=T;if(this.sources&&(this.state||e))if(this.state===O||e)H(this);else{const t=y;y=null,G(()=>R(this),!1),y=t}if(b){const t=this.observers?this.observers.length:0;b.sources?(b.sources.push(this),b.sourceSlots.push(t)):(b.sources=[this],b.sourceSlots=[t]),this.observers?(this.observers.push(b),this.observerSlots.push(b.sources.length-1)):(this.observers=[b],this.observerSlots=[b.sources.length-1])}return this.value}function oe(e,t,n){let s=e.value;return(!e.comparator||!e.comparator(s,t))&&(e.value=t,e.observers&&e.observers.length&&G(()=>{for(let l=0;l<e.observers.length;l+=1){const r=e.observers[l],o=T&&T.running;o&&T.disposed.has(r),(o&&!r.tState||!o&&!r.state)&&(r.pure?y.push(r):L.push(r),r.observers&&ae(r)),o||(r.state=O)}if(y.length>1e6)throw y=[],new Error},!1)),t}function H(e){if(!e.fn)return;Z(e);const t=w,n=b,s=J;b=w=e,ye(e,e.value,s),b=n,w=t}function ye(e,t,n){let s;try{s=e.fn(t)}catch(l){e.pure&&(e.state=O),de(l)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?oe(e,s):e.value=s,e.updatedAt=n)}function ce(e,t,n,s=O,l){const r={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:w,context:null,pure:n};return w===null||w!==re&&(w.owned?w.owned.push(r):w.owned=[r]),r}function ue(e){const t=T;if(e.state===0||t)return;if(e.state===X||t)return R(e);if(e.suspense&&q(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<J);)(e.state||t)&&n.push(e);for(let s=n.length-1;s>=0;s--)if(e=n[s],e.state===O||t)H(e);else if(e.state===X||t){const l=y;y=null,G(()=>R(e,n[0]),!1),y=l}}function G(e,t){if(y)return e();let n=!1;t||(y=[]),L?n=!0:L=[],J++;try{const s=e();return ve(n),s}catch(s){y||(L=null),de(s)}}function ve(e){if(y&&(fe(y),y=null),e)return;const t=L;L=null,t.length&&G(()=>be(t),!1)}function fe(e){for(let t=0;t<e.length;t++)ue(e[t])}function R(e,t){const n=T;e.state=0;for(let s=0;s<e.sources.length;s+=1){const l=e.sources[s];l.sources&&(l.state===O||n?l!==t&&ue(l):(l.state===X||n)&&R(l,t))}}function ae(e){const t=T;for(let n=0;n<e.observers.length;n+=1){const s=e.observers[n];(!s.state||t)&&(s.state=X,s.pure?y.push(s):L.push(s),s.observers&&ae(s))}}function Z(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),l=n.observers;if(l&&l.length){const r=l.pop(),o=n.observerSlots.pop();s<l.length&&(r.sourceSlots[o]=s,l[s]=r,n.observerSlots[s]=o)}}if(e.owned){for(t=0;t<e.owned.length;t++)Z(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function xe(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function de(e){throw e=xe(e),e}function V(e){if(typeof e=="function"&&!e.length)return V(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const s=V(e[n]);Array.isArray(s)?t.push.apply(t,s):t.push(s)}return t}return e}const $e=Symbol("fallback");function ee(e){for(let t=0;t<e.length;t++)e[t]()}function Ce(e,t,n={}){let s=[],l=[],r=[],o=0,i=t.length>1?[]:null;return me(()=>ee(r)),()=>{let u=e()||[],a,c;return u[ge],q(()=>{let p=u.length,v,C,S,_,j,$,d,f,h;if(p===0)o!==0&&(ee(r),r=[],s=[],l=[],o=0,i&&(i=[])),n.fallback&&(s=[$e],l[0]=F(g=>(r[0]=g,n.fallback())),o=1);else if(o===0){for(l=new Array(p),c=0;c<p;c++)s[c]=u[c],l[c]=F(m);o=p}else{for(S=new Array(p),_=new Array(p),i&&(j=new Array(p)),$=0,d=Math.min(o,p);$<d&&s[$]===u[$];$++);for(d=o-1,f=p-1;d>=$&&f>=$&&s[d]===u[f];d--,f--)S[f]=l[d],_[f]=r[d],i&&(j[f]=i[d]);for(v=new Map,C=new Array(f+1),c=f;c>=$;c--)h=u[c],a=v.get(h),C[c]=a===void 0?-1:a,v.set(h,c);for(a=$;a<=d;a++)h=s[a],c=v.get(h),c!==void 0&&c!==-1?(S[c]=l[a],_[c]=r[a],i&&(j[c]=i[a]),c=C[c],v.set(h,c)):r[a]();for(c=$;c<p;c++)c in S?(l[c]=S[c],r[c]=_[c],i&&(i[c]=j[c],i[c](c))):l[c]=F(m);l=l.slice(0,o=p),s=u.slice(0)}return l});function m(p){if(r[c]=p,i){const[v,C]=k(c);return i[c]=C,t(u[c],v)}return t(u[c])}}}function x(e,t){return q(()=>e(t||{}))}function Ae(e){const t="fallback"in e&&{fallback:()=>e.fallback};return I(Ce(()=>e.each,e.children,t||void 0))}function te(e){let t=!1,n=!1;const s=we(()=>e.children),l=I(()=>{let r=s();Array.isArray(r)||(r=[r]);for(let o=0;o<r.length;o++){const i=r[o].when;if(i)return n=!!r[o].keyed,[o,i,r[o]]}return[-1]},void 0,{equals:(r,o)=>r[0]===o[0]&&(t?r[1]===o[1]:!r[1]==!o[1])&&r[2]===o[2]});return I(()=>{const[r,o,i]=l();if(r<0)return e.fallback;const u=i.children,a=typeof u=="function"&&u.length>0;return t=n||a,a?q(()=>u(o)):u})}function M(e){return e}function Se(e,t,n){let s=n.length,l=t.length,r=s,o=0,i=0,u=t[l-1].nextSibling,a=null;for(;o<l||i<r;){if(t[o]===n[i]){o++,i++;continue}for(;t[l-1]===n[r-1];)l--,r--;if(l===o){const c=r<s?i?n[i-1].nextSibling:n[r-i]:u;for(;i<r;)e.insertBefore(n[i++],c)}else if(r===i)for(;o<l;)(!a||!a.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[r-1]&&n[i]===t[l-1]){const c=t[--l].nextSibling;e.insertBefore(n[i++],t[o++].nextSibling),e.insertBefore(n[--r],c),t[l]=n[r]}else{if(!a){a=new Map;let m=i;for(;m<r;)a.set(n[m],m++)}const c=a.get(t[o]);if(c!=null)if(i<c&&c<r){let m=o,p=1,v;for(;++m<l&&m<r&&!((v=a.get(t[m]))==null||v!==c+p);)p++;if(p>c-i){const C=t[o];for(;i<c;)e.insertBefore(n[i++],C)}else e.replaceChild(n[i++],t[o++])}else o++;else t[o++].remove()}}}const ne="_$DX_DELEGATE";function _e(e,t,n,s={}){let l;return F(r=>{l=r,t===document?e():z(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{l(),t.textContent=""}}function N(e,t,n){const s=document.createElement("template");s.innerHTML=e;let l=s.content.firstChild;return n&&(l=l.firstChild),l}function D(e,t=window.document){const n=t[ne]||(t[ne]=new Set);for(let s=0,l=e.length;s<l;s++){const r=e[s];n.has(r)||(n.add(r),t.addEventListener(r,Ee))}}function he(e,t){t==null?e.removeAttribute("class"):e.className=t}function K(e,t,n,s){if(s)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const l=n[0];e.addEventListener(t,n[0]=r=>l.call(e,n[1],r))}else e.addEventListener(t,n)}function z(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return W(e,t,s,n);P(l=>W(e,t(),l,n),s)}function Ee(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),E.registry&&!E.done&&(E.done=!0,document.querySelectorAll("[id^=pl-]").forEach(s=>s.remove()));n!==null;){const s=n[t];if(s&&!n.disabled){const l=n[`${t}Data`];if(l!==void 0?s.call(n,l,e):s.call(n,e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function W(e,t,n,s,l){for(E.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const r=typeof t,o=s!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,r==="string"||r==="number"){if(E.context)return n;if(r==="number"&&(t=t.toString()),o){let i=n[0];i&&i.nodeType===3?i.data=t:i=document.createTextNode(t),n=B(e,n,s,i)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||r==="boolean"){if(E.context)return n;n=B(e,n,s)}else{if(r==="function")return P(()=>{let i=t();for(;typeof i=="function";)i=i();n=W(e,i,n,s)}),()=>n;if(Array.isArray(t)){const i=[],u=n&&Array.isArray(n);if(Q(i,t,n,l))return P(()=>n=W(e,i,n,s,!0)),()=>n;if(E.context){if(!i.length)return n;for(let a=0;a<i.length;a++)if(i[a].parentNode)return n=i}if(i.length===0){if(n=B(e,n,s),o)return n}else u?n.length===0?se(e,i,s):Se(e,n,i):(n&&B(e),se(e,i));n=i}else if(t instanceof Node){if(E.context&&t.parentNode)return n=o?[t]:t;if(Array.isArray(n)){if(o)return n=B(e,n,s,t);B(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function Q(e,t,n,s){let l=!1;for(let r=0,o=t.length;r<o;r++){let i=t[r],u=n&&n[r];if(i instanceof Node)e.push(i);else if(!(i==null||i===!0||i===!1))if(Array.isArray(i))l=Q(e,i,u)||l;else if(typeof i=="function")if(s){for(;typeof i=="function";)i=i();l=Q(e,Array.isArray(i)?i:[i],Array.isArray(u)?u:[u])||l}else e.push(i),l=!0;else{const a=String(i);u&&u.nodeType===3&&u.data===a?e.push(u):e.push(document.createTextNode(a))}}return l}function se(e,t,n=null){for(let s=0,l=t.length;s<l;s++)e.insertBefore(t[s],n)}function B(e,t,n,s){if(n===void 0)return e.textContent="";const l=s||document.createTextNode("");if(t.length){let r=!1;for(let o=t.length-1;o>=0;o--){const i=t[o];if(l!==i){const u=i.parentNode===e;!r&&!o?u?e.replaceChild(l,i):e.insertBefore(l,n):u&&i.remove()}else r=!0}}else e.insertBefore(l,n);return[l]}const Ne=N('<div class="w-full h-full"><div></div></div>');function ke(e){const t=e.col;return(()=>{const n=Ne.cloneNode(!0),s=n.firstChild;return s.$$click=()=>e.place(t),P(()=>he(s,`${e.bgColor} w-full h-full flex rounded-full cursor-pointer text-neutral-content my-auto text-lg hover:scale-105 transition-transform duration-200`)),n})()}D(["click"]);const Te=N('<div class="modal modal-open"><div class="modal-box bg-secondary text-secondary-content w-3/4 md:w-1/3 lg:w-1/4 p-5"><h3 class="font-bold text-2xl">Better Luck Next Time</h3><div class="grid grid-rows-1 grid-cols-2 content-center items-center pt-4"><p class="text-lg">You have lost.</p><p class="mb-2 -ml-3 text-4xl">\u{1F614}</p></div><div class="modal-action"><button class="btn btn-accent border-2 border-accent-focus">Close</button></div></div></div>');function Le(e){return(()=>{const t=Te.cloneNode(!0),n=t.firstChild,s=n.firstChild,l=s.nextSibling,r=l.nextSibling,o=r.firstChild;return K(o,"click",e.close,!0),t})()}D(["click"]);const Oe=N(`<div class="modal modal-open"><div class="modal-box bg-secondary text-secondary-content w-3/4 md:w-1/3 lg:w-1/4 p-5"><h3 class="font-bold text-2xl">Don't Flex Too Hard</h3><div class="grid grid-rows-1 grid-cols-2 content-center items-center pt-4"><p class="text-lg">You have won.</p><p class="mb-2 -ml-3 text-4xl">\u{1F60A}</p></div><div class="modal-action"><button class="btn btn-accent border-2 border-accent-focus">Close</button></div></div></div>`);function je(e){return(()=>{const t=Oe.cloneNode(!0),n=t.firstChild,s=n.firstChild,l=s.nextSibling,r=l.nextSibling,o=r.firstChild;return K(o,"click",e.close,!0),t})()}D(["click"]);const Be=N('<div class="modal modal-open"><div class="modal-box bg-error text-error-content w-3/4 md:w-1/3 lg:w-1/4 p-5"><h3 class="font-bold text-2xl">Illegal Move</h3><div class="grid grid-rows-1 grid-cols-2 content-center items-center pt-4"><p class="text-lg">This column is full.</p><p class="mb-2 -ml-3 text-4xl">\u{1F6A8}</p></div><div class="modal-action"><button class="btn btn-error border-2 border-error-content hover:scale-110 text-error-content hover:border-2 hover:border-error-content">Close</button></div></div></div>');function De(e){return(()=>{const t=Be.cloneNode(!0),n=t.firstChild,s=n.firstChild,l=s.nextSibling,r=l.nextSibling,o=r.firstChild;return K(o,"click",e.close,!0),t})()}D(["click"]);const Me=N('<div class="modal modal-open"><div class="modal-box bg-secondary text-secondary-content w-3/4 md:w-1/3 lg:w-1/4 p-5"><h3 class="font-bold text-2xl">*crickets*</h3><div class="grid grid-rows-1 grid-cols-2 content-center items-center pt-4"><p class="text-lg">You have drawn.</p><p class="mb-2 -ml-3 text-4xl">\u{1F610}</p></div><div class="modal-action"><button class="btn btn-accent border-2 border-accent-focus">Close</button></div></div></div>');function Pe(e){return(()=>{const t=Me.cloneNode(!0),n=t.firstChild,s=n.firstChild,l=s.nextSibling,r=l.nextSibling,o=r.firstChild;return K(o,"click",e.close,!0),t})()}D(["click"]);function le(e){return String.fromCharCode(65+e)}const Ie=N('<div class="flex justify-center w-min p-1 mx-auto mt-1 rounded-md"><div class="grid grid-rows-6 grid-cols-7 gap-1" id="game-grid"></div></div>'),qe=N('<div class="flex mx-auto w-2/3 justify-center mt-2"><button>New Game</button><div class="ml-3 flex justify-center"><label class="swap swap-flip"><input type="checkbox"><div class="swap-on"><div class="w-10 h-10"><div class="bg-accent w-full h-full flex rounded-full justify-center items-center my-auto text-lg border-black border-[1px]"></div></div></div><div class="swap-off"><div class="w-10 h-10"><div class="bg-primary w-full h-full flex rounded-full justify-center items-center my-auto text-lg border-black border-[1px]"></div></div></div></label></div></div>'),Y=new Worker("worker.js");function Ge(){const[e,t]=k(Array(42).fill(" ")),[n,s]=k([]),[l,r]=k(!1),[o,i]=k(!0),[u,a]=k("primary"),[c,m]=k("none");function p(){t(Array(42).fill(" ")),s([]),r(!1),i(!1),m("none"),i(!1),u()==="accent"&&(t(d=>{const f=[...d];return f[_(3)]="X",f}),s(d=>[...d,"D"]))}function v(){m("none")}function C(){i(!0),m("win")}function S(){i(!0),m("lose")}function _(d){for(let f=42;f>=0;f--)if(e()[f]===" "&&f%7===d)return f;return-1}function j(d){if(o()||l())return;const f=_(d);if(f===-1)return m("error");t(h=>{const g=[...h];return g[f]=u()==="primary"?"X":"O",g}),s(h=>{const g=[...h];return g.push(le(d)),g}),$()}Y.onmessage=d=>{const{data:f}=d;if(f[0]==="move"){const h=parseInt(f[1]);t(g=>{const A=[...g];return A[_(h)]=u()==="primary"?"O":"X",A}),console.log(h),s(g=>{const A=[...g];return A.push(le(h%7)),A}),r(!1),Y.postMessage(["checkwin",n().join("")])}else if(f[0]==="win"){const h=f[1],g=f[2];if(console.log(h,g),h&&u()==="primary")return C();if(h&&u()==="accent")return S();if(g&&u()==="accent")return C();if(g&&u()==="primary")return S();if(e().every(A=>A!==" "))return m("draw")}};async function $(){r(!0),Y.postMessage(["search",n().join("")])}return[(()=>{const d=Ie.cloneNode(!0),f=d.firstChild;return z(f,x(Ae,{get each(){return e()},children:(h,g)=>x(ke,{get col(){return g()%7},place:j,bgColor:`${h==="X"?"bg-primary":h==="O"?"bg-accent":"bg-neutral-focus"}`})})),d})(),x(te,{get children(){return x(M,{get when(){return o()===!0},get children(){const d=qe.cloneNode(!0),f=d.firstChild,h=f.nextSibling,g=h.firstChild,A=g.firstChild;return f.$$click=p,A.$$click=()=>a(u()==="primary"?"accent":"primary"),P(()=>he(f,`btn btn-${u()} text-${u()}-content`)),d}})}}),x(te,{get children(){return[x(M,{get when(){return c()==="lose"},get children(){return x(Le,{close:v})}}),x(M,{get when(){return c()==="win"},get children(){return x(je,{close:v})}}),x(M,{get when(){return c()==="draw"},get children(){return x(Pe,{close:v})}}),x(M,{get when(){return c()==="error"},get children(){return x(De,{close:v})}})]}})]}D(["click"]);const Fe=N('<main><h1 class="text-center text-5xl font-bold my-4">Connect 4</h1></main>');function Ue(){return(()=>{const e=Fe.cloneNode(!0);return e.firstChild,z(e,x(Ge,{}),null),e})()}_e(()=>x(Ue,{}),document.getElementById("root"));