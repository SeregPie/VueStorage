import StorageWrapper from './StorageWrapper';

import customEffects from './utils/customEffects';
import DummyStorage from './utils/DummyStorage';

let effects = customEffects();

let storage = (() => {
	let {window} = globalThis;
	if (window) {
		let {localStorage} = window;
		if (localStorage) {
			window.addEventListener('storage', ({key}) => {
				effects.trigger(key);
			});
			return localStorage;
		}
	}
	return new DummyStorage();
})();

export default new StorageWrapper(storage, effects);
