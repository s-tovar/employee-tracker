const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'Password123!',
    database: 'employee_tracker'
  },
  console.log(`Connected to the employee_tracker database.`)
);

// db.connect(err => {  --> is this needed? is it already connected?
//     if (err) throw err;
//     console.log('Database connected.');
//     employee_tracker();
// });

// main menu function that prompts user
const mainMenu = () => {
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add role',
            'Add employee',
            'Update an employee role',
            'Exit',
        ]
    }).then(({ action }) => {
        switch (action) {
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();;
                break;
            case 'Add a deparment':
                addDepartment();
                break;
            case 'Add role':
                addRole();
                break;
            case 'Add employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            default:
        }
    });
};

//create function to view departments from db
const viewAllDepartments = () => {
    const sql = 'SELECT * FROM department';
    db.query(sql, (err, res) => {
        if (err) throw err;
        //check if displays result 
        console.table(res); 
        mainMenu();
    });
};