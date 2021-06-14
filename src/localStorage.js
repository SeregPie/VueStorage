import createStorage from './createStorage';

export default (() => {
	let {window} = globalThis;
	if (window) {
		let {localStorage} = window;
		if (localStorage) {
			let storage = createStorage(localStorage);
			window.addEventListener('storage', ({key}) => {
				storage.triggerItem(key);
			});
			return storage;
		}
	}
	return createStorage();
})();
