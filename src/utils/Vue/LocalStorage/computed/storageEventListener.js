let listener = function(event) {
	this.setOwnItem(event.key, event.newValue);
};

export default function() {
	return listener.bind(this);
}
