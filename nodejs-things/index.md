# Nodejs

## Event emitter

## Core library

Assert
BUffer
Child process
Cluster
Console
Crypto
HTTP
URL
Query string
Path
File system
Util
Zlib

## Global objects

1. global namespace
2. process
3. console ( log to stdout and stderr )
4. setTimeout, setInterval ( timer related )
5. \_\_dirname
6. \_\_filename

## Dependencies

1. V8
2. LibUV

# NodeJS events

## What is event emitter ?

Is a class that facilitate communication / interaction between objects in NodeJS. It can be used for create and handle custom events.

```javascript
const events = require("events");
const eventEmitter = new events.EventEmitter();

function listener(code, msg) {
  console.log(`status ${code} and ${msg}`);
}

eventEmitter.on("status", listener);
eventEmitter.emit("status", 200, "ok");
```

## What are the event emitter methods available in NodeJS ?

## How does the event loop works in NodeJS ?

The event loop allows Node.js to perform non-blocking I/O despite it's a single threaded. It's done by offloading operations to the system kernel whenever possible.

It's single thread but it supports concurrency via the concept of event and callback.
Node uses observer pattern.

Features of Event Loop:

- Event loop is an endless loop, which waits for tasks, executes them and then sleep until it receives more tasks.
- The event loop executes tasks from the event queue only when the call stack is empty i.e when there are no ongoing tasks.
- The event loop allows us to use callbacks and promises.
- The event loop executes the tasks starting from the oldest first ( first in first out )

## What is the difference between event and callback ?

- Events are event emitted that can cause corresponding functions or callbacks to be called.
- Callbacks are function that is passed into another function as an argument, which is invoked inside of the outer function

## First argument to the callback is the error parameter

## Timing functions

```javascript
setTimeout(); // schedules code execution after the assigned amount of time
setImmediate(); // schedules code execution at the start of the next loop iteration
setInterval(); // schedules code execution to repeat after fixed interval
```

## NodeJS file system
