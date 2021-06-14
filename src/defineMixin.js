import defaultOptionName from './defaultOptionName';
import defaultPrefix from './defaultPrefix';

import stored from './stored';

import isFunction from './utils/isFunction';
import mapValues from './utils/mapValues';
import toGetter from './utils/toGetter';

export default function({
	optionName = defaultOptionName,
	prefix = defaultPrefix,
} = {}) {
	return {
		computed: {},
		beforeCreate() {
			let {$options} = this;
			let {
				computed: computedProperties,
				[optionName]: storedProperties,
			} = $options;
			if (storedProperties) {
				Object.entries(storedProperties).forEach(([k, v]) => {
					let {
						key = k,
						...options
					} = mapValues(v, v => isFunction(v) ? v.bind(this) : v);
					let getKey = toGetter(key);
					let r = stored(() => `${prefix}${getKey()}`, options);
					computedProperties[k] = {
						get() {
							return r.value;
						},
						set(v) {
							r.value = v;
						},
					};
				});
			}
		},
	};
}
