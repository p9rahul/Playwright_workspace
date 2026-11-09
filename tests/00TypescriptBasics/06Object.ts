//person Object is collection of properties
let person = {
    firstName: "Rahul",
    lastName: "kumar",
    fullName: function () {
        console.log(this.firstName + this.lastName);
    }
}

console.log(person.firstName)

//Assign property
// person.gender ='Male';

//Print vlaue of all property
for (let key in person) {
    console.log(key);
}


console.log(person.fullName);

console.log(person);





