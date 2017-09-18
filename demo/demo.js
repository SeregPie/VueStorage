(function() {

	let _isNil = function(value) {
		return value === null || value === undefined;
	};

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
					type: {
						parse(value) {
							return value;
						},
						stringify(value) {
							return value;
						},
					},
					default() {
						return 'dummy';
					},
					storage: localStorage,

				};
				Vue.set(ooo, 'dummy', Date.now());

				window.addEventListener('storage', function(event) {
					console.log(event);
					ooo.dummy = Date.now();
				}, false);


				return {
					get() {
						let dummy = ooo.dummy;

						let key = ooo.key.call(this);
						let value =  ooo.storage.getItem(key);
						console.log('get', value);
						if (_isNil(value)) {
							value = ooo.default.call(this);
						} else {
							value = ooo.type.parse.call(this, value);
						}
						return value;
					},

					set(value) {
						console.log('set', value);
						let key = ooo.key.call(this);
						if (_isNil(value)) {
							ooo.storage.removeItem(key);
						} else {
							value = ooo.type.stringify.call(this, value);
							ooo.storage.setItem(key, value);
						}
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