import defaultOptionName from './defaultOptionName';
import defineMixin from './defineMixin';
import optionMergeStrategy from './optionMergeStrategy';

export default function(app, {
	optionName = defaultOptionName,
	prefix,
} = {}) {
	app.config.optionMergeStrategies[optionName] = optionMergeStrategy;
	app.mixin(defineMixin({
		optionName,
		prefix,
	}));
}
