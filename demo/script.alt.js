(function() {

	Vue.use(VueStorage);

	new Vue({
		el: '#app',
		vuetify: new Vuetify(),
		data: function() {
			return {
				storageKey: 'test',
			};
		},
		stored: {
			checkedNames: {
				key: function() {
					return this.storageKey;
				},
				default: function() {
					return [];
				},
			},
		},
	});

})();
