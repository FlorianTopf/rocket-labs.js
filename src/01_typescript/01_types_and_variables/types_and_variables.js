// simple examples of type hints
var name = "Max Mustermann";
var age;
var income;
var isHappy = true;
var unkownType; // can be of any type
var unkoenType = undefined; // will assign 'undefined' explictly
unkownType = "i'm unkown";
unkownType = 42;
// array of numbers
var list = [1, 2, 3];
var list = [1, 2, 3];
// tuples
var tuple = [3, "three"];
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
var c = Color.Green;
name = "Max"; // this works
//name = 0; // this won't compile
