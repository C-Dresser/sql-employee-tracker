const fs = require('fs');
const inquirer = require('inquirer');

/////////////////////  OPTIONS LIST  ///////////////////////////
const mainMenu = async () => {
    const choices = [
        'View All Employees',
        'Add Employee',
        'Update Employee Role',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'Add Department',
        'Quit',
    ];
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'Select an action:',
        choices,
    });

/////////////  SWITCH CASES  ////////////////////
    switch (action) {
        case 'View All Employees':
            console.log('YOU SELECTED: View All Employees');
            break;

        case 'Add Employee':
            console.log('YOU SELECTED: Add Employee');
            break;

        case 'Update Employee Role':
            console.log('YOU SELECTED: Update Employee Role');
            break;

        case 'View All Roles':
            console.log('YOU SELECTED: View All Roles');
            break;

        case 'Add Role':
            console.log('YOU SELECTED: Add Role');
            break;

        case 'View All Departments':
            console.log('YOU SELECTED: View All Departments');
            break;

        case 'Add Department':
            console.log('YOU SELECTED: Add Department');
            break;

        case 'Quit':
            process.exit();
    }
//////////////////////  CALL MENU AFTER SELECTION, TEMPORARY FOR TESTING  ////////////////////////////////////////
    mainMenu();
};

function init() {
    console.log('Welcome to EMPLOYEE MANAGER 2K24!!!');
    mainMenu();
}

init();
