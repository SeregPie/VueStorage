!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):t.VueStorage=n()}(this,function(){"use strict";function t(t){return function(){return t}}function n(t){return"function"==typeof t}function e(){}function i(t){return t&&"object"==typeof t}function o(t){return function(t){return void 0===t}(t)||function(t){return null===t}(t)}var r,u={props:{t:{default:"local"}},data:function(){return{n:{}}},computed:{e:function(){return this.i.bind(this)},o:function(){switch(this.t){case"local":return window.localStorage;case"session":return window.sessionStorage}}},created:function(){window.addEventListener("storage",this.e)},beforeDestroy:function(){window.removeEventListener("storage",this.e)},methods:{i:function(t){this.r(t.key,t.newValue)},u:function(t){return this.s(t)||this.r(t,this.f(t)),this.c(t)},a:function(t,n){this.h(t,n),this.r(t,n)},s:function(t){return function(t,n){return Object.prototype.hasOwnProperty.call(t,n)}(this.n,t)},c:function(t){return this.n[t]},r:function(t,n){o(n)&&(n=null),this.$set(this.n,t,n)},f:function(t){if(this.o)return this.o.getItem(t)},h:function(t,n){this.o&&(o(n)?this.o.removeItem(t):this.o.setItem(t,n))}}},s={install:function(t,n){void 0===n&&(n={});var e=n.storageType;void 0===e&&(e=u.props.t.default),r||(r=new(t.extend(u))({propsData:{t:e}})),t.mixin(this)},computed:{},beforeCreate:function(){var s=this,f=this.$options.stored;if(f){if(!r){var c=this.$root.constructor;r=new c(u)}Object.entries(f).forEach(function(u){var f=u[0],c=u[1],a=t(f),h=e,d=String,w=String;c===String||(c===JSON?(d=JSON.parse.bind(JSON),w=JSON.stringify.bind(JSON)):i(c)&&(a=n(c.key)?c.key.bind(s):t(String(c.key)),h=n(c.default)?c.default.bind(s):t(c.default),c.type===String||(c.type===JSON?(d=JSON.parse.bind(JSON),w=JSON.stringify.bind(JSON)):i(c.type)&&(n(c.type.parse)&&(d=c.type.parse.bind(s)),n(c.type.stringify)&&(w=c.type.stringify.bind(s)))))),s.$options.computed[f]={get:function(){var t=a(),n=r.u(t);return n=o(n)?h():d(n)},set:function(t){var n=a();o(t)||(t=w(t)),r.a(n,t)}}})}}};return"undefined"!=typeof window&&window.Vue&&window.Vue.use(s),s});
