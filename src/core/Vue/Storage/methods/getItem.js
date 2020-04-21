import Object_isNullish from '../../../Object/isNullish';

export default function(key) {
	let value = this.items[key];
	if (Object_isNullish(value)) {
		let {storage} = this;
		if (storage) {
			value = storage.getItem(key);
		}
	}
	return value;
}
