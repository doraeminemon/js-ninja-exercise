const assert = require('assert')

var outerValue = "samurai";
var later;

function outerFunction() { // => will encapsulate all values at the moment it is defined / declared
  var innerValue = "ninja";

  function innerFunction() {
    // which means even outerValue and innerValue is ALWAYS accessible here
    assert(outerValue === "samurai", "I can see the samurai"); // true
    assert(innerValue === "ninja", "I can see the ninja"); // also true
  }

  later = innerFunction;
}

outerFunction();

later()