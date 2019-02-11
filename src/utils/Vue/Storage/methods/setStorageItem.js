import Lang_isNil from '../../../Lang/isNil';

export default function(key, value) {
	let {storage} = this;
	if (storage) {
		if (Lang_isNil(value)) {
			storage.removeItem(key);
		} else {
			storage.setItem(key, value);
		}
	}
}
