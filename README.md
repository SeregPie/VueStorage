# VueStorage

## usage

```js

{
	storedData: {
		colorPalette: {
			type: Array,
			default: ['Red', 'Green', 'Blue'],
		},
		aaa: {
			type: Boolean,
			key: 'aaafsfsdfsd',
			default: false,
		},
	},

}

```

---

```js

{
	props: {
		userId: Number,
		userName: String,
	},
	storedData: {
		displayedName: {
			key() {
				return `app/users/${this.userId}/name`;
			},
			default() {
				return this.userName;
			},
		},
	},

}

```

---

```js

{
	storedData: {
		fancyNumbers: {
			type: {
				parse(v) {
					return v.split('|').map(v => parseInt(v));
				},				
				stringify(v) {
					return v.join('|');
				},
			},
			default: [],
		},
	},
}

```

---

```js

{

	storedData: {
		saveState: {
			type: Object,
			computed: {
				get() {
					return {
						health: this.health,
						ammo: this.ammo,
						level: this.level,
					};
				},
				set({health = 100, ammo = 0, level = 1} = {}) {
					this.health = health;
					this.ammo = ammo;
					this.level = level;
				},
			},
		},
	},

}

```


```js

new Vue({

	/*...*/

	storedData: {
		locale: {
			type: String,			
			computed: {
				get() {
					return this.$i18n.locale;
				},
				set(value) {
					this.$i18n.locale = value;
				},
			},
			default() {
				return navigator.language;
			},
		},

		authorization: {
			type: Object,
			key: 'github.com/authorization',
		},
	},

	watch: {
		authorization: {
			handler(value) {
				if (value) {
					let {type, credentials} = value;
					this.$http.headers.common['Authorization'] = `${type} ${credentials}`;
				} else {
					this.$http.headers.common['Authorization'] = null;
				}
			},
			immediate: true,
		},
	},

	i18n: new VueI18n({fallbackLocale: 'en'}),

	http: {root: '/root'},

});

```
