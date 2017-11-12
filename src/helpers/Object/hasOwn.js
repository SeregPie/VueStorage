export default function(object, key) {
	Object.prototype.hasOwnProperty.call(object, key);
}