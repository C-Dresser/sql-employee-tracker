const fs = require('fs');
const inquirer = require('inquirer');

/////////////////////  OPTIONS LIST  ///////////////////////////
const options = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'options1',
        choices: [
        'View All Employees',
        'Add Employee',
        'Update Employee Role',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'Add Department',
        'Quit',
        ],
    },
]


function init() {
    console.log('Init function called!');
//    inquirer.prompt(questions).then((answers) => {
//      writeToFile('logo.svg', answers);
//    });
  }

init();