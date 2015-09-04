var test = require("tape");
var assignProps = require("./");
var descriptor = Object.getOwnPropertyDescriptor;

test("assigns a static value", function(t) {
	t.plan(3);

	var obj = {};
	assignProps(obj, "foo", 12345);

	t.equal(obj.foo, 12345, "has correct value");
	t.deepEqual(descriptor(obj, "foo"), {
		value: 12345,
		writable: false,
		enumerable: true,
		configurable: false
	}, "has correct descriptor");

	obj.foo = "asdf";
	t.equal(obj.foo, 12345, "did not modify value");
});

test("assigns a dynamic value", function(t) {
	t.plan(3);

	var obj = {};
	var getter = function() { return 12345; };
	assignProps(obj, "foo", getter);

	t.equal(obj.foo, 12345, "has correct value");
	t.deepEqual(descriptor(obj, "foo"), {
		get: getter,
		set: void 0,
		enumerable: true,
		configurable: false
	}, "has correct descriptor");

	obj.foo = "asdf";
	t.equal(obj.foo, 12345, "did not modify value");
});

test("assigns static function value when forceStatic is true", function(t) {
	t.plan(3);

	var obj = {};
	var fn = function() { return 12345; };
	assignProps(obj, "foo", fn, { forceStatic: true });

	t.equal(obj.foo, fn, "has correct value");
	t.deepEqual(descriptor(obj, "foo"), {
		value: fn,
		writable: false,
		enumerable: true,
		configurable: false
	}, "has correct descriptor");

	obj.foo = "asdf";
	t.equal(obj.foo, fn, "did not modify value");
});

test("assigns custom configurable and enumerable options", function(t) {
	t.plan(2);

	var obj = {};
	assignProps(obj, "foo", 12345, {
		configurable: true,
		enumerable: false
	});

	t.equal(obj.foo, 12345, "has correct value");
	t.deepEqual(descriptor(obj, "foo"), {
		value: 12345,
		writable: false,
		enumerable: false,
		configurable: true
	}, "has correct descriptor");
});

test("assigns a many values", function(t) {
	t.plan(2);

	var obj = {};
	var getter = function() { return "hello"; };

	assignProps(obj, {
		foo: 12345,
		bar: getter
	});

	t.equal(obj.foo, 12345, "static key has correct value");
	t.equal(obj.bar, "hello", "dynamic key has correct value");
});
