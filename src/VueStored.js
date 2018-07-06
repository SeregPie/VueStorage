import Function_constant from '/utils/Function/constant';
import Function_isFunction from '/utils/Function/isFunction';
import Function_noop from '/utils/Function/noop';
import Lang_isNil from '/utils/Lang/isNil';
import Object_isObject from '/utils/Object/isObject';
import VueStorage from '/utils/Vue/Storage';

let storage;

export default {
	install(Vue, {
		storageType = VueStorage.props.ǂstorageType.default,
	} = {}) {
		Object.assign(Vue.config.optionMergeStrategies, {
			stored(toVal, fromVal) {
				return {...fromVal, ...toVal};
			},
		});
		storage = new (Vue.extend(VueStorage))({
			propsData: {
				ǂstorageType: storageType,
			},
		});
		Vue.mixin(this);
	},

	computed: {},

	beforeCreate() {
		let {$options} = this;
		let {
			computed,
			stored,
		} = $options;
		if (stored) {
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
				computed[key] = {
					get() {
						let storageKey = getStorageKey();
						let value =  storage.ǂgetItem(storageKey);
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
						storage.ǂsetItem(storageKey, value);
					},
				};
			});
		}
	},
};
