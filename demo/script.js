(function() {

	new Vue({
		el: '#app',

		data: {
			storageKey: 'test',
		},

		stored: {
			checkedNames: {
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
