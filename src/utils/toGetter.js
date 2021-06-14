import {isRef} from 'vue-demi';

import isFunction from './isFunction';

export default function(value) {
	if (isFunction(value)) {
		return value;
	}
	if (isRef(value)) {
		return (() => value.value);
	}
	return (() => value);
}
