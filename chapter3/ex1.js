const assert = require('assert')

function Ninja() {
  this.skulk = function () {
    return this
  }
}

var ninja1 = new Ninja();
var ninja2 = new Ninja();
assert(ninja1.skulk() === ninja1);
assert(ninja2.skulk() === ninja2);