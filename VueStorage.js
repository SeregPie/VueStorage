(function(factory) {
	if (typeof module !== 'undefined' && typeof exports !== 'undefined' && this === exports) {
		module.exports = factory();
	} else {
		this.VueStorage = factory();
	}
}).call(this, function() {

	let optionKey = 'storage';

	let parseString = function(value) {
		return ''+value;
	};

	let stringifyString = function(value) {
		return ''+value;
	};

	let parseNumber = function(value) {
		return Number.parseFloat(value);
	};

	let stringifyNumber = stringifyString;

	let parseBoolean = function(value) {
		return !!parseNumber(value);
	};

	let stringifyBoolean = function(value) {
		return stringifyNumber(value ? 1 : 0);
	};

	let parseObject = function(value) {
		return JSON.parse(value);
	};

	let stringifyObject = function(value) {
		return JSON.stringify(value);
	};

	let parseArray = function(value) {
		return JSON.parse(value);
	};

	let stringifyArray = stringifyObject;

	let mixin = {
		data() {
			let data = {};
			let storedData = this.$options.storedData;
			if (storedData) {
				let watch = {};
				for (let [key, v] of Object.entries(storedData)) {
					let type = prop.type;
					let defaultValue = prop.default;
					let value = localStorage.getItem(key);
					if (value === null) {
						value = defaultValue;
					} else {
						switch (type) {
							case Number: {
								value = parseFloat(value);
								break;
							}
							case Boolean: {
								value = !!parseInt(value);
								break;
							}
						}
					}
					data[key] = value;
					watch[key] = function(value) {
						switch (type) {
							case Number: {
								value = ''+value;
								break;
							}
							case Boolean: {
								value = ''+(value ? 1 : 0);
								break;
							}
						}
						localStorage.setItem(key, value);
					};
					console.log(data, watch);
				}
				data._storageWatch = watch;
			}
			return data;
		},

		created() {
			if (this._data._storageWatch) {
				for (let [key, hander] of Object.entries(this._data._storageWatch)) {
					this.$watch(key, hander, {deep: true});
				}
			}
		},
	};

	let install = function(Vue) {
		Vue.mixin(mixin);
	};

	return {install};

});