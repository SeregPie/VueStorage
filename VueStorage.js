(function(factory) {
	if (typeof module !== 'undefined' && typeof exports !== 'undefined' && this === exports) {
		module.exports = factory(require('vue'));
	} else {
		this.VueStorage = factory(this.Vue);
	}
}).call(this, function(Vue) {

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



	let _getStorageKey = function(def, key) {
		let returns;
		if (Function_isFunction(def.key)) {
			returns = def.key.call(this);
		}
		if (Reflect_isNil(returns)) {
			returns = key;
		}
		// keyPrefix
		return returns;
	};



	let _getDefaultValue = function(def) {
		if (Function_isFunction(def.default)) {
			return def.default.call(this);
		}
	};



	let _parseString = function(value) {
		return ''+value;
	};

	let _stringifyString = function(value) {
		return ''+value;
	};

	let _parseNumber = function(value) {
		return Number.parseFloat(value);
	};

	let _stringifyNumber = _stringifyString;

	let _parseBoolean = function(value) {
		return !!_parseNumber(value);
	};

	let _stringifyBoolean = function(value) {
		return _stringifyNumber(value ? 1 : 0);
	};

	let _parseObject = function(value) {
		return JSON.parse(value);
	};

	let _stringifyObject = function(value) {
		return JSON.stringify(value);
	};

	let _parseArray = _parseObject;

	let _stringifyArray = _stringifyObject;

	let _parseValue = function(def, value) {
		switch (def.type) {
			case String:
				return _parseString(value);
			case Number:
				return _parseNumber(value);
			case Boolean:
				return _parseBoolean(value);
			case Object:
				return _parseObject(value);
			case Array:
				return _parseArray(value);
		}
		if (Object_isObject(def.type) && Function_isFunction(def.type.parse)) {
			return def.type.parse.call(this, value);
		}
		return _parseString(value);
	};

	let _stringifyValue = function(def, value) {
		switch (def.type) {
			case String:
				return _stringifyString(value);
			case Number:
				return _stringifyNumber(value);
			case Boolean:
				return _stringifyBoolean(value);
			case Object:
				return _stringifyObject(value);
			case Array:
				return _stringifyArray(value);
		}
		if (Object_isObject(def.type) && Function_isFunction(def.type.stringify)) {
			return def.type.stringify.call(this, value);
		}
		return _stringifyString(value);
	};



	let _reactiveStorage = new Vue({
		data: {
			items: {},
		},

		created() {
			window.addEventListener('storage', this.StorageEventListener);
		},

		destroyed() {
			window.removeEventListener('storage', this.StorageEventListener);
		},

		computed: {
			StorageEventListener() {
				return this.onStorage.bind(this);
			},
		},

		methods: {
			onStorage(event) {
				this.swssvicz(event.key, event.newValue);
			},

			getItem(key) {
				if (!this.deudvorv(key)) {
					this.jnfqybxp(key);
				}
				return this.cvsigybq(key);
			},

			setItem(key, value) {
				this.hgegcsjt(key, value);
				this.swssvicz(key, value);
			},

			deudvorv(key) {
				return Object_hasOwn(this.items, key);
			},

			cvsigybq(key) {
				return this.items[key];
			},

			jnfqybxp(key) {
				let value = localStorage.getItem(key);
				this.swssvicz(key, value);
			},

			swssvicz(key, value) {
				if (Reflect_isNil(value)) {
					value = null;
				}
				Vue.set(this.items, key, value);
			},

			hgegcsjt(key, value) {
				if (Reflect_isNil(value)) {
					value = null;
					localStorage.removeItem(key);
				} else {
					localStorage.setItem(key, value);
				}
			},
		}
	});

	let _getStoredProperty = function(def, key) {
		let storageKey = _getStorageKey.call(this, def, key);
		let value =  _reactiveStorage.getItem(storageKey);
		if (Reflect_isNil(value)) {
			value = _getDefaultValue.call(this, def);
		} else {
			value = _parseValue.call(this, def, value);
		}
		return value;
	};

	let _setStoredProperty = function(def, key, value) {
		let storageKey = _getStorageKey.call(this, def, key);
		if (!Reflect_isNil(value)) {
			value = _stringifyValue.call(this, def, value);
		}
		_reactiveStorage.setItem(storageKey, value);
	};



	let mixin = {
		beforeCreate() {
			let stored = this.$options.stored;
			if (stored) {
				for (let [key, def] of Object.entries(stored)) {
					Object.assign(this.$options.computed, {
						[key]: {
							get(...args) {
								return _getStoredProperty.call(this, def, key, ...args);
							},

							set(...args) {
								return _setStoredProperty.call(this, def, key, ...args);
							},
						},
					});
				}
			}
		},

		computed: {},
	};

	let install = function(Vue) {
		Vue.mixin(mixin);
	};

	return {install};

});
