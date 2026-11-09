/*
Interface - 
An interface defines the structure or blueprint that an object or class must follow.

For example, imagine we have a login page. Every login operation requires
 a username, password, and login method.

- An interface defines what is required, not how the functionality works.

Class
- A class is a blueprint used to create objects.
     It contains properties and methods with actual implementation

     
- Important differences
Interface	                                Class
Defines a blueprint/contract	     Provides implementation
Uses interface keyword	             Uses class keyword
Cannot create objects directly	     Can create objects
Does not have a constructor	         Can have a constructor
Class uses implements	             Class implements an interface

- Remember these three things for interviews:
1. Interface – What should be available?
2. Class – How does it work?
3. Object – How do we use it?
*/

// Step 1: Create an Interface
interface LoginDetails {
    username: string;
    password: string;

    login(): void;
}

// Step 2: Create a Class and implement the Interface
class LoginPage implements LoginDetails {

    username: string;
    password: string;
    age: number;

    constructor(username: string, password: string, age: number) {
        this.username = username;
        this.password = password;
        this.age = age
    }

    login(): void {
        console.log("Entering Username: " + this.username);
        console.log("Entering Password: " + this.password);
        console.log("Entering Age: " + this.age);
        console.log("Clicking Login Button");
        console.log("Login Successful");
    }
}

// Step 3: Create an Object
const login = new LoginPage("Rahul", "Test123", 35);

login.login();