// a function returning nothing with default value
function sayHello(name: string = "Welt"): void {
	alert("Hallo " + name);
}

// a function return string with optional value
function sayHello1(name?: string): string {
	return "Hello " + name;
}

// rest parameters
function buildName(firstName: string, ...restOfName: string[]) {
	return firstName + " " + restOfName.join(" ");
}

sayHello("Max"); // will compile
//sayHello(5); // will fail to compile

// function declaration
var func: (a: number, b: number) => number;

// function implementation
function add1(x: number, y: number): number {
	return x + y
}
// function implementation (the same in js as obove)
function add2(x: number, y: number): number => { x + y };

// assignment
func1 = add1;
func2 = add2;
// call
var num: number = func1(17, 2);

// anonymous function including parameter and return types
var sum1 = function(x: number, y: number): number { return x+y; };

// anonymous function with function type => type inference for x and y
var sum2: (a: number, b: number) => number = function (x, y) { return x+y };
sum2(1, 5); // will compile
//sum2("Hello", "World"); // will fail to compile

// lambdas and closures
var deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        // lambda function => allows to access 'this' => parent scope of deck
        // as we see in the compilation it assigns the parent scope to a local variable
        return () => {
        // this call wont work, since 'this' refers to local scope	
        //return function {	
            var pickedCard = Math.floor(Math.random() * 52);
            var pickedSuit = Math.floor(pickedCard / 13);
			
			// this works with lambdas
            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

// call
var cardPicker = deck.createCardPicker();
var pickedCard = cardPicker();
alert("card: " + pickedCard.card + " of " + pickedCard.suit);
