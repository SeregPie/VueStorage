import {isRef} from 'vue-demi';
import {isFunction} from '@vue/shared';

export default function(value) {
	if (isFunction(value)) {
		return value;
	}
	if (isRef(value)) {
		return (() => value.value);
	}
	return (() => value);
}
