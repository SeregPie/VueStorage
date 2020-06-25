import {
	computed,
	isRef,
	ref,
} from '@vue/composition-api';
import {
	EMPTY_OBJ,
	isFunction,
} from '@vue/shared';

import localStorage from './localStorage';
import sessionStorage from './sessionStorage';
import typeBoolean from './types/Boolean';
import typeNumber from './types/Number';
import typeString from './types/String';

export default function(key, {
	default: defaultValue = null,
	session = false,
	type = JSON,
} = EMPTY_OBJ) {
	let toRef = (value => {
		if (isRef(value)) {
			return value;
		}
		if (isFunction(value)) {
			return computed(value);
		}
		return ref(value);
	});
	let keyRef = toRef(key);
	let defaultValueRef = toRef(defaultValue);
	let sessionRef = toRef(session);
	let storageRef = computed(() => {
		let session = sessionRef.value;
		return session ? sessionStorage : localStorage;
	});
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
			let storage = storageRef.value;
			let key = keyRef.value;
			let value = storage.getItem(key);
			if (value == null) {
				let defaultValue = defaultValueRef.value;
				value = defaultValue;
			} else {
				value = parse(value);
			}
			return value;
		},
		set(value) {
			let storage = storageRef.value;
			let key = keyRef.value;
			if (value == null) {
				storage.removeItem(key);
			} else {
				value = stringify(value);
				storage.setItem(key, value);
			}
		},
	});
}
