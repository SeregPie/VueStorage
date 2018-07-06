import Lang_isNull from './isNull';
import Lang_isUndefined from './isUndefined';

export default function(value) {
	return Lang_isUndefined(value) || Lang_isNull(value);
}
