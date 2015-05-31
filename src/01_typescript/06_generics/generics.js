var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ReadOnly = (function () {
    function ReadOnly(data) {
        this.data = data;
    }
    ReadOnly.prototype.getData = function () {
        console.log(this.data);
    };
    return ReadOnly;
})();
var readOnlyNumber = new ReadOnly(42);
readOnlyNumber.getData();
var readOnlyText = new ReadOnly("ReadOnly Generic");
readOnlyText.getData();
var Being = (function () {
    function Being(age) {
        this.age = age;
    }
    Being.prototype.getAge = function () {
        return this.age;
    };
    return Being;
})();
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
var Contract = (function () {
    function Contract(persons) {
        this.persons = persons;
    }
    Contract.prototype.joinData = function () {
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
