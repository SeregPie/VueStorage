!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("vue-demi")):"function"==typeof define&&define.amd?define(["exports","vue-demi"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).VueStorage={},e.VueDemi)}(this,(function(e,t){"use strict";class r{constructor(e,t){this._storage=e,this._effects=t}getItem(e){let t=this._storage.getItem(e);return this._effects.track(e),t}setItem(e,t){let r=this._storage,i=r.getItem(e);if(r.setItem(e,t),i!==r.getItem(e)){this._effects.trigger(e)}}removeItem(e){let t=this._storage,r=t.getItem(e);if(t.removeItem(e),null!==r){this._effects.trigger(e)}}clear(){let e=this._effects,t=e.getKeys().filter((()=>null!==storage.getItem(key)));storage.clear(),t.forEach((t=>{e.trigger(t)}))}}function i(){return Object.create(null)}function n(){let e=i();return{track(r){let n=e[r];n||(n=function(){let e=t.shallowRef();return{track(){e.value},trigger(){e.value=i()}}}(),e[r]=n),n.track()},trigger(t){let r=e[t];r&&r.trigger()},getKeys:()=>Object.keys(e)}}class s{constructor(){this.clear()}getItem(e){return this._items[e]??null}setItem(e,t){this._items[e]=`${t}`}removeItem(e){delete this._items[e]}clear(){this._items=i()}}let o=n();var l=new r((()=>{let{window:e}=globalThis;if(e){let{localStorage:t}=e;if(t)return e.addEventListener("storage",(({key:e})=>{o.trigger(e)})),t}return new s})(),o);let u=n();var a=new r((()=>{let{window:e}=globalThis;if(e){let{sessionStorage:t}=e;if(localStorage)return t}return new s})(),u),f={parse:e=>Boolean(JSON.parse(e)),stringify:e=>String(Boolean(e))},c={parse:e=>Number(JSON.parse(e)),stringify:e=>String(Number(e))},g={parse:String,stringify:String};function m(e){return"function"==typeof e}function d(e){return m(e)?e:t.isRef(e)?()=>e.value:()=>e}function p(e,{default:r=null,session:i=!1,type:n=JSON}={}){let s=d(e),o=d(r),u=d(i),m=()=>u()?a:l,{parse:p,stringify:h}=(e=>{switch(e){case Boolean:return f;case Number:return c;case String:return g}return e})(n);return t.computed({get(){let e=m(),t=s(),r=e.getItem(t);return r=null==r?o():p(r),r},set(e){let t=m(),r=s();null==e?t.removeItem(r):(e=h(e),t.setItem(r,e))}})}function h(e,t){return{...e,...t}}function v(e,{optionName:t="stored",prefix:r}={}){e.config.optionMergeStrategies[t]=h,e.mixin(function({optionName:e="stored",prefix:t=""}={}){return{computed:{},beforeCreate(){let{$options:r}=this,i=r[e];void 0!==i&&function(e){if(e){let t=typeof e;return"object"===t||"function"===t}return!1}(i)&&Object.entries(i).forEach((([e,i])=>{let{key:n=e,...s}=(()=>{let e={...i};return["default","key","session"].forEach((t=>{let r=e[t];m(r)&&(r=r.bind(this),e[t]=r)})),e})(),o=d(n),l=p((()=>`${t}${o()}`),s);r.computed[e]={get:()=>l.value,set(e){l.value=e}}}))}}}({optionName:t,prefix:r}))}let y={install:v};var b,I;t.isVue2&&(null===(b=globalThis.window)||void 0===b||null===(I=b.Vue)||void 0===I||I.use(y));e.default=y,e.install=v,e.localStorage=l,e.sessionStorage=a,e.stored=p,Object.defineProperty(e,"__esModule",{value:!0})}));
