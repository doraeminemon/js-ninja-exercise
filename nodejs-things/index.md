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

Q. How does Node read the content of a file ?

It allows for handle multiple I/O request in parallel. That means we can start a node to start reading a file request, then later handle it using a callback when it is finished. It will allows us to handle multiple request in parallel.

Common use of the fs module: CRUD file.

```javascript
const http = require("http");
const fs = require("fs");

http.createServer(function (req, res) {
  fs.readFile("index.html", function (err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  });
});
```

Q. Types of stream in NodeJS
Readable, Writeable, Duplex ( both ), Transform
Method: data, end, error, finish
Using stream can help process data in a serial manner, thus preserve memory and save time in the case the file is big.

## NodeJS multi threading

NodeJS has a design which allows to handle multiple request while using a single thread by utilizing libUV.

To explain it practically, let's assume we have 100s of requests lined up for NodeJS queue. As per design, the main thread of NodeJS will loop through all of them, then create background worker for each of them, then wait for the registered callbacks. When the callback is being called, it will transfer the result back to user.

Q. How does NodeJS handle child threads ?
NodeJS is a single threaded language which in background utilize multiple threads to execute asynchronous code. NodeJS is non-blocking threads is non-blocking which means that all functions ( callbacks ) are delegated to the event loop and they are executed by different threads.

- NodeJS main runs an event loop, which is single threaded.
- Background I/O is running in a thread pool which is accessible only to C/C++ or other compiled / native modules and mostly transparent to the OS.
- Node 11/12 has experimental worker threads, which is another option.
- NodeJS does allow for forking multiple processed, which are executed on different cores.
- State are not shared between master and forked processed.
- We can pass messages to forked process and to master process from forked process with function `send`.

Q. How does Node.JS supports multiple processor platforms ? And does it utilize 100% of all processor resource ?
Since NodeJS is by default a single application, it will run on a single processor core and will not take full advantage of multiple core resources. However, NodeJS provide support for deployment on multiple core system using the Cluster module and it will allows running multiple NodeJS worker processes that will share the same port.

Q. How does the cluster module works in NodeJS ?

Example:

```javascript
/**
 * Cluster Module
 */
const cluster = require("cluster");

if (cluster.isMaster) {
  console.log(`Master process is running...`);
  cluster.fork();
  cluster.fork();
} else {
  console.log(`Worker process started running`);
}
```

Output:

```
Master process is running...
Worker process started running
Worker process started running
```

Q. How to make use of all CPU in Node.js ?
A NodeJS process will only use a single thread. To take advantage of single core system, sometimes we will like to launch a cluster to take care of the load. The cluster module allows us to do this.

There are 2 ways to approach this problem:

- Main node will run a round robin, distributing workload between multiple cores, with some built in to make sure we don't overload a single worker thread.

- The second approach is that we have multiple workers listen on a different ports. Each of the worker will accept the result directly.

Q. How to kill a child process that spawn its own child process in NodeJS ?
Q. How to use a load balancer in NodeJS ?
A load balancer is a process that takes in HTTP requests and forwards these HTTP requests to one of a collection of servers. Load balancers are used for performance purposes.
Q. What is the difference between `spawn` and `fork` methods in NodeJS ?

1. `spawn()`

In Node.js, spawn() launch a new process with available set of commands. It doesn't generate a new V8 instance. It is used when we want to the child process to return a large amount of data back.

When `spawn` is called, it creates a **streaming interface** between the parent and the child process. Streaming interface is a one time buffering of data in binary format.

Example:

```javascript
/**
 * The spawn() method
 */
const { spawn } = require("child_process");
const child = spawn("dir", ["D:\\empty"], { shell: true });

child.stdout.on("data", (data) => {
  console.log(`stdout ${data}`);
});
```

Output:

```
stdout  Volume in drive D is Windows
 Volume Serial Number is 76EA-3749

stdout
 Directory of D:\
```

2. `fork()`

The `fork()` is a particular case of `spawn()` which generate a new V8 engines instance. Through this method, multiple workers run a single node base for multiple tasks. It is use to run CPU-intensive task aside from the main thread.

when fork is called, it creates a communication channel between the parent and child process Communication channel - messaging.

Example:

```javascript
/**
 * The fork() method
 */
const { fork } = require("child_process");

const forked = fork("child.js");

forked.on("message", (msg) => {
  console.log("Message from child", msg);
});

forked.send({ message: "fork() method" });
```

```javascript
/**
 * child.js
 */
process.on("message", (msg) => {
  console.log("Message from parent:", msg);
});

let counter = 0;

setInterval(() => {
  process.send({ counter: counter++ });
}, 1000);
```

Output:

```
Message from parent: { message: 'fork() method' }
Message from child { counter: 0 }
Message from child { counter: 1 }
Message from child { counter: 2 }
...
...
Message from child { counter: n }
```

Q. What is a daemon process ?
A daemon is a program that is running on the background and has no controlling terminal. They are often used to provide background services. For example, a web-server or a database server can run as daemon.

When a daemon process is initialized:

- It create a child of itself, then proceed to shut off all interactive measure: err, input, output.
- It closes the parent process when the user close the session terminal window.
- Leave the child process running as a daemon.

To daemonize NodeJS process, we can use:

- Forever
- PM2
- Nodemon
- Supervisor
- Docker

Example: Using an instance of Forever from Node.js

## NodeJS web module

Q. How to build microservices architecture with NodeJS ?

Microservice architecture is a style of Service Oriented Architecture (SOA) where the app is structured on an assembly of interconnected services. The services are finely seeded with architecture. Microservices disintegrate the app into smaller services and enable improved modularity.

Claims of microservices architecture:

- Maintainability: system component can be modified and deployed independently
- Scalability: instance can be added or removed in response to change of demand
- Modularity: responsibility is assigned to different part of the application
- Availability: new feature can be added while maintaining 100% up time
- Robustness: component failure only disable part of the application
- Testability: new feature can be segment to deploy to only a selected set of user
- Uniformity: microservice interfaces consist of base URL with standard HTTP methods used to manipulate the object.

## NodeJS middleware

Q. What are the middleware function of NodeJS ?

Middleware functions are function that have access to the request object (req), response object (res), and the next function in the application's request-response cycle.

A middleware function can accomplish the following tasks:

- Terminate ( end ) the request-response cycle
- Make change to the request and response object
- Execute any code
- Call the next middleware in the stack

Example:

```javascript
var express = require("express");
var app = express();

app.get("/", function (req, res, next) {
  next();
});
app.listen(3000);
```

## NPM

Q. Why npm shrinkwrap is useful ?

NPM shrinkwrap lets you lock down version of installed packages and their descendent packages. It helps you use the same package over different environment and also improve download and installation speed.

`npm shrinkwrap`
