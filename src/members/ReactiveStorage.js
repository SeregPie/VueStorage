import Object_hasOwn from '../helpers/Object/hasOwn';
import Reflect_isNil from '../helpers/Reflect/isNil';

export default {
	props: {
		storageType: {
			default: 'local',
		},
	},

	data() {
		return {
			items: {},
		};
	},

	created() {
		window.addEventListener('storage', this.storageEventListener);
	},

	beforeDestroy() {
		window.removeEventListener('storage', this.storageEventListener);
	},

	computed: {
		storageEventListener() {
			return this.onStorage.bind(this);
		},

		storage() {
			switch (this.storageType) {
				case 'local':
					return window.localStorage;
				case 'session':
					return window.sessionStorage;
			}
		},
	},

	methods: {
		onStorage(event) {
			this.setOwnItem(event.key, event.newValue);
		},

		getItem(key) {
			if (!this.hasOwnItem(key)) {
				this.setOwnItem(key, this.getStorageItem(key));
			}
			return this.getOwnItem(key);
		},

		setItem(key, value) {
			this.setStorageItem(key, value);
			this.setOwnItem(key, value);
		},

		hasOwnItem(key) {
			return Object_hasOwn(this.items, key);
		},

		getOwnItem(key) {
			return this.items[key];
		},

		setOwnItem(key, value) {
			if (Reflect_isNil(value)) {
				value = null;
			}
			Vue.set(this.items, key, value);
		},

		getStorageItem(key) {
			if (this.storage) {
				return this.storage.getItem(key);
			}
		},

		setStorageItem(key, value) {
			if (this.storage) {
				if (Reflect_isNil(value)) {
					this.storage.removeItem(key);
				} else {
					this.storage.setItem(key, value);
				}
			}
		},
	},
};