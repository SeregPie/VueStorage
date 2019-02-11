export default function(key) {
	if (this.storage) {
		return this.storage.getItem(key);
	}
}
