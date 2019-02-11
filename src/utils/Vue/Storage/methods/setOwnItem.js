import Lang_isNil from '../../../Lang/isNil';

export default function(key, value) {
	if (Lang_isNil(value)) {
		value = null;
	}
	this.$set(this.items, key, value);
}
