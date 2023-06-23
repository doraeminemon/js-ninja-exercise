const assert = require('assert')

function Ninja() {
  this.whoAmI = function () {
    return this
  }.bind(this) // binding at the moment it creates
}

var ninja1 = new Ninja(); // bound here
var ninja2 = {
  whoAmI: ninja1.whoAmI
}

assert(ninja1.whoAmI() === ninja1, "ninja1 here"); // true
assert(ninja2.whoAmI() === ninja2, "ninja2 here"); // true turns out to be FALSE