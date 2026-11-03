let myMap = new Map<string, number>();
myMap.set("key1", 10);
myMap.set("key2", 20);

console.log(myMap.get("key1")); // Output: 10
console.log(myMap.get("key2")); // Output: 20


let myMap2 = new Map();
myMap2.set("key1", 10);
myMap2.set("key2", 20);

console.log(myMap2.get("key1")); // Output: 10
console.log(myMap2.get("key2")); // Output: 20

myMap2.set("key3", "Hello"); // This is allowed 
console.log(myMap2); // Output: Hello

