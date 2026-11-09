
/*
Anynoymus function - function don't name
- it can assign only to variable
*/

let sumInt = function (a: number, b: number) {
    return a + b;
}
console.log(sumInt(2, 3));

//Covert above function into Anynoymus function
let sumInt1 = (c: number, d: number) => c + d;
console.log(sumInt1(2, 3));


console.log("********* Normal function *************");

function multi(a: number, b: number) {
    return a * b;
}
console.log(multi(2, 3));

console.log("********* variable Scope function *************");
//1. 

