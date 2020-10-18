import {isFunction} from '@vue/shared';

import mapValues from './mapValues';
import stored from './stored';

export default {
	computed: {},
	beforeCreate() {
		let {
			computed: computedProperties,
			stored: storedProperties,
		} = this.$options;
		if (storedProperties) {
			Object.assign(computedProperties, mapValues(storedProperties, (v, k) => {
				let {
					key = k,
					...options
				} = mapValues(v, v => isFunction(v) ? v.bind(this) : v);
				let r = stored(key, options);
				return {
					get() {
						return r.value;
					},
					set(v) {
						r.value = v;
					},
				};
			}));
		}
	},
};