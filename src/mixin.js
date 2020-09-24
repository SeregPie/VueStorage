import Function_is from './@core/Function/is';
import Object_mapValues from './@core/Object/mapValues';

import stored from './stored';

export default {
	computed: {},
	beforeCreate() {
		let {$options} = this;
		let {
			computed: computedOptions,
			stored: storedOptions,
		} = $options;
		if (storedOptions) {
			Object.assign(
				computedOptions,
				Object_mapValues(storedOptions, (object, defaultKey) => {
					let {
						key = defaultKey,
						...options
					} = Object_mapValues(object, value =>
						Function_is(value)
							? value.bind(this)
							: value
					);
					let r = stored(key, options);
					return {
						get() {
							return r.value;
						},
						set(value) {
							r.value = value;
						},
					};
				}),
			);
		}
	},
};