import Object_hasOwn from '../../../Object/hasOwn';

export default function(key) {
	return Object_hasOwn(this.items, key);
}
