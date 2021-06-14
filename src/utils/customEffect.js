import {shallowRef} from 'vue-demi';

import createObject from './createObject';

export default function() {
	let ref = shallowRef();
	return {
		track() {
			ref.value;
		},
		trigger() {
			ref.value = createObject();
		},
	};
}
