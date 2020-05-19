export default {
	parse: (value => Number(JSON.parse(value))),
	stringify: (value => String(Number(value))),
};
