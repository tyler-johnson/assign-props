# Assign Props

Define immutable values on JavaScript objects.

```sh
$ npm install assign-props
```

```js
var assignProps = require("assign-props");

var obj = {};
assignProps(obj, "foo", "bar");
obj.foo = 12345;

obj.foo; // → "bar"
```

### Usage

#### assignProps(obj, key, value [, options ])

Define an immutable `key` on some JavaScript object, `obj`. This is sugar for `Object.defineProperty()`.

If `value` is a function, it is considered a dynamic value and a property getter will be defined.

```js
assignProps(obj, "four", function() {
    return 2 + 2;
});

obj.four; // → 4
```

If `value` is any other than a function, or `options.forceStatic` is true, `value` will be defined as a static value.

```js
assignProps(obj, "hello", "world");

obj.hello; // → "world"
```

Here are the available options:

- __`forceStatic`__ - Forces the value to applied as a static value. Useful if you absolutely need a function defined with `writable: false`.
- __`configurable`__ - Sets the `defineProperty()` configurable value. Defaults to `false`.
- __`enumerable`__ - Sets the `defineProperty()` enumerable value. Defaults to `true`.

#### assignProps(obj, props [, options ])

Similar to above, this assigns multiple values to a JavaScript object, `obj`. Pass an object of keys mapped to values and they will be applied in the same fashion.

```js
assignProps(obj, {
	name: "World",
	greeting: function() {
		return "Hello " + this.name;
	}
});

obj.greeting; // → "Hello World"
```
