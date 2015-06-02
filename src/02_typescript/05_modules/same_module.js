// this will resolve the dependency on compile time
/// <reference path="modules.ts"/>
var SalutationModule;
(function (SalutationModule) {
    var salutation = "GoodBye";
    function otherSalute(name) {
        console.log(salutation + " " + name + "!");
    }
    SalutationModule.otherSalute = otherSalute;
    var OtherStuff = (function () {
        function OtherStuff(size) {
            this.size = size;
        }
        OtherStuff.prototype.getSize = function () {
            console.log(this.size);
        };
        return OtherStuff;
    })();
    SalutationModule.OtherStuff = OtherStuff;
})(SalutationModule || (SalutationModule = {}));
SalutationModule.salute("Welt");
var stuff1 = new SalutationModule.Stuff(15);
stuff1.getSize();
SalutationModule.otherSalute("Welt");
var otherStuff1 = new SalutationModule.OtherStuff(20);
otherStuff1.getSize();
