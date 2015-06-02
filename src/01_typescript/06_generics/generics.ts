// basic generic class
class ReadOnly<T> {
	private data: T;

	public constructor(data: T) {
	    this.data = data;
	}

	public getData(): void {
		console.log(this.data);
	}
}

// instantiation with type number
var readOnlyNumber: ReadOnly<number> = new ReadOnly(42);
// obviously won't work
//var readOnlyNumber: ReadOnly<number> = new ReadOnly("Test");

readOnlyNumber.getData();

// instantiation with type string
var readOnlyText = new ReadOnly<string>("ReadOnly Generic");

readOnlyText.getData();


// restricted generic class
//test object 1
class Being {
	protected age: number;

	public constructor(age: number) {
		this.age = age;
	}

	public getAge(): number {
		return this.age
	}
}

// test object 2
class Human extends Being {
	protected name: string;

	public constructor(name: string, age: number) {
		super(age);
	    this.name = name;
	}

	public getName(): string {
		return this.name;
	}
}
// test object 3
class SuperHuman extends Human {
	public constructor(name: string, age: number) {
	    super(name, age);
	}

	public getName(): string {
		return "Super-" + this.name;
	}
}

// this is the implementation
class Contract<T extends Human> {
	private persons: T[];

	public constructor(persons: T[]) {
	    this.persons = persons;
	}

	public joinData() {
		// lambdas a very nice with callbacks
		var names = this.persons.map(
			(e) => e.getName() + "," + e.getAge()
		);

		return names.join(' and ');
	}

	public getParties() {
		console.log(this.joinData())
	}
}

var persons: Human[] = [new Human("Florian", 31), new SuperHuman("Spock", 110)];

var contract: Contract<Human> = new Contract(persons);

contract.getParties();

var beings: Being[] = [new Human("Florian", 31), new Being(250)];
// the following line will create two errors, which?
//var invalidContract: Contract<Being> = new Contract(beings);
