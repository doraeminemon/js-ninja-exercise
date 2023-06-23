# Type of functions

- Callback function
- arrow function
- function declaration vs function expression
- `var ninja = (() => {"Yoshi"})();` will evaluate to `undefined`
- function default param, rest params
- what will happens to params when there are multiple

# Understanding function invocations

`arguments` is a implicit part of function which help us write flexible function that can handle multiple parameters easily. It’s similar to rest parameter in ES6. Rest parameter is a real array.

`"use strict"` strict mode in ES5 will disable function parameter aliasing, which prevents reassigning it.

## Invoking function

Will be related to `this`, which defines function context.

4 ways of invoke a function:

- As a function: `skulk()`
- As a method: `ninja.skulk()`
- As a constructor: `new Ninja()`
- Via `apply` or `call` method: `skulk.call(ninja)` or `skulk.call(ninja)`

## As a function

- Non strict mode: `this` is global ( `window` context )
- Strict mode: `undefined`

## As a method

- `this` will take the context of the object
- Good for OOP code style

## As a constructor

- will initialize an instance

When a function with the keyword `new` triggers the following steps:

1. A new empty object is created.
2. This object is passed to the constructor as the `this` parameter, and thus becomes the constructor’s function context
3. The newly constructed object is returned as the `new` operator’s value ( with an exception that we’ll get in short order )
