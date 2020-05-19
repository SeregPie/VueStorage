# VueStorage

Allows the components to save and load their data across the browser sessions.

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
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/@seregpie/vue-storage"></script>
```

The plugin is globally available as `VueStorage`.

## usage

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
      () => `my-app/users/${props.userID}/name`,
      {default: () => props.userName},
    );
    let drawerVisible = stored('my-app/drawer/visible', {
      default: false,
      type: Boolean,
    });
    let defaultColorPalette = ref(['FireBrick', 'PaleTurquoise', 'Turquoise']);
    let colorPalette = stored('my-app/color-palette', {
      default: defaultColorPalette,
      session: true,
      type: JSON,
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

## API

### stored

```
stored(key, {
  type: String,
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

```javascript
let numbers = stored('my-app/numbers', {
  type: {
    parse: (string => string.split('|').map(Number)),
    stringify: (array => array.join('|')),
  },
  default: [],
});
```

### localStorage

Uses the same API as [window.localStorage](https://developer.mozilla.org/docs/Web/API/Window/localStorage).

```javascript
import {localStorage} from '@seregpie/vue-storage';

let key = 'my-app/title';
let title = localStorage.getItem(key);
localStorage.removeItem(key);
```

### sessionStorage

Uses the same API as [window.sessionStorage](https://developer.mozilla.org/docs/Web/API/Window/sessionStorage).
