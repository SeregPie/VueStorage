import {isFunction} from '@vue/shared';

import stored from './stored';

export default {
	computed: {},
	beforeCreate() {
		let {$options} = this;
		let {
			computed: dddd,
			stored: eeee,
		} = $options;
		if (eeee) {
			Object.entries(eeee).forEach(([aaaa, bbbb]) => {
				bbbb = (() => {
					let result = {};
					Object.entries(bbbb).forEach(([key, value]) => {
						if (isFunction(value)) {
							value = value.bind(this);
						}
						result[key] = value;
					});
					return result;
				})();
				let {key = aaaa, ...options} = bbbb;
				let r = stored(key, options);
				dddd[aaaa] = {
					get() {
						return r.value;
					},
					set(value) {
						r.value = value;
					},
				};
			});
		}
	},
};