import {isVue2} from 'vue-demi';

import install from './install';
import localStorage from './localStorage';
import sessionStorage from './sessionStorage';
import stored from './stored';

export {
	install,
	localStorage,
	sessionStorage,
	stored,
};

let plugin = {install};

export default plugin;

if (isVue2) {
	globalThis.window?.Vue?.use(plugin);
}
