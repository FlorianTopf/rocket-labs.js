var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Shape = (function () {
    function Shape() {
        this._id = Shape.idCounter++;
    }
    Object.defineProperty(Shape.prototype, "id", {
        get: function () {
            return 'Object #' + this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "area", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Shape.prototype.draw = function () {
        throw new Error('Abstract shape cannot be rendered.');
    };
    Shape.idCounter = 1;
    return Shape;
})();
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(radius) {
        _super.call(this);
        this.radius = radius;
    }
    Object.defineProperty(Circle.prototype, "area", {
        get: function () {
            return Math.PI * Math.pow(this.radius, 2);
        },
        set: function (area) {
            this.radius = Math.floor(Math.sqrt(area / Math.PI));
        },
        enumerable: true,
        configurable: true
    });
    Circle.prototype.draw = function () {
    };
    return Circle;
})(Shape);
var shape = new Shape();
console.log(shape.id);
var circle = new Circle(5);
console.log(circle.id);
console.log(circle.area);
circle.area = 78;
console.log(circle.area);
circle['area'] = 79;
console.log(circle['area']);
shape.draw();
circle.draw();
