import VueStorage from './VueStorage';

export default VueStorage;

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(VueStorage);
}
