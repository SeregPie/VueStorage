import Object_isNullish from '../../../Object/isNullish';

export default function(key, value) {
	let {items} = this;
	this.$set(items, key, value);
	if (Object_isNullish(value)) {
		this.$delete(items, key);
	}
}
