# VueStorage

Allows components to save and load their data across browser sessions.

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

```

Include [polyfills](https://polyfill.io/) to support older browsers.

```html

<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Object.entries"></script>

```

## usage

```js

{
  stored: {
    title: String,
    colorPalette: {
      type: JSON,
      default: ['Red', 'Green', 'Blue'],
    },
    enabled: {
      type: JSON,
      key: 'myApp/enabled',
      default: true,
    },
  },
}

```

---

Provide functions for the storage key and the default value to dynamically re-evaluate stored property whenever their value changes.

```js

{
  props: {
    userId: Number,
    userName: String,
  },
  stored: {
    displayedUserName: {
      key() {
        return `myApp/users/${this.userId}/name`;
      },
      default() {
        return this.userName;
      },
    },
  },
}

```

---

Define custom `parse` and `stringify` functions to manage how the data is stored.

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
