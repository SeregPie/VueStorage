import Storage from './Storage';

export default (() => {
	let {window} = globalThis;
	if (window) {
		let {localStorage} = window;
		if (localStorage) {
			let that = new Storage(localStorage);
			window.addEventListener('storage', ({
				key,
				newValue,
			}) => {
				if (newValue == null) {
					that._removeItem(key);
				} else {
					that._setItem(key, newValue);
				}
			});
			return that;
		}
	}
	return new Storage(null);
})();
