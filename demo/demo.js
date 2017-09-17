(function() {

	new Vue({
		el: '#a',

		props: {
		},

		data: {
			storedNumber: 0,
			$storage: {
				storedString: {
					value: undefined,
					default: '',
					key: 'app/storedString',
				},
			},
		},

		computed: {
			storedString: (function() {
				let ooo = {
					key() {
						return `app/${this.storedNumber}/string`;
					},
					value: undefined,
					default() {
						return 'dummy';
					},
				};

				return {
					get() {
						let key = ooo.key.call(this);
						let value = localStorage[key];
						console.log(value);
						if (value === undefined) {
							value = ooo.default.call(this);
						}
						return value;
					},

					set(value) {
						let key = ooo.key.call(this);
						localStorage[key] = value;

					},
				};
			})(),
		},
	});

	new Vue({
		el: '#b',

		props: {
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

		props: {
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