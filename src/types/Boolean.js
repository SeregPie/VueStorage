export default {
	parse: (value => Boolean(JSON.parse(value))),
	stringify: (value => String(Boolean(value))),
};
