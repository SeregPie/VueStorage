export default class {
	constructor(storage, effects) {
		this._storage = storage;
		this._effects = effects;
	}
	getItem(key) {
		let storage = this._storage;
		let value = storage.getItem(key);
		let effects = this._effects;
		effects.track(key);
		return value;
	}
	setItem(key, value) {
		let storage = this._storage;
		let oldValue = storage.getItem(key);
		storage.setItem(key, value);
		let newValue = storage.getItem(key);
		if (oldValue !== newValue) {
			let effects = this._effects;
			effects.trigger(key);
		}
	}
	removeItem(key) {
		let storage = this._storage;
		let oldValue = storage.getItem(key);
		storage.removeItem(key);
		if (oldValue !== null) {
			let effects = this._effects;
			effects.trigger(key);
		}
	}
	clear() {
		let effects = this._effects;
		let keys = (effects
			.getKeys()
			.filter(() => {
				let oldValue = storage.getItem(key);
				return oldValue !== null;
			})
		);
		storage.clear();
		keys.forEach(key => {
			effects.trigger(key);
		});
	}
}
