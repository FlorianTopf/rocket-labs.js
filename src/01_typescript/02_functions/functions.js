// a function returning nothing with default value
function sayHello(name) {
    if (name === void 0) { name = "Welt"; }
    alert("Hallo " + name);
}
// a function return string with optional value
function sayHello1(name) {
    return "Hello " + name;
}
// rest parameters
function buildName(firstName) {
    var restOfName = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restOfName[_i - 1] = arguments[_i];
    }
    return firstName + " " + restOfName.join(" ");
}
sayHello("Max"); // will compile
//sayHello(5); // will fail to compile
// function declaration
var func;
// function implementation
function add(x, y) {
    return x + y;
}
// assignment
func = add;
// call
var num = func(17, 2);
// anonymous function including parameter and return types
var sum1 = function (x, y) { return x + y; };
// anonymous function with function type => type inference for x and y
var sum2 = function (x, y) { return x + y; };
sum2(1, 5); // will compile
//sum2("Hello", "World"); // will fail to compile
// lambdas and closures
var deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
        var _this = this;
        // lambda function => allows to access 'this' => parent scope of deck
        // as we see in the compilation it assigns the parent scope to a local variable
        return function () {
            // this call wont work, since 'this' refers to local scope	
            //return function {	
            var pickedCard = Math.floor(Math.random() * 52);
            var pickedSuit = Math.floor(pickedCard / 13);
            // this works with lambdas
            return { suit: _this.suits[pickedSuit], card: pickedCard % 13 };
        };
    }
};
// call
var cardPicker = deck.createCardPicker();
var pickedCard = cardPicker();
alert("card: " + pickedCard.card + " of " + pickedCard.suit);
