// simple examples of type hints
var name = "Max Mustermann";
var age;
var income;
var isHappy = true;
var unknownType; // can be of any type
var unknownType = undefined; // will assign 'undefined' explicitly
unknownType = "i'm unknown";
unknownType = 42;
// array of numbers
var list1 = [1, 2, 3];
var list2 = [1, 2, 3];
var list3 = [1, 2, 3];
// tuples
var tuple = [3, "three"];
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
name = "Max"; // this works
// name = 0; // this won't compile
// template string
var greeting = "Hello, " + name + "! Your name has " + name.length + " characters";
console.log(greeting);
