/// <reference path="lib/jquery/jquery.d.ts" />
var Person = (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
})();
// defines an JQuery selector as parameter
function greeter(element, person) {
    var message = "Hallo " + person.name;
    element[0].innerHTML = message;
}
// usual stuff with JQuery
$(document).ready(function () {
    var person = new Person("Florian");
    greeter($("#status"), person);
});
