# VueStorage

Allows the components to save and load their data across the browser sessions.

Works for Vue 2 & 3.

## demo

[Try it out!](https://seregpie.github.io/VueStorage/)

## dependencies

- [Vue Demi](https://github.com/antfu/vue-demi)

## setup

### npm

```shell
npm i @seregpie/vue-storage
```

---

```javascript
import VueStorage, {
  localStorage,
  sessionStorage,
  stored,
} from '@seregpie/vue-storage';
```

### browser

```html
<!-- if using Vue 2 -->
<script src="https://unpkg.com/vue@2"></script>
<script src="https://unpkg.com/@vue/composition-api"></script>

<!-- if using Vue 3 -->
<script src="https://unpkg.com/vue@3"></script>

<script src="https://unpkg.com/vue-demi"></script>
<script src="https://unpkg.com/@seregpie/vue-storage"></script>
```

The plugin is globally available as `VueStorage`.

## usage

### Composition API

```javascript
import {stored} from '@seregpie/vue-storage';

export default {
  props: {
    userId: Number,
    userName: String,
  },
  setup(props) {
    let displayedUserName = stored(
      () => `myApp/users/${props.userId}/name`,
      {
        type: String,
        default: () => props.userName,
      },
    );
    return {
      displayedUserName,
    };
  },
};
```

### Options API

Install the plugin.

```javascript
import {createApp} from 'vue'
import VueStorage from '@seregpie/vue-storage';

let app = createApp({/*...*/});
app.use(VueStorage);
app.mount('body');
```

Define the options.

```javascript
export default {
  props: {
    userId: Number,
    userName: String,
  },
  stored: {
    displayedUserName: {
      key() {
        return `myApp/users/${this.userId}/name`;
      },
      type: String,
      default() {
        return this.userName;
      },
    },
  },
};
```

## API

### stored

```
stored(key, {
  type: JSON,
  default: null,
  session: false,
})
```

Creates a reference to a stored item.

| argument | description |
| ---: | :--- |
| `key` | A string as the key. Can also be a getter function or a `ref`. |
| `type` | An object with the `parse` and `stringify` functions to manage how the data is stored. Use `Boolean`, `Number` or `String` for a predefined functionality. |
| `default` | Anything as the default value that is returned if the key does not exist. Can also be a getter function or a `ref`. |
| `session` | If `true`, the session storage is used instead of the local storage. Can also be a getter function or a `ref`. |

Returns the created reference.

```javascript
let key = 'myApp/numbers';
let r = stored(key, {
  type: {
    parse: (string => string.split('|').map(Number)),
    stringify: (array => array.join('|')),
  },
  default: [15, 16],
});

r.value = [23, 42];
console.log(r.value); // => [23, 42]
console.log(localStorage.getItem(key)); // => '23|42'

r.value = null;
console.log(r.value); // => [15, 16]
console.log(localStorage.getItem(key)); // => null
```

### localStorage

Uses the same API as [`window.localStorage`](https://developer.mozilla.org/docs/Web/API/Window/localStorage).

```javascript
let key = 'myApp/backgroundColor';
let backgroundColor = localStorage.getItem(key);
localStorage.removeItem(key);
```

### sessionStorage

Uses the same API as [`window.sessionStorage`](https://developer.mozilla.org/docs/Web/API/Window/sessionStorage).
