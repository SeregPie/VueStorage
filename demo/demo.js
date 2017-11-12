(function() {

	new Vue({
		el: '#App',

		data: {
			storageKey: 'test',
		},

		stored: {
			storageValue: {
				type: JSON,
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