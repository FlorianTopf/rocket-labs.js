/// <reference path="jquery.d.ts" />
var Person = (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
})();
function greeter(element, person) {
    var message = "Hallo " + person.name;
    element[0].innerHTML = message;
}
$(document).ready(function () {
    var person = new Person("Florian");
    greeter($("#status"), person);
});
