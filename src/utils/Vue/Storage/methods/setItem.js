export default function(key, value) {
	this.setStorageItem(key, value);
	this.setOwnItem(key, value);
}
