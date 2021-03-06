# VueStorage

Allows the components to save and load their data across the browser sessions.

Works for Vue 2 & 3.

## demo

[Try it out!](https://seregpie.github.io/VueStorage/)

## dependencies

- [VueDemi](https://github.com/antfu/vue-demi)

## setup

### npm

```shell
npm i @seregpie/vue-storage

npm i @vue/composition-api # if using Vue 2
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
      () => `myAwesomeApp/users/${props.userId}/name`,
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
app.use(VueStorage, {
  prefix: 'myAwesomeApp/',
});
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
        return `users/${this.userId}/name`;
      },
      type: String,
      default() {
        return this.userName;
      },
    },
  },
};
```

---

If the `key` option is omitted, the property name is used instead.

```javascript
stored: {
  backgroundColor: {
    type: String,
    default: '#fff',
  },
},
```

## plugin options

```
app.use(VueStorage, {
  optionName: 'stored',
  prefix: '',
})
```

| argument | description |
| ---: | :--- |
| `optionName` | A string as the name of the component option that contains all the stored properties. |
| `prefix` | A string as the prefix for each storage key. |

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

---

```javascript
let key = 'myAwesomeApp/numbers';
let r = stored(key, {
  type: {
    parse: (string => string.split('|').map(Number)),
    stringify: (array => array.join('|')),
  },
  default: [],
});

r.value = [1, 2];
console.log(r.value); // => [1, 2]
console.log(localStorage.getItem(key)); // => '1|2'

r.value = null;
console.log(r.value); // => []
console.log(localStorage.getItem(key)); // => null
```

### localStorage

The reactive local storage.

Uses the same API as [`window.localStorage`](https://developer.mozilla.org/docs/Web/API/Window/localStorage).

```javascript
let key = 'myAwesomeApp/backgroundColor';
let backgroundColor = localStorage.getItem(key);
localStorage.removeItem(key);
```

### sessionStorage

The reactive session storage.

Uses the same API as [`window.sessionStorage`](https://developer.mozilla.org/docs/Web/API/Window/sessionStorage).
