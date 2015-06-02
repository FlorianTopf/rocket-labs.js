var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// basic generic class
var ReadOnly = (function () {
    function ReadOnly(data) {
        this.data = data;
    }
    ReadOnly.prototype.getData = function () {
        console.log(this.data);
    };
    return ReadOnly;
})();
// instantiation with type number
var readOnlyNumber = new ReadOnly(42);
// obviously won't work
//var readOnlyNumber: ReadOnly<number> = new ReadOnly("Test");
readOnlyNumber.getData();
// instantiation with type string
var readOnlyText = new ReadOnly("ReadOnly Generic");
readOnlyText.getData();
// restricted generic class
//test object 1
var Being = (function () {
    function Being(age) {
        this.age = age;
    }
    Being.prototype.getAge = function () {
        return this.age;
    };
    return Being;
})();
// test object 2
var Human = (function (_super) {
    __extends(Human, _super);
    function Human(name, age) {
        _super.call(this, age);
        this.name = name;
    }
    Human.prototype.getName = function () {
        return this.name;
    };
    return Human;
})(Being);
// test object 3
var SuperHuman = (function (_super) {
    __extends(SuperHuman, _super);
    function SuperHuman(name, age) {
        _super.call(this, name, age);
    }
    SuperHuman.prototype.getName = function () {
        return "Super-" + this.name;
    };
    return SuperHuman;
})(Human);
// this is the implementation
var Contract = (function () {
    function Contract(persons) {
        this.persons = persons;
    }
    Contract.prototype.joinData = function () {
        // lambdas a very nice with callbacks
        var names = this.persons.map(function (e) { return e.getName() + "," + e.getAge(); });
        return names.join(' and ');
    };
    Contract.prototype.getParties = function () {
        console.log(this.joinData());
    };
    return Contract;
})();
var persons = [new Human("Florian", 31), new SuperHuman("Spock", 110)];
var contract = new Contract(persons);
contract.getParties();
var beings = [new Human("Florian", 31), new Being(250)];
console.log(beings);
// the following line will create two type errors, which?
//var invalidContract: Contract<Being> = new Contract(beings);
