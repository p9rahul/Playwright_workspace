
// Parent Class
class Employee {

    employeeName: string;
    salary: number;

    constructor(name: string, salary: number) {
        this.employeeName = name;
        this.salary = salary;
    }

    employeeDetails() {
        console.log("Employee Name: " + this.employeeName);
        console.log("Salary: " + this.salary);
    }
}

// Child Class
class Developer extends Employee {

    programmingLanguage: string;

    constructor(name: string, salary: number, language: string) {

        // Calling Parent Class Constructor
        super(name, salary);

        this.programmingLanguage = language;
    }

    developerDetails() {
        console.log("Programming Language: " + this.programmingLanguage);
    }
}

// Creating Object
const dev = new Developer("Rahul", 50000, "TypeScript");

// Calling Parent Class Method
dev.employeeDetails();

// Calling Child Class Method
dev.developerDetails();
