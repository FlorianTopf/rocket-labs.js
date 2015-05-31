// simple example of how interfaces can be used
interface LabelledValue {
	label: string;
}

// using the interface as type hint
function printLabel(labelledObj: LabelledValue) {
	console.log(labelledObj.label);
}

// this object meets the interface requirements
var myObj1 = {size: 10, label: "Size 10 Object"};
// will compile
printLabel(myObj1);

// this object doesn't meet the requirements
//var myObj2 = {size: 10, name: "Size 10 Name"};
// will fail to compile
//printLabel(myObj2);


// optional properties in an interaces
interface SquareConfig {
	color?: string;
	width?: number; 
} 

// using the interface as type hint
function createSquare(config: SquareConfig): {color: string; area: number} {
  var newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
    // typechecker cries here, because there is no property 'collor'
    //newSquare.color = config.collor
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}
// call
var mySquare = createSquare({color: "black"});


// interfaces as function types
interface SearchFunc {
	(source: string, subString: string): boolean;
}
// usage of the function type
var mySearch: SearchFunc;
mySearch = (source: string, subString: string) => {
	var result = source.search(subString);
	if (result == -1) {
		return false;
	} else {
		return true;
	}
}
// call
console.log(mySearch('Hello World', 'World'));


// array types
interface StringArray {
	[index: number]: string
}

var myArray: StringArray 
myArray = ["Florian", "Sabrina"]

var myWrongArray: StringArray
//myWrongArray = [1, 2] // this will fail

// class types will be shown in next chapter!