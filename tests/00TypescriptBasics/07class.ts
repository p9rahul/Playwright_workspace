class Emp {

    private name: string;
    private age: number

    constructor(name: string, age: number) {
        this.age = age,
            this.name = name
    }

    public showEmp() {
        console.log(this.name, this.age);

    }

    public location() {
        console.log("Location :Bangalore");
    }
}

const emp = new Emp("Rahul", 36);
emp.showEmp();
emp.location();