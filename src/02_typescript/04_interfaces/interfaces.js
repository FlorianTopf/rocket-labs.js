function printLabel(labelledObj) {
    console.log(labelledObj.label);
}
var myObj1 = { size: 10, label: "Size 10 Object" };
printLabel(myObj1);
function createSquare(config) {
    var newSquare = { color: "white", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: "black" });
var mySearch;
mySearch = function (source, subString) {
    var result = source.search(subString);
    if (result == -1) {
        return false;
    }
    else {
        return true;
    }
};
console.log(mySearch('Hello World', 'World'));
var myArray;
myArray = ["Florian", "Sabrina"];
var myWrongArray;
var CompanyCar = (function () {
    function CompanyCar(id, brand, type, productionYear) {
        this.id = id;
        this.brand = brand;
        this.type = type;
        this.productionYear = productionYear;
    }
    CompanyCar.prototype.info = function () {
        return this.brand + " " + this.type + ", " + this.productionYear;
    };
    return CompanyCar;
})();
var car = new CompanyCar(1, "VW", "Passat", 2010);
console.log(car.info());
