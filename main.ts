#! /usr/bin/env node
// Student Management System
import inquirer from "inquirer";
import chalk from "chalk";

// Define a Student Class
class Student { static counter = 12000;
    id : number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name:string){
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 300;
    }
    // Method to enroll a student in course
    enroll_course(course:string){
        this.courses.push(course);
    }
    // Method to view a student balance
    view_balance(){
        console.log(chalk.green.bold(`Balance for ${this.name} : $${this.balance}`));
    }
    // Method to pay student fees
    pay_fees(amount:number){
        this.balance -= amount;
        console.log(chalk.green.bold(`$${amount} Fess paid successfully for ${this.name}`));
        console.log(chalk.white.bold(`Remaining balance : $${this.balance}`));
    }
    // Method to display Student Status
    show_status(){
        console.log(chalk.cyan.bold(`ID: ${this.id}`));
        console.log(chalk.cyan.bold(`Name: ${this.name}`));
        console.log(chalk.cyan.bold(`Courses: ${this.courses}`));
        console.log(chalk.cyan.bold(`Balance: $${this.balance}`));
    }
}
// Defining a Student_manager class to manage students
class Student_manager {
    students: Student[]

    constructor(){
        this.students = [];
    }

// Method to add a new student
add_student(name:string){
    let student = new Student(name);
    this.students.push(student);
    console.log(chalk.green.bold(`Student : ${name} added successfully. Student ID : ${student.id}`));
    }

// Method to enroll a student in a course
enroll_student(student_id:number , course:string){
    let student = this.find_student(student_id);
    if(student){
        student.enroll_course(course);
        console.log(chalk.green.bold(`${student.name} enrolled in ${course} successfully`));
    }
}

// Method to view a Student balance
view_student_balance(student_id:number){
    let student = this.find_student(student_id);
    if(student){
        student.view_balance();
    }
    else {
        console.log(chalk.red.bold("Student not found. Please enter a correct Student ID"));
    }
}

// Method to find a student by student_id
find_student(student_id:number){
    return this.students.find(std => std.id === student_id);
}

// Method to pay Student fees
pay_student_fees(student_id:number,amount:number){
    let student = this.find_student(student_id);
    if(student){
        student.pay_fees(amount);
    } 
    else {
        console.log(chalk.red.bold("Student not found. Please enter a correct Student ID"));
    }
}

// Method to display Student Status
show_student_status(student_id: number){
    let student = this.find_student(student_id);
    if(student){
        student.show_status();
       }
    }
}
// Main function to run the Program
async function main(){
    console.log(chalk.magenta.bold("Welcome to Code With Saba - Student Management System"));
    console.log(chalk.blue.bold("-".repeat(55)));

    let student_manager = new Student_manager();

    // while loop to keep program running
    while(true){
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices:[
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);

    // Using switch case to handle user choice
        switch(choice.choice){
        case "Add Student" : 
        let name_input = await inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: chalk.yellow.bold("Enter a Student Name:"),
            }
        ]);
        student_manager.add_student(name_input.name);
        break;

        case "Enroll Student" :
        let course_input = await inquirer.prompt([
            {
                name: "student_id",
                type: "number",
                message: chalk.yellow.bold("Enter a Student ID:"),
            },
            {
                name: "course",
                type: "input",
                message: chalk.yellow.bold("Enter a Course Name:"),
            }
        ]);
        student_manager.enroll_student(course_input.student_id,course_input.course);
        break;

        case "View Student Balance" :
        let balance_input = await inquirer.prompt([
            {
                name: "student_id",
                type: "number",
                message: chalk.yellow.bold("Enter a Student ID:"),
            }
        ]);
        student_manager.view_student_balance(balance_input.student_id);
        break;

        case "Pay Fees" :
        let fees_input = await inquirer.prompt([
            {
                name: "student_id",
                type: "number",
                message: chalk.yellow.bold("Enter a Student ID:"),
            },
            {
                name: "amount",
                type: "number",
                message: chalk.yellow.bold("Enter the amount to pay:")
            }
        ]); 
        student_manager.pay_student_fees(fees_input.student_id , fees_input.amount);
        break;

        case "Show Status" :
        let status_input = await inquirer.prompt([
            {
                name: "student_id",
                type: "number",
                message: chalk.yellow.bold("Enter a Student ID:")
            }
        ]);
        student_manager.show_student_status(status_input.student_id);
        break;

        case "Exit" : 
        console.log(chalk.white.bold("Exiting..."));
        process.exit();
        }
    }
}
// Calling a main function
main();
    

    

