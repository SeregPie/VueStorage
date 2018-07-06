import VueStored from './VueStored';

export default VueStored;

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(VueStored);
}
