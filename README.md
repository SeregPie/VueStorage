# VueStorage

## usage

```js

{

	storedData: {
		value: {
			key: 'abc',
			default() {
				return undefined;
			},
			type: String,
			parse() {

			},
			stringify() {

			},
			get() {

			},
			set() {

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
		locale: {
			handler(value) {
				this.$i18n.locale = value;
			},
			immediate: true,
		},

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
