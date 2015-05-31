/// <reference path="jquery.d.ts" />
class Person {
   public name;

   public constructor(name: string) {
		this.name = name;
	}
}
 
// defines an JQuery selector as parameter
function greeter (element: JQuery, person: Person) {
	var message = "Hallo " + person.name;
	element[0].innerHTML = message;
}

// usual stuff with JQuery
$(document).ready(function(){
	var person = new Person("Florian");
    greeter($("#status"), person);
});