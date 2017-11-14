(function() {

	new Vue({
		el: '#App',

		data: {
			storageKey: 'test',
		},

		stored: {
			value: {
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