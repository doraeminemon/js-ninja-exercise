# Scoping in JS

[Example 1](./ex1.js)

Like a protective bubble, the closure for `innerFunction` keeps the variables in the function's scope alive for as long as the function exists.

[Example 2](./ex2.js)

As mentioned in previous chapter, 2 types of code meaning we will have 2 types of context:

- A global execution context
- A local ( function ) execution context

JS is single thread, which means only a single execution can run at a time. So, it means there will be a call (execution context stack) stack. This is used to keep track of execution stack: which one is the main stack, and which one that is executing ( like a function execution context ).

[Example 3](./ex3.js)

`new` means a new execution context. What is a closure ? The execution context is also used for identifier resolution, which means what variable a certain identifier refers to.

Lexical environment.

Example of different function scopes:

```javascript
var ninja = "Muneyoshi";
function skulk() {
  var action = "Skulking";
  function report() {
    var intro = "Aha!";
    assert(intro === "Aha", "Local");
    assert(action === "Skulking", "Outer");
    assert(ninja === "Muneyoshi", "Global");
  }
  report();
}
skulk();
```

Whenever a function is created, a reference to the lexical environment in which the function was created is stored in an internal property named `[[Environment]]`. In the case above, a reference to the global environment will be created for the `skulk` function.

Variables declared with keyword `var` are always registered in the closest function or global lexical environment, without paying any attention to blocks.

```javascript
function reportActivity() {
  var functionActivity = "jumping"

  for(var = 1; i < 3; i++) {
    var forMessage = globalNinja + " " + functionActivity
  }
  assert(i === 3 && forMessage === "Yoshi jumping", "Loop variable accessible outside of for loop")

}
```

## Using let and const

```javascript
function reportActivity() {
  const functionActivity = "jumping";
  for (let i = 1; i < 3; i++) {
    let forMessage = GLOBAL_NINJA + " " + functionActivity;
  }

  assert(
    typeof i === "undefined" && typeof forMessage === "undefined",
    "Loop variable are inaccessible outside of for loop"
  );
}
```

But because we are using `let` and `const`, the variables are defined in their closest lexical environment, the `fnActivity` variable in the `reportActivity` env, and the `i` and `forMessage` variables in the `for` block environment. JS now support the same scoping rules as other C-like languages.

## Function used before declaration

function used before declaration only applied to function declaration. Other cases like function express or arrow function won't be applied.

```javascript
assert(typeof fun === "function");
assert(typeof myFunExp === "undefined");
assert(typeof myArrow === "undefined");

function fun() {}
var myFunExpr = function () {};
var myArrow = (x) => x;
```

## Overriding function identifier

Because of the steps above when the JS compiler register identifier, we will have weird behaviour like this:

```javascript
assert(typeof fun === "function"); // true
var fun = 3;
assert(typeof fun === "number"); // true
function fun() {}
assert(typeof fun === "number", "Still a number"); // false
```

The function definition will come first until the number declaration comes.

## How closures works

> Closure are irrevocably tightly coupled with scopes

Javascript constructor are functions invoked with the keyword `new`. Therefore, every time a constructor is invoked, it has created a new lexical environment to keep track of "private" variables within the constructor.
Whenever a function is created, it keeps a reference to the lexical environment in which it was created.
Keywords: lexical environments, execution contexts.

Private closures caveat:

A method can be cloned by another object, thus it can still access the same variable while the closures is not. Thus, it means that the closures still can be accessible through another object's method, breaking the whole "private" variable idea.

## Example on animation

<div>
  <div id="box1">First box</div>
  <div id="box2">Second box</div>
  <script>
    function animateIt(elementId) {
      var element = document.getElementById(elementId)
      var tick = 0
      var timer = setInterval(function() {
        if (tick < 100) {
          element.style.left = element.style.top = tick + "px"
          tick++
        }
      })
    }
  </script>
</div>

## Summary

- Closures allow a function to access all variables that are in scope when the function itself was defined.
  They create a "safety bubble" of the function and the variables that are in scope at the point of the function definition. This helps the function have all the dependencies it needs to execute, even if the scope when the function was created has expired.

- We can use function closures for these advanced uses:

  - Mimic private object variables, by closing over constructor variable
  - Deal with callbacks, in a way that significantly simplify the code.

- JS engines ( V8 ) track function execution through an execution context stack ( aka call stack ). Every time a new function is called, a new context is created. When a new function is done executing, the matching context is popped from the stack.

- JS engines track identifiers with lexical environment.
- In JS, we can define globally-scoped, function-scoped, and even block-scoped variables
- To define variables, we used `var`, `let` and `const` keyword.
- `let` and `const` respect block-scope, while `const` variable can only be assigned once
- Closures are merely available through JS scoping rules. A function can be called even when the scope is long gone.

## Exercise

1. Closure allow functions to 2. access external variables that are in scope when the function is ~~called~~ defined
2. Closures come with memory cost
3. In these example, the identifiers that accessed through closure are:

- getWeapon()
- getName()

4. How many execution contexts are created, and what's the largest of the execution stack ?
   3 context: infiltrate, perform, sneak. Largest size = 3 ( including the global scope )
5. `const` can't be reassigned
6. `var` doesn't respect the block-scope ( only function and global scope ), while `let` does
7. `getSamurai` will throw an exception since it's declared as an arrow function
