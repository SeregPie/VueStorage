import Object_hasOwn from '../helpers/Object/hasOwn';
import Reflect_isNil from '../helpers/Reflect/isNil';

export default {
	data: {
		ownStorage: {},
	},

	created() {
		window.addEventListener('storage', this.storageEventListener);
	},

	destroyed() {
		window.removeEventListener('storage', this.storageEventListener);
	},

	computed: {
		storageEventListener() {
			return this.onStorage.bind(this);
		},
	},

	methods: {
		onStorage(event) {
			this.setItemToOwnStorage(event.key, event.newValue);
		},

		getItem(key) {
			if (!this.hasItemInOwnStorage(key)) {
				this.setItemToOwnStorage(key, this.getItemFromLocalStorage(key));
			}
			return this.getItemFromOwnStorage(key);
		},

		setItem(key, value) {
			this.setItemToLocalStorage(key, value);
			this.setItemToOwnStorage(key, value);
		},

		hasItemInOwnStorage(key) {
			return Object_hasOwn(this.ownStorage, key);
		},

		getItemFromOwnStorage(key) {
			return this.ownStorage[key];
		},

		getItemFromLocalStorage(key) {
			return localStorage.getItem(key);
		},

		setItemToOwnStorage(key, value) {
			if (Reflect_isNil(value)) {
				value = null;
			}
			Vue.set(this.ownStorage, key, value);
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