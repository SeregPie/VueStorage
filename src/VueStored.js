import Function_cast from './core/Function/cast';
import Function_constant from './core/Function/constant';
import Function_identity from './core/Function/identity';
import Function_is from './core/Function/is';
import Function_noop from './core/Function/noop';
import Object_is from './core/Object/is';
import Object_isNullish from './core/Object/isNullish';
import Object_isUndefined from './core/Object/isUndefined';
import VueLocalStorage from './core/Vue/LocalStorage';
import VueSessionStorage from './core/Vue/SessionStorage';

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
				if (Object_is(def)) {
					if (!Object_isUndefined(def.key)) {
						getKey = Function_cast(def.key);
					}
					if (def.type === String) {
						// pass
					} else
					if (def.type === JSON) {
						parseValue = JSON.parse;
						stringifyValue = JSON.stringify;
					} else
					if (Object_is(def.type)) {
						if (Function_is(def.type.parse)) {
							parseValue = def.type.parse;
						}
						if (Function_is(def.type.stringify)) {
							stringifyValue = def.type.stringify;
						}
					}
					if (!Object_isUndefined(def.default)) {
						getDefaultValue = Function_cast(def.default);
					}
					if (!Object_isUndefined(def.session)) {
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
						if (Object_isNullish(value)) {
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
