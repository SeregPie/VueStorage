import Object_hasOwn from 'x/src/Object/hasOwn';
import Lang_isNil from 'x/src/Lang/isNil';

export default {
	props: {
		ǂstorageType: {
			default: 'local',
		},
	},

	data() {
		return {
			ǂitems: {},
		};
	},

	computed: {
		ǂstorageEventListener() {
			return this.ǂonStorage.bind(this);
		},

		ǂstorage() {
			switch (this.ǂstorageType) {
				case 'local':
					return window.localStorage;
				case 'session':
					return window.sessionStorage;
			}
		},
	},

	created() {
		window.addEventListener('storage', this.ǂstorageEventListener);
	},

	beforeDestroy() {
		window.removeEventListener('storage', this.ǂstorageEventListener);
	},

	methods: {
		ǂonStorage(event) {
			this.ǂsetOwnItem(event.key, event.newValue);
		},

		ǂgetItem(key) {
			if (!this.ǂhasOwnItem(key)) {
				this.ǂsetOwnItem(key, this.ǂgetStorageItem(key));
			}
			return this.ǂgetOwnItem(key);
		},

		ǂsetItem(key, value) {
			this.ǂsetStorageItem(key, value);
			this.ǂsetOwnItem(key, value);
		},

		ǂhasOwnItem(key) {
			return Object_hasOwn(this.ǂitems, key);
		},

		ǂgetOwnItem(key) {
			return this.ǂitems[key];
		},

		ǂsetOwnItem(key, value) {
			if (Lang_isNil(value)) {
				value = null;
			}
			this.$set(this.ǂitems, key, value);
		},

		ǂgetStorageItem(key) {
			if (this.ǂstorage) {
				return this.ǂstorage.getItem(key);
			}
		},

		ǂsetStorageItem(key, value) {
			if (this.ǂstorage) {
				if (Lang_isNil(value)) {
					this.ǂstorage.removeItem(key);
				} else {
					this.ǂstorage.setItem(key, value);
				}
			}
		},
	},
};
