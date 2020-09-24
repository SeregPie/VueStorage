import mixin from './mixin';
import optionMergeStrategies from './optionMergeStrategies';

export default function(app) {
	Object.assign(app.config.optionMergeStrategies, optionMergeStrategies);
	app.mixin(mixin);
}
