!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("vue")):"function"==typeof define&&define.amd?define(["vue"],e):t.VueStorage=e(t.Vue)}(this,function(t){"use strict";var e=function(t){return"function"==typeof t},n=function(t){return function(){return t}},o=function(t){return null===t||void 0===t},r=new(t=t&&t.hasOwnProperty("default")?t.default:t)({data:function(){return{storage:{}}},created:function(){window.addEventListener("storage",this.storageEventListener)},beforeDestroy:function(){window.removeEventListener("storage",this.storageEventListener)},computed:{storageEventListener:function(){return this.onStorage.bind(this)}},methods:{onStorage:function(t){this.setItemToPrivateStorage(t.key,t.newValue)},getItem:function(t){return this.hasItemInPrivateStorage(t)||this.setItemToPrivateStorage(t,this.getItemFromLocalStorage(t)),this.getItemFromPrivateStorage(t)},setItem:function(t,e){this.setItemToLocalStorage(t,e),this.setItemToPrivateStorage(t,e)},hasItemInPrivateStorage:function(t){return function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}(this.storage,t)},getItemFromPrivateStorage:function(t){return this.storage[t]},getItemFromLocalStorage:function(t){return localStorage.getItem(t)},setItemToPrivateStorage:function(t,e){o(e)&&(e=null),Vue.set(this.storage,t,e)},setItemToLocalStorage:function(t,e){o(e)?localStorage.removeItem(t):localStorage.setItem(t,e)}}}),i={beforeCreate:function(){var t=this,i=this.$options.stored;i&&Object.entries(i).forEach(function(i){var a,s=i[0],u=i[1];a=e(u.key)?u.key.bind(t):n(o(u.key)?s:String(u.key));var f;f=e(u.default)?u.default.bind(t):n(u.default);var c,g;u.type===JSON?(c=JSON.parse.bind(JSON),g=JSON.stringify.bind(JSON)):function(t){return t&&"object"==typeof t}(u.type)&&e(u.type.parse)&&e(u.type.stringify)?(c=u.type.parse.bind(t),g=u.type.stringify.bind(t)):(c=String,g=String),t.$options.computed[s]={get:function(){var t=a(),e=r.getItem(t);return e=o(e)?f():c(e)},set:function(t){var e=a();o(t)||(t=g(t)),r.setItem(e,t)}}})},computed:{}},a={mixin:i,install:function(t){t.mixin(i)}};return"undefined"!=typeof window&&t.use(a),a});
