(function(factory) {
	if (typeof module !== 'undefined' && typeof exports !== 'undefined' && this === exports) {
		module.exports = factory();
	} else {
		this.VueStorage = factory();
	}
}).call(this, function() {

	let optionKey = 'storage';

	let mixin = {
		data() {
			let data = {};
			if (this.$options[optionKey]) {
				let {type = 'local', keyPrefix = '', props = {}} = this.$options[optionKey];
				let storage = (type === 'session') ? sessionStorage : localStorage;
				let watch = {};
				for (let [name, options] of Object.entries(props)) {
					data[name] = storage.getItem(name);
					this.$watch(name, function(value) {
						storage.setItem(name, ''+value);
					}, {deep: true});
				}
			}
			return data;
		},

		created() {
			if (this.$options[name]) {
				let {type = 'local', prefix = '', props = {}} = this.$options[name];
				let storage = (type === 'session') ? sessionStorage : localStorage;
				for (let [name, options] of Object.entries(props)) {
					this.$watch(name, function(value) {
						storage.setItem(name, ''+value);
					}, {deep: true});
				}
			}
		},
	};

	let install = function(Vue) {
		Vue.mixin(mixin);
	};

	return {install};

});