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
var list1: number[] = [1, 2, 3];
var list2: Array<number> = [1, 2, 3];

// type aliases are also here!
type Numbers = number[];
var list3: Numbers = [1, 2, 3];

// tuples
var tuple: [number, string] = [3, "three"];

// enums
enum Color {Red, Green, Blue}
var c: Color = Color.Green;

name = "Max"; // this works
// name = 0; // this won't compile

// template strings
var greeting = `Hello, ${name}! Your name has ${name.length} characters`;
console.log(greeting);

// union types
// just forget about interface for the moment
interface RunOptions {
	program: string;
	commandline: string[]|string;
}

var opts: RunOptions = {};
// this won't compile
//opts.commandline = [42];
// these assignments will work
opts.commandline = ['hello', 'world'];
opts.commandline = 'hello world';

// type guards
// just forget about functions for the moment
function formatCommandline(c: string|string[]) {
    if(typeof c === 'string') {
    	// typescript can infer type here
        return c.trim();
    } else {
    	// typescript can infer type here
        return c.join(' ');
    }
}

console.log(formatCommandline(opts.commandline));
