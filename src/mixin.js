import {isFunction} from '@vue/shared';

import stored from './stored';

export default {
	computed: {},
	beforeCreate() {
		let {$options} = this;
		let {
			computed: computedProperties,
			stored: storedProperties,
		} = $options;
		if (storedProperties) {
			let toComputedProperty = ((value, defaultKey) => {
				let {
					key = defaultKey,
					...options
				} = Object.entries(value).reduce((object, [key, value]) => {
					if (isFunction(value)) {
						value = value.bind(this);
					}
					object[key] = value;
					return object;
				}, {});
				let r = stored(key, options);
				return {
					get() {
						return r.value;
					},
					set(value) {
						r.value = value;
					},
				};
			});
			Object.entries(storedProperties).forEach(([key, value]) => {
				computedProperties[key] = toComputedProperty(value, key);
			});
		}
	},
};