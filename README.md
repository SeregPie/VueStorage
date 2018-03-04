# VueStorage

Allows components to save and load their data across browser sessions.

## demo

[Try it out!](https://seregpie.github.io/VueStorage/)

## dependencies

- [Vue](https://github.com/vuejs/vue)

## setup

### npm

```shell
npm install vuestorage
```

### ES module

Install the plugin globally.

```javascript
import Vue from 'vue';
import VueStorage from 'vuestorage';

Vue.use(VueStorage);
```

### browser

```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vuestorage"></script>
```

If Vue is detected, the plugin will be installed automatically.

## usage

```javascript
new Vue({
  stored: {
    title: String,
    colorPalette: {
      type: JSON,
      default: ['Red', 'Green', 'Blue'],
    },
    enabled: {
      type: JSON,
      key: 'myApp.enabled',
      default: true,
    },
  },
});
```

The option `type` manages how the data is stored. Two types are available: `String` and `JSON`. Default type is `String`.

The option `key` is the key to the storage. If the option is not provided, the key of the attribute is used instead.

---

Override default options.

```javascript
Vue.use(VueStorage, {
  storageType: 'local', // 'local' for localStorage and 'session' for sessionStorage
});
```

---

Provide functions for the key and the default value to dynamically re-evaluate stored data.

```javascript
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

```javascript
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
}
```
