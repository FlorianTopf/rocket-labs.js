// simple module
module SalutationModule {

	var salutation: string = "Hello";

	export function salute(name: string): void {
		console.log(salutation + " " + name + "!");
	}

	export class Stuff {
		private size: number;

		public constructor(size) {
		    this.size = size;
		}

		public getSize(): void { 
			console.log(this.size); 
		}
	} 
}

// everything 'export'ed is accessible from outside
SalutationModule.salute("Welt");

// everything is represented through the 'hierarchy' created by modules
var stuff1: SalutationModule.Stuff = new SalutationModule.Stuff(5);

stuff1.getSize();

// creating an alias
import extStuff = SalutationModule.Stuff;
// using the alias
var stuff1: extStuff = new extStuff(10);

stuff1.getSize();
