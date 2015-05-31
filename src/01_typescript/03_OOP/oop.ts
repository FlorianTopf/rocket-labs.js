class Shape  {
    static idCounter: number = 1;

    private _id: number;

    public constructor() {
        this._id = Shape.idCounter++;
    }

    public get id(): string {
        return 'Object #' + this._id;
    }

    protected get area(): number {
        return undefined;
    }

    public draw(): void {
        throw new Error('Abstract shape cannot be rendered.');
    }
}

class Circle extends Shape
{
    private radius: number;

    public constructor(radius: number) {
        super();

        this.radius = radius;
    }

    public get area(): number {
        return Math.PI * Math.pow(this.radius, 2);
    }

    public set area(area: number) {
        this.radius = Math.floor(Math.sqrt(area / Math.PI));
    }

    public draw(): void {
        // canvas magic
    }
}

let shape = new Shape();
console.log(shape.id);
// output: "Object #1"

// won't compile
// echo (shape.area);

let circle = new Circle(5);
console.log(circle.id);
// output: Object #2
console.log(circle.area);
// output: 78.53981633974483

circle.area = 78;
console.log(circle.area);
// output: 50.26548245743669

circle['area'] = 79;
console.log(circle['area']);
// output: 78.53981633974483

shape.draw();
// output: Exception

circle.draw();
// output: draws circle to canvas
