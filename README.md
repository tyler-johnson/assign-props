# Assign Props

Assigns non-writable values to JavaScript objects. This is mostly sugar for `Object.defineProperty()`.

### Assign Static Properties

```js
assignProps(obj, "foo", 12345);
```

This is equivalent to:

```js
Object.defineProperty(obj, "foo", {
	value: 12345,
	writable: false,
	configurable: false,
	enumerable: true
});
```

### Assign Dynamic Properties

```js
assignProps(obj, "bar", function() {
	return this.foo;
});
```

This is equivalent to:

```js
Object.defineProperty(obj, "foo", {
	get: function() {
		return this.foo;
	},
	configurable: false,
	enumerable: true
});
```

### Assign Many Properties

```js
assignProps(obj, {
	foo: 12345,
	bar: function() { return this.foo; }
});
```

This is equivalent to:

```js
Object.defineProperties(obj, {
	foo: {
		value: 12345,
		writable: false,
		configurable: false,
		enumerable: true
	},
	bar: {
		get: function() {
			return this.foo;
		},
		configurable: false,
		enumerable: true
	}
});
```
