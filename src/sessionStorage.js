import Storage from './Storage';

export default (() => {
	let {window} = globalThis;
	if (window) {
		let {sessionStorage} = window;
		if (sessionStorage) {
			return new Storage(sessionStorage);
		}
	}
	return new Storage();
})();
