import {shallowRef} from 'vue-demi';

import createObject from './utils/createObject';
import DummyStorage from './utils/DummyStorage';

export default function(storage = new DummyStorage()) {
	let refs = createObject();
	let getKeys = (() => Object.keys(refs));
	let trackItem = (key => {
		let ref = refs[key];
		if (ref) {
			// pass
		} else {
			ref = shallowRef();
			refs[key] = ref;
		}
		ref.value;
	});
	let triggerItem = (key => {
		let ref = refs[key];
		if (ref) {
			ref.value = createObject();
		} else {
			// pass
		}
	});
	return {
		trackItem,
		triggerItem,
		getItem(key) {
			let value = storage.getItem(key);
			trackItem(key);
			return value;
		},
		setItem(key, value) {
			let oldValue = storage.getItem(key);
			storage.setItem(key, value);
			let newValue = storage.getItem(key);
			if (oldValue !== newValue) {
				triggerItem(key);
			}
		},
		removeItem(key) {
			let oldValue = storage.getItem(key);
			storage.removeItem(key);
			if (oldValue !== null) {
				triggerItem(key);
			}
		},
		clear() {
			let keys = getKeys().filter(() => {
				let oldValue = storage.getItem(key);
				return oldValue !== null;
			});
			storage.clear();
			keys.forEach(key => {
				triggerItem(key);
			});
		},
	};
}
