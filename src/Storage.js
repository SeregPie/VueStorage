import {ref} from '@vue/composition-api';

export default class {
	constructor(target) {
		Object.assign(this, {
			_items: {},
			_target: target,
		});
	}
	getItem(key) {
		let {_items: items} = this;
		let item = items[key];
		if (!item) {
			let {_target: target} = this;
			let value = target ? target.getItem(key) : null;
			item = ref(value);
			items[key] = item;
		}
		let {value} = item;
		return value;
	}
	setItem(key, value) {
		let {_target: target} = this;
		if (target) {
			target.setItem(key, value);
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
		let {_target: target} = this;
		if (target) {
			target.removeItem(key);
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
		let {_target: target} = this;
		if (target) {
			target.clear();
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
