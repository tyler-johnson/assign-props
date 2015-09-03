var hasOwn = Object.prototype.hasOwnProperty;

// defines protected, immutable properties
function assignProps(obj, key, val) {
	if (typeof key === "object") {
		for (var k in key) {
			if (hasOwn.call(key, k)) assignProps(obj, k, key[k]);
		}
		return;
	}

	var opts = {
		configurable: false,
		enumerable: true
	};

	if (typeof val === "function") opts.get = val;
	else {
		opts.value = val;
		opts.writable = false;
	}

	Object.defineProperty(obj, key, opts);
}

module.exports = assignProps;
