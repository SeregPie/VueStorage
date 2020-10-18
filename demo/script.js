(function() {

	new Vue({
		el: '#App',
		vuetify: new Vuetify(),
		data() {
			return {
				items: ['🐭', '🐮', '🐯', '🐰', '🐱', '🐴', '🐵', '🐶', '🐷', '🐸', '🐹', '🐺', '🐻', '🐼', '🦁', '🦊'],
				storageKey: 'remember',
			};
		},
		stored: {
			selectedItems: {
				key() {
					return this.storageKey;
				},
				default() {
					return [];
				},
			},
		},
	});

})();
