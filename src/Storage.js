import {ref} from '@vue/composition-api';

export default class {
	constructor(storage) {
		Object.assign(this, {
			_items: {},
			_storage: storage,
		});
	}
	getItem(key) {
		let {_items: items} = this;
		let item = items[key];
		if (!item) {
			let {_storage: storage} = this;
			let value = storage ? storage.getItem(key) : null;
			item = ref(value);
			items[key] = item;
		}
		let {value} = item;
		return value;
	}
	setItem(key, value) {
		let {_storage: storage} = this;
		if (storage) {
			storage.setItem(key, value);
		}
		this._setItem(key, value);
	}
	_setItem(key, value) {
		let {_items: items} = this;
		let item = items[key];
		if (item) {
			item.value = `${value}`;
		}
	}
	removeItem(key) {
		let {_storage: storage} = this;
		if (storage) {
			storage.removeItem(key);
		}
		this._removeItem(key);
	}
	_removeItem(key) {
		let {_items: items} = this;
		let item = items[key];
		if (item) {
			item.value = null;
		}
	}
	clear() {
		let {_storage: storage} = this;
		if (storage) {
			storage.clear();
		}
		this._clear();
	}
	_clear() {
		let {_items: items} = this;
		Object.values(items).forEach(item => {
			item.value = null;
		});
	}
}
