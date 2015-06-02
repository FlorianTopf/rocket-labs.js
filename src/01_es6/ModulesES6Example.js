/**
 * Created by vesela on 01.06.15.
 */

/** Named exports (several per module)

A module can export multiple things by prefixing their declarations with the keyword export.
 These exports are distinguished by their names and are called named exports.**/

    //------ lib.js ------
    //
export const sqrt = Math.sqrt;
export function square(x) {
    return x * x;
}
export function diag(x, y) {
    return sqrt(square(x) + square(y));
}

//------ main.js ------
import { square, diag } from 'lib';
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5

/**There are other ways to specify named exports (which are explained later),
 * but I find this one quite convenient: simply write your code as if there were no outside world, then label everything that you want to export with a keyword.

 If you want to, you can also import the whole module and refer to its named exports via property notation:
 */


    //------ main.js ------
import * as lib from 'lib';
console.log(lib.square(11)); // 121
console.log(lib.diag(4, 3)); // 5


/**
 * Default exports (one per module)
 * Modules that only export single values are very popular in the Node.js community.
 * But they are also common in frontend development where you often have constructors/classes for models,
 * with one model per module. An ECMAScript 6 module can pick a default export,
 * the most important exported value. Default exports are especially easy to import.
 *
 *
 * The following ECMAScript 6 module “is” a single function:
 */

//------ myFunc.js ------
export default function () { ... };

//------ main1.js ------
import myFunc from 'myFunc';
myFunc();

/**
 * An ECMAScript 6 module whose default export is a class looks as follows:
 */

//------ MyClass.js ------
export default class { ... };

//------ main2.js ------
import MyClass from 'MyClass';
let inst = new MyClass();

/**
 * Note: The operand of the default export declaration is an expression,
 * it often does not have a name. Instead, it is to be identified via its module’s name.
 */


