
// TypeScript Simple Types ->TypeScript Primitives


// 1. Number 
let decimal: number = 6;
let hex: number = 0xf00d;       // Hexadecimal
let binary: number = 0b1010;     // Binary
let octal: number = 0o744;      // Octal
let float: number = 3.14;      // Floating point

console.log(decimal);

// 2. String
let color: string = "blue";
let fullName: string = 'John Doe';
let age: number = 30;
let sentence: string = `Hello, my name is ${fullName} and I'll be ${age + 1} next year.`;
console.log(sentence);

//3. Boolean
let isActive: boolean = true;
let hasPermission = false; // TypeScript infers 'boolean' type
console.log(isActive);

//4.const ES6 engine -> Constant - can't reassign value again
const uniqueKey: symbol = Symbol('description');
const obj = {
    [uniqueKey]: 'This is a unique property'
};
console.log(obj[uniqueKey]); // "This is a unique property"

// let,var - variable can be reassign but in const not
let num1: number = 34;
num1 = 50;
console.log("let -> variable can be Reassign", num1);

var num2: number = 34;
num2 = 50;
console.log("var -> variable can be Reassign", num2);

const num3: number = 34;
// num3 = 50;
console.log("Const -> variable can't be Reassign - Compile time error", num1);

/*
Interview answer: 
The main difference between let and var is that 
- let is block-scoped, whereas var is function-scoped.
- let does not allow redeclaration in the same scope, while var allows it.
- CTE - complie time error 
*/

/*
Symbol-
Creates unique identifiers.

Useful for creating unique property keys and constants.
*/
