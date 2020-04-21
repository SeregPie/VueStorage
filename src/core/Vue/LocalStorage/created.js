export default function() {
	if (typeof window !== 'undefined') {
		window.addEventListener('storage', this.storageEventListener);
	}
}
