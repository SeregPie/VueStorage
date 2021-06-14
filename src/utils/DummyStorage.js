import createObject from './createObject';

export default class {
	constructor() {
		this.clear();
	}
	getItem(key) {
		return this._items[key] ?? null;
	}
	setItem(key, value) {
		this._items[key] = `${value}`;
	}
	removeItem(key) {
		delete this._items[key];
	}
	clear() {
		this._items = createObject();
	}
}
