import Lang_isNil from '../../../Lang/isNil';

export default function(key, value) {
	let {items} = this;
	if (Lang_isNil(value)) {
		this.$delete(items, key);
	} else {
		this.$set(items, key, value);
	}
}
