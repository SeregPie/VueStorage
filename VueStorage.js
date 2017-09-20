(function(factory) {
	if (typeof module !== 'undefined' && typeof exports !== 'undefined' && this === exports) {
		module.exports = factory();
	} else {
		this.VueStorage = factory();
	}
}).call(this, function() {

	let Reflect_isNil = function(value) {
		return value === null || value === undefined;
	};

	let Object_isObject = function(value) {
		return value && typeof value === 'object';
	};

	let Object_hasOwn = function(object, key) {
		Object.prototype.hasOwnProperty.call(object, key);
	};

	let Function_isFunction = function(value) {
		return typeof value === 'function';
	};

	let Function_constant = function(value) {
		return function() {
			return value;
		};
	};

	let Function_stubNull = Function_constant(null);



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

	let parseArray = parseObject;

	let stringifyArray = stringifyObject;

	let storedDataTypeString = {
		parse: parseString,
		stringify: stringifyString,
	};

	let storedDataTypeNumber = {
		parse: parseNumber,
		stringify: stringifyNumber,
	};

	let storedDataTypeBoolean = {
		parse: parseBoolean,
		stringify: stringifyBoolean,
	};

	let storedDataTypeObject = {
		parse: parseObject,
		stringify: stringifyObject,
	};

	let storedDataTypeArray = {
		parse: parseArray,
		stringify: stringifyArray,
	};

	let defaultStoredDataType = storedDataTypeString;

	let normalizeStoredDataType = function(value) {
		if (Reflect_isNil(value)) {
			return defaultStoredDataType;
		}
		switch (value) {
			case String:
				return storedDataTypeString;
			case Number:
				return storedDataTypeNumber;
			case Boolean:
				return storedDataTypeBoolean;
			case Object:
				return storedDataTypeObject;
			case Array:
				return storedDataTypeArray;
		}
		if (Object_isObject(value)) {
			if (Function_isFunction(value.parse) && Function_isFunction(value.stringify)) {
				return {
					parse: value.parse,
					stringify: value.stringify,
				};
			}
		}
		return defaultStoredDataType;
	};

	let defaultStoredDataDefault = Function_stubNull;

	let normalizeStoredDataDefault = function(value) {
		if (Reflect_isNil(value)) {
			return defaultStoredDataDefault;
		}
		if (Function_isFunction(value)) {
			return value;
		}
		return Function_constant(value);
	};

	let normalizeStoredDataKey = function(value) {
		if (Reflect_isNil(value)) {
			return defaultStoredDataDefault;
		}
		if (Function_isFunction(value)) {
			return value;
		}
		return Function_constant(value);
	};


	let defaultStoredDataConfig = {
		type: defaultStoredDataType,
		default: defaultStoredDataDefault,
	};

	let normalizeStoredDataConfig = function(config, dataKey) {
		let defaultType = {

		};

		let defaultDefault = Function_stubNull;

		let defaultConfig = {
			type: defaultType,
			default: defaultDefault,
		};

		return function(config) {
			if (Reflect_isNil(config)) {
				return defaultStoredDataConfig;
			}
		};
	};

	let normalizeStoredData = function() {

	};


	let vueStorage = new Vue({
		data: {
			items: {},
		},
		methods: {
			getItem(key) {
				if (!Object_hasOwn(this.items, key)) {
					let value = localStorage.getItem(key);
					if (Reflect_isNil(value)) {
						value = null;
					}
					Vue.set(this.items, key, value);
				}
				return this.items[key];
			},

			_setItem(key, value) {
				if (Reflect_isNil(value)) {
					value = null;
				}
				Vue.set(this.items, key, value);
			},

			setItem(key, value) {
				if (Reflect_isNil(value)) {
					localStorage.removeItem(key);
				} else {
					localStorage.setItem(key, value);
				}
				this._setItem(key, value);
			},
		}
	});

	let optionKey = 'storage';


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

		beforeCreate() {
			let storedData = this.$options.storedData;
			if (storedData) {
				for (let [key, hander] of Object.entries(storedData)) {
					this.$watch(key, hander, {deep: true});
				}
			}
			if (this._data._storageWatch) {
				for (let [key, hander] of Object.entries(this._data._storageWatch)) {
					this.$watch(key, hander, {deep: true});
				}
			}
		},

		destroyed() {

		},

		computed: {
			storedValue: {
				get() {
					let value = globalValue;
					if (value === undefined) {
						value = parse(storage.load(key));
					}
				},
				set(value) {
					globalValue = value;
					value = stringify(value);
					storage.save(value);

				},
			},
		},
	};

	let install = function(Vue) {
		Vue.mixin(mixin);
	};

	return {install};

});