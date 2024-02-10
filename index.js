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
        const [maxDepartmentId] = await pool.query('SELECT MAX(id) as maxId FROM departments');
        const newDepartmentId = maxDepartmentId[0].maxId + 1 || 1; // Increment the max ID or start from 1 if no existing IDs

        const departmentDetails = await inquirer.prompt([
            {
                type: 'input',
                name: 'deptName',
                message: 'Enter the department name:',
                validate: (input) => input.trim() !== '', // Ensure a non-empty name
            },
        ]);

        const sqlCommand = `
            INSERT INTO departments (id, dept_name)
            VALUES (${newDepartmentId}, '${departmentDetails.deptName}');
        `;

        await executeSqlCommand(sqlCommand);

        console.log('Department added successfully!');
    } catch (error) {
        console.error('Error adding department:', error);
    }

    showDepartments();
}

// Function to add a role with unique id, salary, and assign it to an existing department
async function addRole() {
    try {
        const [maxRoleId] = await pool.query('SELECT MAX(id) as maxId FROM roles');
        const newRoleId = maxRoleId[0].maxId + 1 || 1; // Increment the max ID or start from 1 if no existing IDs

        const roleDetails = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the role name:',
                validate: (input) => input.trim() !== '', // Ensure a non-empty name
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary for the role (decimal):',
                validate: (input) => !isNaN(parseFloat(input)), // Ensure input is a valid number
            },
            {
                type: 'list',
                name: 'dept_Id',
                message: 'Choose the department for the role:',
                choices: await getDepartmentChoices(),
            },
        ]);

        const sqlCommand = `
            INSERT INTO roles (id, title, salary, dept_id)
            VALUES (${newRoleId}, '${roleDetails.title}', ${parseFloat(roleDetails.salary)}, ${roleDetails.dept_Id});
        `
        console.log(sqlCommand);

        await executeSqlCommand(sqlCommand);

        console.log('Role added successfully!');
    } catch (error) {
        console.error('Error adding role:', error);
    }

    showRoles();
}

// Function to add a role with unique id, salary, and assign it to an existing department
async function addEmployee() {
    try {
        const [maxEmpId] = await pool.query('SELECT MAX(id) as maxId FROM employees');
        const newEmpId = maxEmpId[0].maxId + 1 || 1; // Increment the max ID or start from 1 if no existing IDs

        const empDetails = await inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter the employee first name:',
                validate: (input) => input.trim() !== '', // Ensure a non-empty name
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter the employee last name:',
                validate: (input) => input.trim() !== '', // Ensure a non-empty name
            },
            {
                type: 'list',
                name: 'roles_id',
                message: 'Choose the role for the employee:',
                choices: await getRoleChoices(),
            },
            {
                type: 'list',
                name: 'manager_id',
                message: 'Choose the manager for the employee:',
                choices: await getManagereChoices(),
            },
        ]);

        const sqlCommand = `
            INSERT INTO employees (id, first_name, last_name, roles_id, manager_id)
            VALUES (${newEmpId}, '${empDetails.first_name}', '${empDetails.last_name}', ${parseFloat(empDetails.roles_id)}, ${empDetails.manager_id});
        `
        console.log(sqlCommand);

        await executeSqlCommand(sqlCommand);

        console.log('Role added successfully!');
    } catch (error) {
        console.error('Error adding role:', error);
    }

    showEmployees();
}

// Function to update employee role
async function updateEmployeeRole() {
    try {
        const employeeChoices = await getEmployeeChoices();
        const selectedEmployee = await inquirer.prompt({
            type: 'list',
            name: 'employeeId',
            message: 'Choose an employee to update:',
            choices: employeeChoices,
        });

        const roleChoices = await getRoleChoices();
        const selectedRole = await inquirer.prompt({
            type: 'list',
            name: 'roleId',
            message: 'Choose a new role for the employee:',
            choices: roleChoices,
        });

        const updateSql = `
            UPDATE employees
            SET roles_id = ?
            WHERE id = ?
        `;
        
        await pool.query(updateSql, [selectedRole.roleId, selectedEmployee.employeeId]);
        
        console.log('Employee role updated successfully!');
    } catch (error) {
        console.error('Error updating employee role:', error);
    }

    showEmployees();
}

// Function to get department choices for the inquirer prompt
async function getDepartmentChoices() {
    const [departments] = await pool.query('SELECT id, dept_name FROM departments');
    return departments.map((department) => ({ name: department.dept_name, value: department.id }));
}

// Function to get role choices for the inquirer prompt
async function getRoleChoices() {
    const [roles] = await pool.query('SELECT id, title FROM roles');
    return roles.map((role) => ({ name: role.title, value: role.id }));
}

// Function to get the manager choices for the inquiter prompt
async function getManagereChoices() {
    const [managers] = await pool.query('SELECT id, last_name FROM employees');
    return managers.map((employee) => ({ name: employee.last_name, value: employee.id }));
}

async function getEmployeeChoices() {
    const [employees] = await pool.query('SELECT id, last_name FROM employees');
    return employees.map((employee) => ({ name: employee.last_name, value: employee.id }));
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
            await addEmployee();
            break;

        case 'Update Employee Role':
            await updateEmployeeRole();
            break;

        case 'View All Roles':
            await showRoles();
            break;

        case 'Add Role':
            await addRole();
            break;

        case 'View All Departments':
            await showDepartments();
            break;

        case 'Add Department':
            await addDepartment();
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
