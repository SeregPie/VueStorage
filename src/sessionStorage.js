import StorageWrapper from './StorageWrapper';

import customEffects from './utils/customEffects';
import DummyStorage from './utils/DummyStorage';

let effects = customEffects();

let storage = (() => {
	let {window} = globalThis;
	if (window) {
		let {sessionStorage} = window;
		if (localStorage) {
			return sessionStorage;
		}
	}
	return new DummyStorage();
})();

export default new StorageWrapper(storage, effects);
