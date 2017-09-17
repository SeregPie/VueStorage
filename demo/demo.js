(function() {

	new Vue({
		el: '#a',

		storedData: {
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

		storedData: {
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

		storedData: {
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