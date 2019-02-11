export default function(key) {
	if (!this.hasOwnItem(key)) {
		this.setOwnItem(key, this.getStorageItem(key));
	}
	return this.getOwnItem(key);
}
