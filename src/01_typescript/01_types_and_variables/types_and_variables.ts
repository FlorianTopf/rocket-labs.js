// simple examples of type hints
var name: string = "Max Mustermann";
var age: number;
var income: number;
var isHappy: boolean = true;
var unknownType: any; // can be of any type
var unknownType = undefined; // will assign 'undefined' explicitly

unknownType = "i'm unknown";
unknownType = 42;

// array of numbers
var list: number[] = [1, 2, 3];
var list: Array<number> = [1, 2, 3];

// tuples
var tuple: [number, string] = [3, "three"];

enum Color {Red, Green, Blue}
var c: Color = Color.Green;

name = "Max"; // this works
// name = 0; // this won't compile
