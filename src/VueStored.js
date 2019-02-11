import Function_cast from './utils/Function/cast';
import Function_constant from './utils/Function/constant';
import Function_identity from './utils/Function/identity';
import Function_isFunction from './utils/Function/isFunction';
import Function_noop from './utils/Function/noop';
import Lang_isNil from './utils/Lang/isNil';
import Lang_isUndefined from './utils/Lang/isUndefined';
import Object_isObject from './utils/Object/isObject';
import VueLocalStorage from './utils/Vue/LocalStorage';
import VueSessionStorage from './utils/Vue/SessionStorage';

export default {
	install(Vue) {
		Object.assign(Vue.config.optionMergeStrategies, {
			stored(parent, child) {
				return {...parent, ...child};
			},
		});
		this.$localStorage = new Vue(VueLocalStorage);
		this.$sessionStorage = new Vue(VueSessionStorage);
		Vue.mixin(this);
	},

	computed: {},

	beforeCreate() {
		let {$options} = this;
		let {
			$localStorage,
			$sessionStorage,
			computed,
			stored,
		} = $options;
		if (stored) {
			Object.entries(stored).forEach(([key, def]) => {
				let getKey = Function_constant(key);
				let getDefaultValue = Function_noop;
				let parseValue = Function_identity;
				let stringifyValue = Function_identity;
				let getSession = Function_noop;
				if (def === String) {
					// pass
				} else
				if (def === JSON) {
					parseValue = JSON.parse;
					stringifyValue = JSON.stringify;
				} else
				if (Object_isObject(def)) {
					if (!Lang_isUndefined(def.key)) {
						getKey = Function_cast(def.key);
					}
					if (def.type === String) {
						// pass
					} else
					if (def.type === JSON) {
						parseValue = JSON.parse;
						stringifyValue = JSON.stringify;
					} else
					if (Object_isObject(def.type)) {
						if (Function_isFunction(def.type.parse)) {
							parseValue = def.type.parse;
						}
						if (Function_isFunction(def.type.stringify)) {
							stringifyValue = def.type.stringify;
						}
					}
					if (!Lang_isUndefined(def.default)) {
						getDefaultValue = Function_cast(def.default);
					}
					if (!Lang_isUndefined(def.session)) {
						getSession = Function_cast(def.session);
					}
				}
				let getStorage = function() {
					return getSession.call(this) ? $sessionStorage : $localStorage;
				};
				computed[key] = {
					get() {
						let key = getKey.call(this);
						let storage = getStorage.call(this);
						let value =  storage.getItem(key);
						if (Lang_isNil(value)) {
							value = getDefaultValue.call(this);
						} else {
							value = parseValue.call(this, value);
						}
						return value;
					},
					set(value) {
						let key = getKey.call(this);
						let storage = getStorage.call(this);
						value = stringifyValue.call(this, value);
						storage.setItem(key, value);
					},
				};
			});
		}
	},
};
