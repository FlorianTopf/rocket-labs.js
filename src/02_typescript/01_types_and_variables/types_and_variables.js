var name = "Max Mustermann";
var age;
var income;
var isHappy = true;
var unknownType;
var unknownType = undefined;
unknownType = "i'm unknown";
unknownType = 42;
var list1 = [1, 2, 3];
var list2 = [1, 2, 3];
var list3 = [1, 2, 3];
var tuple = [3, "three"];
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
name = "Max";
var greeting = "Hello, " + name + "! Your name has " + name.length + " characters";
function greet() {
    console.log(greeting);
}
var opts = {};
opts.commandline = ['hello', 'world'];
opts.commandline = 'hello world';
function formatCommandline(c) {
    if (typeof c === 'string') {
        return c.trim();
    }
    else {
        return c.join(' ');
    }
}
console.log(formatCommandline(opts.commandline));
