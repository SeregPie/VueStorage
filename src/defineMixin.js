import defaultOptionName from './defaultOptionName';
import defaultPrefix from './defaultPrefix';
import stored from './stored';

import isFunction from './utils/isFunction';
import isObject from './utils/isObject';
import toGetter from './utils/toGetter';

export default function({
	optionName = defaultOptionName,
	prefix = defaultPrefix,
} = {}) {
	return {
		computed: {},
		beforeCreate() {
			let {$options} = this;
			let v = $options[optionName];
			if (v !== undefined) {
				if (isObject(v)) {
					Object.entries(v).forEach(([k, v]) => {
						let {key = k, ...options} = (() => {
							let result = {...v};
							[
								'default',
								'key',
								'session',
							].forEach(k => {
								let v = result[k];
								if (isFunction(v)) {
									v = v.bind(this);
									result[k] = v;
								}
							});
							return result;
						})();
						let getKey = toGetter(key);
						let r = stored(() => `${prefix}${getKey()}`, options);
						$options.computed[k] = {
							get() {
								return r.value;
							},
							set(v) {
								r.value = v;
							},
						};
					});
				} else {
					// warn
				}
			}
		},
	};
}
