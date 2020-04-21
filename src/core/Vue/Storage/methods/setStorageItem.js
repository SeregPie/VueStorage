import Object_isNullish from '../../../Object/isNullish';

export default function(key, value) {
	let {storage} = this;
	if (storage) {
		if (Object_isNullish(value)) {
			storage.removeItem(key);
		} else {
			storage.setItem(key, value);
		}
	}
}
