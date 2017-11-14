import Object_hasOwn from '../helpers/Object/hasOwn';
import Reflect_isNil from '../helpers/Reflect/isNil';

export default {
	data() {
		return {
			storage: {},
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
	},

	methods: {
		onStorage(event) {
			this.setItemToPrivateStorage(event.key, event.newValue);
		},

		getItem(key) {
			if (!this.hasItemInPrivateStorage(key)) {
				this.setItemToPrivateStorage(key, this.getItemFromLocalStorage(key));
			}
			return this.getItemFromPrivateStorage(key);
		},

		setItem(key, value) {
			this.setItemToLocalStorage(key, value);
			this.setItemToPrivateStorage(key, value);
		},

		hasItemInPrivateStorage(key) {
			return Object_hasOwn(this.storage, key);
		},

		getItemFromPrivateStorage(key) {
			return this.storage[key];
		},

		getItemFromLocalStorage(key) {
			return localStorage.getItem(key);
		},

		setItemToPrivateStorage(key, value) {
			if (Reflect_isNil(value)) {
				value = null;
			}
			Vue.set(this.storage, key, value);
		},

		setItemToLocalStorage(key, value) {
			if (Reflect_isNil(value)) {
				localStorage.removeItem(key);
			} else {
				localStorage.setItem(key, value);
			}
		},
	},
};