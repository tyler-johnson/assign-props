var hasOwn = Object.prototype.hasOwnProperty;

var defaults = {
	configurable: false,
	enumerable: true
};

// defines protected, immutable properties
function assignProps(obj, key, val, opts) {
	var k;

	// accept object syntax
	if (typeof key === "object") {
		for (k in key) {
			if (hasOwn.call(key, k)) assignProps(obj, k, key[k], val);
		}
		return;
	}

	var desc = {};
	opts = opts || {};

	// build base descriptor
	for (k in defaults) {
		desc[k] = typeof opts[k] === "boolean" ? opts[k] : defaults[k];
	}

	// set descriptor props based on value
	if (!opts.forceStatic && typeof val === "function") {
		desc.get = val;
	} else {
		desc.value = val;
		desc.writable = false;
	}

	// define the property
	Object.defineProperty(obj, key, desc);
}

module.exports = assignProps;
