const fs = require('fs');
const mysql = require('mysql2/promise'); // Import the promise-based version
const inquirer = require('inquirer');
const consoleTable = require('console.table');

//////////////////////  CREATS CONNECTION WITH DB  //////////////////////////
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'staff_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// ASCII art for "Employee Manager"
const employeeManagerArt = `
███████ ███    ███ ██████  ██       ██████  ██    ██ ███████ ███████     ███    ███  █████  ███    ██  █████   ██████  ███████ ██████  
██      ████  ████ ██   ██ ██      ██    ██  ██  ██  ██      ██          ████  ████ ██   ██ ████   ██ ██   ██ ██       ██      ██   ██ 
█████   ██ ████ ██ ██████  ██      ██    ██   ████   █████   █████       ██ ████ ██ ███████ ██ ██  ██ ███████ ██   ███ █████   ██████  
██      ██  ██  ██ ██      ██      ██    ██    ██    ██      ██          ██  ██  ██ ██   ██ ██  ██ ██ ██   ██ ██    ██ ██      ██   ██ 
███████ ██      ██ ██      ███████  ██████     ██    ███████ ███████     ██      ██ ██   ██ ██   ████ ██   ██  ██████  ███████ ██   ██ 
                                                                                                                                       
`;

////////////////////  EXECUTES SQL COMMANDS  //////////////////////
async function executeSqlCommand(sqlCommand) {
    try {
        const [rows, fields] = await pool.query(sqlCommand);
        console.log('SQL command executed successfully');
        console.table('Results:', rows);
    } catch (error) {
        console.error('Error executing SQL command:', error);
    }
}

///////////////// PREPARED SQL COMMANDS  /////////////////////////

// Function to show employees
async function showEmployees() {
    const sqlCommand = 'SELECT * FROM employees';
    await executeSqlCommand(sqlCommand);
}

// Function to show roles
async function showRoles() {
    const sqlCommand = 'SELECT * FROM roles';
    await executeSqlCommand(sqlCommand);
}

// Function to show departments
async function showDepartments() {
    const sqlCommand = 'SELECT * FROM departments';
    await executeSqlCommand(sqlCommand);
}


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

    // Handle the selected action inside the mainMenu function
    switch (action) {
        case 'View All Employees':
            await showEmployees();
            break;

        case 'Add Employee':
            console.log('YOU SELECTED: Add Employee');
            break;

        case 'Update Employee Role':
            console.log('YOU SELECTED: Update Employee Role');
            break;

        case 'View All Roles':
          await showRoles();
            break;

        case 'Add Role':
            console.log('YOU SELECTED: Add Role');
            break;

        case 'View All Departments':
           await showDepartments();
            break;

        case 'Add Department':
            console.log('YOU SELECTED: Add Department');
            break;

        case 'Quit':
            console.log('Thank you for using EMPLOYEE MANAGER 2K24.');
            process.exit();
    }
    // After handling the action, call the mainMenu again to keep the program running
    mainMenu();
};

function init() {
    console.log(employeeManagerArt);
    console.log('\nWelcome to EMPLOYEE MANAGER 2K24!!!\n');
    mainMenu();
}

init();
