# Scoping in JS

Ex1

Like a protective bubble, the closure for `innerFunction` keeps the variables in the function's scope alive for as long as the function exists.

Ex2

As mentioned in previous chapter, 2 types of code meaning we will have 2 types of context:
- A global execution context
- A local ( function ) execution context

JS is single thread, which means only a single execution can run at a time. So, it means there will be a call (execution context stack) stack. This is used to keep track of execution stack: which one is the main stack, and which one that is executing ( like a function execution context ).

Ex3

`new` means a new execution context

