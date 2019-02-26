import Lang_isNil from '../../../Lang/isNil';

export default function(key, value) {
	let {items} = this;
	this.$set(items, key, value);
	if (Lang_isNil(value)) {
		this.$delete(items, key);
	}
}
