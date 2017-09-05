(function() {

	new Vue({
		el: '#a',

		storedProps: {
			storedString: {
				type: String,
				default: '',
			},
			storedNumber: {
				type: Number,
				default: 0,
			},
		},
	});

	new Vue({
		el: '#b',

		storedProps: {
			storedNumber: {
				type: Number,
				default: 0,
			},
			storedBoolean: {
				type: Boolean,
				default: false,
			},
		},
	});

	new Vue({
		el: '#c',

		storedProps: {
			storedString: {
				type: String,
				default: '',
			},
			storedBoolean: {
				type: Boolean,
				default: false,
			},
		},
	});

})();