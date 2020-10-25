import {isFunction} from '@vue/shared';

import mapValues from './mapValues';
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
			computedProperties = {...computedProperties};
			Object.entries(storedProperties).forEach(([k, v]) => {
				let {
					key = k,
					...options
				} = mapValues(v, v => isFunction(v) ? v.bind(this) : v);
				let r = stored(key, options);
				computedProperties[k] = {
					get() {
						return r.value;
					},
					set(v) {
						r.value = v;
					},
				};
			});
			Object.assign($options, {
				computed: computedProperties,
			});
		}
	},
};
