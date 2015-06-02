var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
function echo(message) {
    document.write(String(message) + '<br />');
}
function getPropertyNames(object, onlyOwnProperties) {
    if (onlyOwnProperties === void 0) { onlyOwnProperties = true; }
    var names = [];
    for (var property in object) {
        if (!onlyOwnProperties || object.hasOwnProperty(property)) {
            names.push(property);
        }
    }
    return names;
}
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
    Shape.prototype.destroyInAWhile = function (seconds) {
        var _this = this;
        window.setTimeout(function () { _this.destroy(); }, 1000 * seconds);
    };
    Shape.prototype.destroy = function () {
        throw new Error('Abstract shape cannot be destroyed.');
    };
    Shape.idCounter = 1;
    return Shape;
})();
var shape = new Shape();
echo(shape.id);
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
        echo('-- drawing circle with radius ' + this.radius + ' --');
    };
    Circle.prototype.destroy = function () {
        echo('-- destroying circle --');
    };
    return Circle;
})(Shape);
var circle = new Circle(5);
echo(circle.id);
echo(circle.area);
circle.area = 78;
echo(circle.area);
circle['area'] = 79;
echo(circle['area']);
circle.draw();
echo(getPropertyNames(circle));
echo(getPropertyNames(circle, false));
circle.destroyInAWhile(5);
