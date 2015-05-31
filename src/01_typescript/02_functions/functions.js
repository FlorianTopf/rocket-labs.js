function sayHello(name) {
    if (name === void 0) { name = "Welt"; }
    alert("Hallo " + name);
}
function sayHello1(name) {
    return "Hello " + name;
}
function buildName(firstName) {
    var restOfName = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restOfName[_i - 1] = arguments[_i];
    }
    return firstName + " " + restOfName.join(" ");
}
sayHello("Max");
var func;
function add1(x, y) {
    return x + y;
}
function add2(x, y) { return x + y; }
var func1 = add1;
var func2 = add2;
var num = func1(17, 2);
var sum1 = function (x, y) { return x + y; };
var sum2 = function (x, y) { return x + y; };
sum2(1, 5);
var suitsExample = ["hearts", "spades", "clubs", "diamonds"];
var deck = {
    suits: suitsExample,
    cards: Array(52),
    createCardPicker: function () {
        var _this = this;
        return function () {
            var pickedCard = Math.floor(Math.random() * 52);
            var pickedSuit = Math.floor(pickedCard / 13);
            return { suit: _this.suits[pickedSuit], card: pickedCard % 13 };
        };
    }
};
var cardPicker = deck.createCardPicker();
var pickedCard = cardPicker();
var suits = suitsExample;
alert("card: " + pickedCard.card + " of " + pickedCard.suit);
function pickCard(x) {
    if (typeof x == "object") {
        return Math.floor(Math.random() * x.length);
    }
    else if (typeof x == "number") {
        var pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
var myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
var pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);
var pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
