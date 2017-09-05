(function() {

	new Vue({
		el: '#a',

		data: {
			storedString: '',
			storedNumber: 0,
		},
	});

	new Vue({
		el: '#b',

		data: {
			storedNumber: 0,
			storedBoolean: false,
		},
	});

	new Vue({
		el: '#c',

		data: {
			storedString: '',
			storedBoolean: false,
		},
	});

})();