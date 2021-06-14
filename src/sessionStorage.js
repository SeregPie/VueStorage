import createStorage from './createStorage';

export default (() => {
	let {window} = globalThis;
	if (window) {
		let {sessionStorage} = window;
		if (sessionStorage) {
			return createStorage(sessionStorage);
		}
	}
	return createStorage();
})();
