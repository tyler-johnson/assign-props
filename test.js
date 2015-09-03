var test = require("tape");
var assignProps = require("./");
var getPropDesc = Object.getOwnPropertyDescriptor;

test("assigns a static value", function(t) {
	t.plan(3);

	var obj = {};
	assignProps(obj, "foo", 12345);

	t.equal(obj.foo, 12345, "has correct value");
	t.deepEqual(getPropDesc(obj, "foo"), {
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
	t.deepEqual(getPropDesc(obj, "foo"), {
		get: getter,
		set: void 0,
		enumerable: true,
		configurable: false
	}, "has correct descriptor");

	obj.foo = "asdf";
	t.equal(obj.foo, 12345, "did not modify value");
});

test("assigns a mixed values", function(t) {
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
