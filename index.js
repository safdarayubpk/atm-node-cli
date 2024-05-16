#!/usr/bin/env node
// Import the necessary modules
import inquirer from "inquirer";
import chalk from "chalk";
// ASCII art of an ATM machine
const asciiArt = `
  _________
 /         \\
|   ATM     |
|  _______  |
| |       | |
| |       | |
| |_______| |
|  _______  |
| |   $   | |
| |_______| |
|___________|
`;
console.log(chalk.yellow(asciiArt));
// Initialize total balance and pin number
let totalBalance = 10000;
const pinNumber = 1234;
// Main function to start the ATM program
async function main() {
    // Prompt the user to enter their PIN
    let pinEntered = await inquirer.prompt([{
            name: 'pin',
            type: 'number',
            message: 'Enter your pin code : '
        }]);
    // Check if the entered PIN matches the stored PIN
    if (pinEntered.pin === pinNumber) {
        // If the PIN is correct, prompt the user for account type and transaction method
        let atmQuestions = await inquirer.prompt([{
                name: 'accountType',
                type: 'list',
                message: 'Please select your account type : ',
                choices: ['Current Account', 'Savings Account']
            },
            {
                name: 'transMethod',
                message: 'Please select your transaction method : ',
                type: 'list',
                choices: ['Fast Cash', 'Cash Withdrawal']
            }]);
        // If the selected transaction method is 'Cash Withdrawal'
        if (atmQuestions.transMethod === 'Cash Withdrawal') {
            // Prompt the user to enter the withdrawal amount
            let withdrawAmount = await inquirer.prompt([{
                    name: 'withdrawal',
                    type: 'number',
                    message: 'Enter the amount : '
                }]);
            // Check if the total balance is sufficient for the withdrawal
            if (totalBalance >= withdrawAmount.withdrawal) {
                // If sufficient, deduct the withdrawal amount from the total balance
                totalBalance -= withdrawAmount.withdrawal;
                console.log(chalk.green(`Transaction Successful! Your current balance is : ${totalBalance}`));
            }
            else {
                // If insufficient, display an error message
                console.log(chalk.red('Transaction Failed! Insufficient Balance'));
            }
        }
        else {
            // If the selected transaction method is 'Fast Cash'
            // Prompt the user to select a predefined withdrawal amount
            let fastCashAmount = await inquirer.prompt([
                {
                    name: 'fastCash',
                    type: 'list',
                    message: 'Select the amount you want to withdraw: ',
                    choices: [2000, 5000, 10000]
                }
            ]);
            // Check if the total balance is sufficient for the fast cash withdrawal
            if (totalBalance >= fastCashAmount.fastCash) {
                // If sufficient, deduct the withdrawal amount from the total balance
                totalBalance -= fastCashAmount.fastCash;
                console.log(chalk.green(`Transaction Successful! Your current balance is : ${totalBalance}`));
            }
            else {
                // If insufficient, display an error message
                console.log(chalk.red('Transaction Failed! Insufficient Balance'));
            }
        }
    }
    else {
        // If the entered PIN is incorrect, display an error message
        console.log(chalk.red('Incorrect PIN entered'));
    }
}
// Call the main function to start the ATM program
main();
