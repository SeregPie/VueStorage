import Object_isNullish from '../../../Object/isNullish';

export default function(key, value) {
	let {items} = this;
	let item = items.get(key);
	if (item) {
		if (Object_isNullish(value)) {
			value = null;
		}
		Object.assign(item, {value});
	}
}
