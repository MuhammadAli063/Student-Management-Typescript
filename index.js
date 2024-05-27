#! /usr/bin/env node
import inquirer from "inquirer";
class student {
    id;
    name;
    coursesEnrolled;
    feesAmount;
    constructor(id, name, coursesEnrolled, feesAmount) {
        this.id = id;
        this.name = name;
        this.coursesEnrolled = coursesEnrolled;
        this.feesAmount = feesAmount;
    }
}
let basedId = 0;
let studentId = "";
let continueEnrollment = true;
let students = [];
do {
    let action = await inquirer.prompt({
        name: "ans",
        type: "list",
        message: "Please select an option:\n",
        choices: ['Enroll a student', 'Show student status']
    });
    if (action.ans === 'Enroll a student') {
        let studentName = await inquirer.prompt({
            name: "ans",
            type: "input",
            message: "Please Enter Your Name: ",
        });
        let trimedStudentName = (studentName.ans).trim().toLowerCase();
        let studentNameCheck = students.map(obj => obj.name);
        console.log(`studentNameCheck = ${studentNameCheck}`);
        if (studentNameCheck.includes(trimedStudentName) === false) {
            if (trimedStudentName !== "") {
                basedId++;
                studentId = "STID" + basedId;
                console.log("\n\t Your Account is created");
                console.log(`Welcome, ${trimedStudentName}`);
                let course = await inquirer.prompt({
                    name: "ans",
                    type: 'list',
                    message: 'Please select course',
                    choices: ['IT', 'AI', 'CS', 'Blockchain'],
                });
                let courseFees = 0;
                switch (course.ans) {
                    case 'IT':
                        courseFees = 14000;
                        break;
                    case 'AI':
                        courseFees = 25000;
                        break;
                    case 'CS':
                        courseFees = 2000;
                        break;
                    case 'Blockchain':
                        courseFees = 18000;
                        break;
                }
                let courseConfirm = await inquirer.prompt({
                    name: 'ans',
                    type: 'confirm',
                    message: 'Do you want to enroll in this course?'
                });
                if (courseConfirm.ans === true) {
                    let Student = new student(studentId, trimedStudentName, [course.ans], courseFees);
                    students.push(Student);
                    console.log("You Have Registered");
                }
            }
            else {
                console.log("InValid Name");
            }
        }
        else {
            console.log(`Already, ${trimedStudentName} Was Registered`);
        }
    }
    else if (action.ans === "Show student status") {
        if (students.length != 0) {
            let studentNameChecking = students.map(res => res.name);
            let selectedStudent = await inquirer.prompt({
                name: "ans",
                type: 'list',
                message: 'Select a Student To show records !',
                choices: studentNameChecking
            });
            let findStudent = students.find(Student => Student.name === selectedStudent.ans);
            console.log(`\n Student ID is: ${findStudent?.id} \n`);
            console.log(`\n Student Name is: ${findStudent?.name} \n`);
            console.log(`\n Student Enrolled Course is: ${findStudent?.coursesEnrolled} \n`);
            console.log(`\n Student Fees is: ${findStudent?.feesAmount} \n`);
        }
        else {
            console.log("Sorry, their is No Record Found!");
        }
    }
} while (continueEnrollment);
{
}
