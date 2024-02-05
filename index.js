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

        // If the query is a SELECT statement, display the table
        if (sqlCommand.trim().toUpperCase().startsWith('SELECT')) {
            console.log(`Results for query: ${sqlCommand}`);
            console.table(rows);
        } else {
            const affectedRows = rows ? rows.affectedRows : 0;
            console.log(`SQL command executed successfully. Affected rows: ${affectedRows}`);
        }
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

// Function to add a department with unique id
async function addDepartment() {
    try {
        // Get the maximum department ID from the table
        const [maxDepartmentId] = await pool.query('SELECT MAX(id) as maxId FROM departments');
        const newDepartmentId = maxDepartmentId[0].maxId + 1 || 1; // Increment the max ID or start from 1 if no existing IDs

        // Prompt the user for department details
        const departmentDetails = await inquirer.prompt([
            {
                type: 'input',
                name: 'deptName',
                message: 'Enter the department name:',
                validate: (input) => input.trim() !== '', // Ensure a non-empty name
            },
        ]);

        // SQL command to insert a new department
        const sqlCommand = `
            INSERT INTO departments (id, dept_name)
            VALUES (${newDepartmentId}, '${departmentDetails.deptName}');
        `;

        // Execute the SQL command
        await executeSqlCommand(sqlCommand);

        console.log('Department added successfully!');
    } catch (error) {
        console.error('Error adding department:', error);
    }

    showDepartments();
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
            await addDepartment(); // Use await to ensure the function completes before moving on
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
