import Lang_isNil from '../../../Lang/isNil';

export default function(key) {
	let value = this.items[key];
	if (Lang_isNil(value)) {
		let {storage} = this;
		if (storage) {
			value = storage.getItem(key);
		}
	}
	return value;
}
