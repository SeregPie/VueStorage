(function() {

	var ref = vueCompositionApi.ref;
	var stored = VueStorage.stored;

	new Vue({
		el: '#app',
		vuetify: new Vuetify(),
		setup: function() {
			var storageKey = ref('test');
			var checkedNames = stored(storageKey, {
				type: JSON,
				default: function() {
					return [];
				},
			});
			return {
				checkedNames: checkedNames,
				storageKey: storageKey,
			};
		},
	});

})();
