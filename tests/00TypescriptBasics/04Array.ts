

/* 
Array - is a collection of elements.
#Declare Array 
way-1. let marks: any = new Array(34, 54, 67, 59, 80, 85);
way-2 let marks = [34, 54, 67, 59, 80, 85];

*/
let marks = [34, 54, 67, 59, 80, 85];

//iterate Array
for (let i = 0; i < marks.length; i++) {
    console.log(marks[i])
}

// Array - element Re-assingment
marks[0] = 91;
console.log("Array Elements : ", marks)

//Slice array or break down or create subArray
let subArray = marks.slice(2, 5);
console.log("Sub Array :", subArray);

//Check an element is indules or not
console.log("Element present or not :", marks.includes(100));
console.log("Index of Array or Element present at Index :", marks.indexOf(67));


console.log("************ Sort *******************");
let fruites = ["orange", "banana", "apple", "guava"];
console.log("String Sort - ", fruites.sort())

//Number element sort -> have some issue 
let numSort = [34, 54, 67, 59, 80, 85, 3];
console.log("Number Sort - ", numSort.sort());
console.log("Number toSorted - ", numSort.toSorted());


console.log("************ Reduce() *******************");
//function - reduce filter map -"use when you need to "accumulate" value like sum elements"
//1. Add array elements
let sum = 0;
for (let i = 0; i < marks.length; i++) {
    sum = sum + marks[i];
}
console.log("Sum of Array - ", sum)

//2. Add Array elements with "reduce filter" 1st argument is callbackfn 
let Total = marks.reduce((sum1, mark) => sum1 + mark, 0);
console.log("Total Marks :", Total);

console.log("************ Filter() *******************");
// Question - Create an Array and create a subArray which has only even numbers.

let scores = [12, 23, 35, 46, 66, 77];
let evenScore = []; //initilize empty array
for (let i = 0; i < scores.length; i++) {

    if (scores[i] % 2 == 0) {
        evenScore.push(scores[i]);
    }
}
console.log("Score Array : ", scores);
console.log("Even Score Array : ", evenScore);

// Now covert same code with Filter method
let evenScoreArray = scores.filter(score => score % 2 == 0);
console.log("Even Score Array Using filter: ", evenScoreArray);

console.log("************ Array Map() *******************");
/*
Map - one vaue to another value
Question - Create an array and multiple each number with 3
*/
let nums = [12, 23, 35, 46, 66, 77];
const evenNums = nums.map(num => num * 3);
console.log("Map Example : ", evenNums);

console.log("************ Filer -> Map -> reduce together *******************");

let allAray = scores.filter(score => score % 2 == 0)
    .map(score => score * 3)
    .reduce((sum1, val1) => sum1 + val1, 0);
console.log("Filter -> Map -> Reduce :", allAray)