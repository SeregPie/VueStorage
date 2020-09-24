# VueStorage

Allows the components to save and load their data across the browser sessions.

Works with Vue 2 & 3 by the power of [Vue Demi](https://github.com/antfu/vue-demi)!

## demo

[Try it out!](https://seregpie.github.io/VueStorage/)

## setup

### npm

```shell
npm i @seregpie/vue-storage
```

### ES module

```javascript
import {
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
import {ref} from 'vue';
import {stored} from '@seregpie/vue-storage';

export default {
  props: {
    userID: Number,
    userName: String,
  },
  setup(props) {
    let displayedUserName = stored(
      () => `myApp/users/${props.userID}/name`,
      {
        type: String,
        default: () => props.userName,
      },
    );
    let drawerVisible = stored('drawerVisible', {
      type: Boolean,
      default: false,
      session: true,
    });
    let defaultColorPalette = ref(['FireBrick', 'PaleTurquoise', 'Turquoise']);
    let colorPalette = stored('colorPalette', {
      default: defaultColorPalette,
    });
    return {
      colorPalette,
      defaultColorPalette,
      displayedUserName,
      drawerVisible,
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

---

Define options.

```javascript
export default {
  props: {
    userID: Number,
    userName: String,
  },
  data() {
    return {
      defaultColorPalette: ['FireBrick', 'PaleTurquoise', 'Turquoise'],
    },
  },
  stored: {
    colorPalette: {
      default() {
        return this.defaultColorPalette;
      },
    },
    displayedUserName: {
      key() {
        return `myApp/users/${this.userID}/name`;
      },
      type: String,
      default() {
        return this.userName;
      },
    },
    drawerVisible: {
      type: Boolean,
      default: false,
      session: true,
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
| `key` | A string as the key. Use a reference or a function to allow reactivity. |
| `type` | An object with `parse` and `stringify` functions to manage how the data is stored. Use `Boolean`, `Number` or `String` for a predefined functionality. |
| `default` | Anything as the default value that is returned if the key does not exist. Use a reference or a function to allow reactivity. |
| `session` | If `true`, the session storage is used instead of the local storage. Use a reference or a function to allow reactivity. |

Returns the created reference.

---

```javascript
let numbers = stored('myApp/numbers', {
  type: {
    parse: (string => string.split('|').map(Number)),
    stringify: (array => array.join('|')),
  },
  default: [],
});
```

### localStorage

Uses the same API as [`window.localStorage`](https://developer.mozilla.org/docs/Web/API/Window/localStorage).

```javascript
import {localStorage} from '@seregpie/vue-storage';

let key = 'myApp/title';
let title = localStorage.getItem(key);
localStorage.removeItem(key);
```

### sessionStorage

Uses the same API as [`window.sessionStorage`](https://developer.mozilla.org/docs/Web/API/Window/sessionStorage).
