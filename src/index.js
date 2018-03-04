import Function_constant from 'x/src/Function/constant';
import Function_isFunction from 'x/src/Function/isFunction';
import Function_noop from 'x/src/Function/noop';
import Object_isObject from 'x/src/Object/isObject';
import Lang_isNil from 'x/src/Lang/isNil';

import ReactiveStorage from './ReactiveStorage';

let reactiveStorage;

let VueStorage = {
	install(Vue, {
		storageType = ReactiveStorage.props.ǂstorageType.default,
	} = {}) {
		if (!reactiveStorage) {
			reactiveStorage = new (Vue.extend(ReactiveStorage))({
				propsData: {
					ǂstorageType: storageType,
				},
			});
		}
		Vue.mixin(this);
	},

	computed: {},

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
					if (def.type === String) {
						// pass
					} else
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
						let value =  reactiveStorage.ǂgetItem(storageKey);
						if (Lang_isNil(value)) {
							value = getDefaultValue();
						} else {
							value = parseValue(value);
						}
						return value;
					},

					set(value) {
						let storageKey = getStorageKey();
						if (!Lang_isNil(value)) {
							value = stringifyValue(value);
						}
						reactiveStorage.ǂsetItem(storageKey, value);
					},
				};
			});
		}
	},
};

export default VueStorage;

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(VueStorage);
}
