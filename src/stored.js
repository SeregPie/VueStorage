import {
	computed,
	isRef,
} from 'vue-demi';
import {isFunction} from '@vue/shared';

import localStorage from './localStorage';
import sessionStorage from './sessionStorage';
import typeBoolean from './types/Boolean';
import typeNumber from './types/Number';
import typeString from './types/String';

export default function(key, {
	default: defaultValue = null,
	session = false,
	type = JSON,
} = {}) {
	let toGetter = (value => {
		if (isFunction(value)) {
			return value;
		}
		if (isRef(value)) {
			return (() => value.value);
		}
		return (() => value);
	});
	let getKey = toGetter(key);
	let getDefaultValue = toGetter(defaultValue);
	let getSession = toGetter(session);
	let getStorage = (() => getSession() ? sessionStorage : localStorage);
	let {
		parse,
		stringify,
	} = (value => {
		switch (value) {
			case Boolean:
				return typeBoolean;
			case Number:
				return typeNumber;
			case String:
				return typeString;
		}
		return value;
	})(type);
	return computed({
		get() {
			let storage = getStorage();
			let key = getKey();
			let value = storage.getItem(key);
			if (value == null) {
				value = getDefaultValue();
			} else {
				value = parse(value);
			}
			return value;
		},
		set(value) {
			let storage = getStorage();
			let key = getKey();
			if (value == null) {
				storage.removeItem(key);
			} else {
				value = stringify(value);
				storage.setItem(key, value);
			}
		},
	});
}
