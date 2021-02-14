"use strict";

var myDid = document.getElementById('main');
var myArr = [1, 2, 3, 4, 5];

for (var _i = 0, _myArr = myArr; _i < _myArr.length; _i++) {
  var prop = _myArr[_i];
  console.log(prop);
  myDid.innerHTML += "<p>".concat(prop, "</p>");
}