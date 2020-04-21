export default function() {
	if (typeof window !== 'undefined') {
		window.removeEventListener('storage', this.storageEventListener);
	}
}
