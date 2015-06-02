/**
 * Created by vesela on 01.06.15.
 */
/**
 * These two keywords define accessor functions: a getter and a setter
 * for the fullName property. When the property is accessed, the return value from the getter is used.
 * When a value is set, the setter is called and passed the value that was set.
 * It's up to you what you do with that value, but what is returned from the setter
 * is the value that was passed in – so you don't need to return anything.
 *
 */
var person = {
    firstName: 'Jimmy',
    lastName: 'Smith',
    get fullName() {
        return this.firstName + ' ' + this.lastName;
    },
    set fullName (name) {
        var words = name.toString().split(' ');
        this.firstName = words[0] || '';
        this.lastName = words[1] || '';
    }
}

person.fullName = 'Jack Franklin';
console.log(person.firstName); // Jack
console.log(person.lastName) // Franklin

/**
 *  The official way: Object.defineProperty
 *  Along with the inline method of declaring getters and setters, it can also be done more explicitly
 *  via Object.defineProperty (MDN Documentation). This method takes three arguments.
 *  The first is the object to add the property to, the second is the name of the property,
 *  and the third is an object that describes the property (known as the property's descriptor).
 *  Here's an example that replicates the above example:
 *
 */

var person = {
    firstName: 'Jimmy',
    lastName: 'Smith'
};

Object.defineProperty(person, 'fullName', {
    get: function() {
        return firstName + ' ' + lastName;
    },
    set: function(name) {
        var words = name.split(' ');
        this.firstName = words[0] || '';
        this.lastName = words[1] || '';
    }
});


