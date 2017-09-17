# VueStorage

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
	storedData: {
		aaa: String,
		colorPalette: {
			type: Array,
			default: ['Red', 'Green', 'Blue'],
		},		
		bbb: {
			type: Boolean,
			key: 'ccc',
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

```js

{
	storedData: {
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

```js

{
	data() {
		return {
			level: 1,
			health: 100,
			ammo: 0,			
		};
	},	
	storedData: {
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
