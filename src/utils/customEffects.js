import createObject from './createObject';
import customEffect from './customEffect';

export default function() {
	let effects = createObject();
	return {
		track(key) {
			let effect = effects[key];
			if (effect) {
				// pass
			} else {
				effect = customEffect();
				effects[key] = effect;
			}
			effect.track();
		},
		trigger(key) {
			let effect = effects[key];
			if (effect) {
				effect.trigger();
			} else {
				// pass
			}
		},
		getKeys() {
			return Object.keys(effects);
		},
	};
}
