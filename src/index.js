import {
	isVue2,
	Vue,
} from 'vue-demi';

import install from './install';
import localStorage from './localStorage';
import mixin from './mixin';
import optionMergeStrategies from './optionMergeStrategies';
import sessionStorage from './sessionStorage';
import stored from './stored';

export {
	install,
	localStorage,
	mixin,
	optionMergeStrategies,
	sessionStorage,
	stored,
};

let plugin = {
	install,
};

if (isVue2 && globalThis.window) {
	Vue.use(plugin);
}

export default plugin;