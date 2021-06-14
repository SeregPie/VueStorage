(() => {

	new Vue({
		el: '#App',
		vuetify: new Vuetify(),
		data() {
			return {
				items: ['🐭', '🐮', '🐯', '🐰', '🐱', '🐴', '🐵', '🐶', '🐷', '🐸', '🐹', '🐺', '🐻', '🐼', '🦁', '🦊'],
				storageKey: 'myAwesomeKey',
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
