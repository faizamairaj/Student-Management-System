#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let randomNumber = Math.floor(10000 + Math.random() * 9000);
let myBalance = 0;
let answer = await inquirer.prompt([
    {
        type: "input",
        name: "students",
        message: "Enter student name:",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please enter a non-empty value.";
        },
    },
    {
        type: "list",
        name: "courses",
        message: "Select the course to enrolled",
        choices: ["MS.office", "HTML", "Javascript", "Typescript", "Python"]
    }
]);
let tutionFee = {
    "MS.office": 2000,
    "HTML": 2500,
    "Javascript": 5000,
    "Typescript": 6000,
    "Python": 10000
};
console.log(chalk.bold.bgMagenta(`\n Tution Fees: ${tutionFee[answer.courses]}/-\n`));
console.log(chalk.bold.bgMagenta(`Balance: ${myBalance}\n`));
let paymentType = await inquirer.prompt([
    {
        type: "list",
        name: "payment",
        message: "Select payment method",
        choices: ["Bank Transfer", "EasyPaisa", "Jazzcash"]
    },
    {
        type: "input",
        name: "amount",
        message: "Transfer Money:",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please enter a non-empty value.";
        },
    }
]);
console.log(chalk.bold.bgGreen(`\nyou select payment method ${paymentType.payment}\n`));
let tutionFees = tutionFee[answer.courses];
let paymentAmount = parseFloat(paymentType.amount);
if (tutionFees === paymentAmount) {
    console.log(chalk.bold.bgBlue(`congratulations, you have successfully enrolled in ${answer.courses}.\n`));
    let ans = await inquirer.prompt([
        {
            type: "list",
            name: "select",
            message: "What would you like to do next?",
            choices: ["View Status", "Exit"]
        }
    ]);
    if (ans.select === "View Status") {
        console.log(chalk.bold.bgGreen("\n*******Status*********\n"));
        console.log(chalk.bold.bgYellow(`Student Name: ${answer.students}`));
        console.log(chalk.bold.bgYellow(`Student ID: ${randomNumber}`));
        console.log(chalk.bold.bgYellow(`Course: ${answer.courses}`));
        console.log(chalk.bold.bgYellow(`Tution Fees Paid: ${paymentAmount}`));
        console.log(chalk.bold.bgYellow(`Balance: ${myBalance += paymentAmount}`));
    }
    else {
        console.log(chalk.bold.italic.bgRed("\nExiting Student Managment System\n"));
    }
}
else {
    console.log(chalk.bold.bgGray("Invalid amount due to course\n"));
}
