“When running the following code, which of the assertions will pass?

```javascript
  var ninja1 = {
    whoAmI: function(){
      return this;
    }
  };

  var ninja2 = {
    whoAmI: ninja1.whoAmI
  };

  var identify = ninja2.whoAmI;

  //pass: whoAmI called as a method of ninja1
  assert(ninja1.whoAmI() === ninja1, "ninja1?");

  //fail: whoAmI called as a method of ninja2
  assert(ninja2.whoAmI() === ninja1, " ninja1 again?");

  //fail: identify calls the function as a function
  //because we are in non-strict mode, this refers to the window
  assert(identify() === ninja1, "ninja1 again?");

  //pass: Using call to supply the function context
  //this refers to ninja2
  assert(ninja1.whoAmI.call(ninja2) === ninja2, "ninja2 here?");”
```

Auto ( self ) bind function = arrow function
