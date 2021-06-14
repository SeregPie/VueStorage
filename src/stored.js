import {computed} from 'vue-demi';

import localStorage from './localStorage';
import sessionStorage from './sessionStorage';

import typeBoolean from './types/Boolean';
import typeNumber from './types/Number';
import typeString from './types/String';

import toGetter from './utils/toGetter';

export default function(key, {
	default: defaultValue = null,
	session = false,
	type = JSON,
} = {}) {
	let getKey = toGetter(key);
	let getDefaultValue = toGetter(defaultValue);
	let getSession = toGetter(session);
	let getStorage = (() => getSession() ? sessionStorage : localStorage);
	let {
		parse,
		stringify,
	} = (v => {
		switch (v) {
			case Boolean:
				return typeBoolean;
			case Number:
				return typeNumber;
			case String:
				return typeString;
		}
		return v;
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
