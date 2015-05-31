function echo(message) {
    document.write(String(message) + '<br />');
}

function getPropertyNames(object, onlyOwnProperties: boolean = true): string[] {
    let names = [];
    for (var property in object) {
        if (!onlyOwnProperties || object.hasOwnProperty(property)) {
            names.push(property);
        }
    }

    return names;
}

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

let shape = new Shape();

echo(shape.id);
// output: "Object #1"
// won't compile
// echo (shape.area);

//shape.draw();
// output: Exception

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
        echo('-- drawing circle with radius ' + this.radius + ' --');
    }
}

let circle = new Circle(5);
echo(circle.id);
// output: Object #2
echo(circle.area);
// output: 78.53981633974483

// this has no effect
//circle.id = 'test';
//echo (circle.id);
// output: Object #2

circle.area = 78;
echo(circle.area);
// output: 50.26548245743669

circle['area'] = 79;
echo(circle['area']);
// output: 78.53981633974483

circle.draw();
// output: draws circle to canvas

// show property names
echo(getPropertyNames(circle));
// output: _id, radius
echo(getPropertyNames(circle, false));
// output: _id,radius,constructor,area,draw,id
