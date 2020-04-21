import Vue from 'vue';

export default function(key) {
	let {items} = this;
	let item = items.get(key);
	if (!item) {
		let {storage} = this;
		let value = storage ? storage.getItem(key) : null;
		item = Vue.observable({value});
		items.set(key, item);
	}
	let {value} = item;
	return value;
}
