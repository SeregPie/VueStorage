import Function_constant from './helpers/Function/constant';
import Function_isFunction from './helpers/Function/isFunction';
import Function_noop from './helpers/Function/noop';
import Object_isObject from './helpers/Object/isObject';
import Reflect_isNil from './helpers/Reflect/isNil';

import ReactiveStorage from './members/ReactiveStorage';

let reactiveStorage;

let VueStorage = {
	install(Vue, {
		storageType = ReactiveStorage.props.storageType.default,
	} = {}) {
		if (!reactiveStorage) {
			reactiveStorage = new (Vue.extend(ReactiveStorage))({propsData: {storageType}});
		}
		Vue.mixin(this);
	},

	beforeCreate() {
		let stored = this.$options.stored;
		if (stored) {
			/*
			???
			if (!reactiveStorage) {
				let Vue = this._Vue;
				reactiveStorage = new Vue(ReactiveStorage);
			}
			*/
			Object.entries(stored).forEach(([key, def]) => {
				let getStorageKey = Function_constant(key);
				let getDefaultValue = Function_noop;
				let parseValue = String;
				let stringifyValue = String;
				if (def === String) {
					// pass
				} else
				if (def === JSON) {
					parseValue = JSON.parse.bind(JSON);
					stringifyValue = JSON.stringify.bind(JSON);
				} else
				if (Object_isObject(def)) {
					if (Function_isFunction(def.key)) {
						getStorageKey = def.key.bind(this);
					} else {
						getStorageKey = Function_constant(String(def.key));
					}
					if (Function_isFunction(def.default)) {
						getDefaultValue = def.default.bind(this);
					} else {
						getDefaultValue = Function_constant(def.default);
					}
					if (def.type === JSON) {
						parseValue = JSON.parse.bind(JSON);
						stringifyValue = JSON.stringify.bind(JSON);
					} else
					if (Object_isObject(def.type)) {
						if (Function_isFunction(def.type.parse)) {
							parseValue = def.type.parse.bind(this);
						}
						if (Function_isFunction(def.type.stringify)) {
							stringifyValue = def.type.stringify.bind(this);
						}
					}
				}
				this.$options.computed[key] = {
					get() {
						let storageKey = getStorageKey();
						let value =  reactiveStorage.getItem(storageKey);
						if (Reflect_isNil(value)) {
							value = getDefaultValue();
						} else {
							value = parseValue(value);
						}
						return value;
					},

					set(value) {
						let storageKey = getStorageKey();
						if (!Reflect_isNil(value)) {
							value = stringifyValue(value);
						}
						reactiveStorage.setItem(storageKey, value);
					},
				};
			});
		}
	},

	computed: {},
};

export default VueStorage;

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(VueStorage);
}