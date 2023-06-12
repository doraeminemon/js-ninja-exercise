const assert = require('assert')

function Ninja() {
  var feints = 0; // this is private inherently due to the constructor of it.
  this.getFeints = function () {
    return feints
  }
  this.feint = function () {
    feints++
  }
}

var ninja1 = new Ninja()
ninja1.feint()

if (ninja1.feints === undefined) {
  console.log("private data is inaccessible")
}
if (ninja1.getFeints() === 1) {
  console.log("we are able to access the internal point count")
}