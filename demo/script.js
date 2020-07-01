(function() {

	var ref = vueCompositionApi.ref;
	var stored = VueStorage.stored;

	new Vue({
		el: '#app',
		vuetify: new Vuetify(),
		setup: function() {
			var storageKey = ref('test');
			var checkedNames = stored(storageKey, {
				default: [],
			});
			return {
				checkedNames: checkedNames,
				storageKey: storageKey,
			};
		},
	});

})();
