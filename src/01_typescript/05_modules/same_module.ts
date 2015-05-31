// this will resolve the dependency on compile time
/// <reference path="modules.ts"/>

// simple module in another file
module SalutationModule {

	// this will not be overwritten since it's local
	var salutation: string = "GoodBye";

	export function otherSalute(name: string): void {
		console.log(salutation + " " + name + "!");
	}

	export class OtherStuff {
		private size: number;

		public constructor(size) {
		    this.size = size;
		}

		public getSize(): void { 
			console.log(this.size); 
		}
	} 
}

// the following code is still working
SalutationModule.salute("Welt");

// everything is represented through the 'hierarchy' created by modules
var stuff1: SalutationModule.Stuff = new SalutationModule.Stuff(15);

stuff1.getSize();

// new function of SalutationModule
SalutationModule.otherSalute("Welt");

var otherStuff1: SalutationModule.OtherStuff = new SalutationModule.OtherStuff(20)

otherStuff1.getSize();

// compile script with bundled mode
// tsc -out modules.js same_module.ts