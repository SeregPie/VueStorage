export default function() {
	switch (this.storageType) {
		case 'local':
			return window.localStorage;
		case 'session':
			return window.sessionStorage;
	}
}
