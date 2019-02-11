import Lang_isNil from '../../../Lang/isNil';

export default function(key, value) {
	if (this.storage) {
		if (Lang_isNil(value)) {
			this.storage.removeItem(key);
		} else {
			this.storage.setItem(key, value);
		}
	}
}
