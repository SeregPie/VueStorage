import Vue from 'vue';

import Function_isFunction from './helpers/Function/isFunction';
import Function_constant from './helpers/Function/constant';
import Object_isObject from './helpers/Object/isObject';
import Reflect_isNil from './helpers/Reflect/isNil';

import ReactiveStorage from './members/ReactiveStorage';

let reactiveStorage = new Vue(ReactiveStorage);

let mixin = {
	beforeCreate() {
		let stored = this.$options.stored;
		if (stored) {
			Object.entries(stored).forEach(([key, def]) => {

				let getStorageKey;
				if (Function_isFunction(def.key)) {
					getStorageKey = def.key.bind(this);
				} else
				if (Reflect_isNil(def.key)) {
					getStorageKey = Function_constant(key);
				} else {
					getStorageKey = Function_constant(String(def.key));
				}

				let getDefaultValue;
				if (Function_isFunction(def.default)) {
					getDefaultValue = def.default.bind(this);
				} else {
					getDefaultValue = Function_constant(def.default);
				}

				let parseValue;
				let stringifyValue;
				if (def.type === JSON) {
					parseValue = JSON.parse.bind(JSON);
					stringifyValue = JSON.stringify.bind(JSON);
				} else
				if (Object_isObject(def.type) && Function_isFunction(def.type.parse) && Function_isFunction(def.type.stringify)) {
					parseValue = def.type.parse.bind(this);
					stringifyValue = def.type.stringify.bind(this);
				} else {
					parseValue = String;
					stringifyValue = String;
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

let install = function(Vue) {
	Vue.mixin(mixin);
};

let VueStorage = {mixin, install};

if (typeof window !== 'undefined') {
	Vue.use(VueStorage);
}

export default VueStorage;