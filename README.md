# VueStorage

The changes to the storage are reflected between apps and components, that use the same storage key. The changes are also reflected to the apps and components in other tabs.

## dependencies

- [Vue](https://github.com/vuejs/vue)

## setup

Install the [package](https://www.npmjs.com/package/vuestorage) via npm.

```sh

npm install vuestorage

```

---

Include the code in your page via a CDN.

```html

<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vuestorage"></script>
<script>Vue.use(VueStorage)</script>

```

## usage

```js

{
	stored: {
		title: String,
		colorPalette: {
			type: Array,
			default: ['Red', 'Green', 'Blue'],
		},
		visible: {
			type: Boolean,
			key: 'MyComponent/visible',
			default: false,
		},
	},
}

```

---

Provide functions for the storage key and the default value to dynamically re-evaluate stored property when the storage key or the default value changes.

```js

{
	props: {
		userId: Number,
		userName: String,
	},
	stored: {
		displayedUserName: {
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

Define custom `parse` and `stringify` functions to load and save data from the storage.

```js

{
	stored: {
		fancyNumbers: {
			type: {
				parse(v) {
					return v.split('|').map(v => Number.parseInt(v));
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

The example below is a concept and is not implemented right now.

```js

{
	data() {
		return {
			level: 1,
			health: 100,
			ammo: 0,
		};
	},
	stored: {
		saveState: {
			type: Object,
			computed: {
				get() {
					return {
						level: this.level,
						health: this.health,
						ammo: this.ammo,
					};
				},
				set({level, health, ammo}) {
					this.level = level;
					this.health = health;
					this.ammo = ammo;
				},
			},
		},
	},
	watch: {
		saveState: {
			handler() {},
			immediate: true,
		},
	},
}

```
