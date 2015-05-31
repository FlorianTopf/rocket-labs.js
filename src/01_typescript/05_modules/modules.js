var SalutationModule;
(function (SalutationModule) {
    var salutation = "Hello";
    function salute(name) {
        console.log(salutation + " " + name + "!");
    }
    SalutationModule.salute = salute;
    var Stuff = (function () {
        function Stuff(size) {
            this.size = size;
        }
        Stuff.prototype.getSize = function () {
            console.log(this.size);
        };
        return Stuff;
    })();
    SalutationModule.Stuff = Stuff;
})(SalutationModule || (SalutationModule = {}));
SalutationModule.salute("Welt");
var stuff1 = new SalutationModule.Stuff(5);
stuff1.getSize();
var extStuff = SalutationModule.Stuff;
var stuff1 = new extStuff(10);
stuff1.getSize();
