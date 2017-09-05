# VueStorage

## usage

```js

new Vue({

  storage: {
    type: 'session',
    prefix: 'app:',
    props: {
      locale: {
        type: String,
        default() {
          return navigator.language;
        },
        key: 'i18n',
      },
      authorization: Object,
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
