"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var myDid = document.getElementById('main');
var myArr = [1, 2, 3, 4, 5];

for (var _i = 0, _myArr = myArr; _i < _myArr.length; _i++) {
  var prop = _myArr[_i];
  myDid.innerHTML += "<p>".concat(prop, "</p>");
}

var Person = /*#__PURE__*/function () {
  function Person(name, age) {
    _classCallCheck(this, Person);

    this.name = name;
    this.age = age;
  }

  _createClass(Person, [{
    key: "sayHi",
    value: function sayHi() {
      console.log("Hi, ".concat(this.name, ". You have ").concat(this.age, " years of age."));
    }
  }]);

  return Person;
}();

var billy = new Person('Billy', 21);
billy.sayHi();
var sally = new Person('Sally', 16);
sally.sayHi();
console.log('Watched!');