const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'Password123!',
    database: 'employee_tracker'
  },
  console.log(`Connected to the employee_tracker database.`)
);

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
                db.end();
        }
    });
};

//create function to view departments from db
const viewAllDepartments = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        //check if displays result 
        console.table(res); 
        mainMenu();
    });
};

// view roles in db
const viewAllRoles = () => {
    const sql = `SELECT role.id, title, salary, name AS department FROM role LEFT JOIN department ON department.id = role.department_id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
};

// function to view employees in db
const viewAllEmployees = () => {
    const sql = `SELECT e.id,e.first_name, e.last_name, title, name AS department, salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee m ON e.manager_id = m.id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
};

// add department to db
const addDepartment = () => {
    inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'What is the name of the department?'
    }).then(({ name }) => {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        db.query(sql, [name], (err, res) => {
            if (err) throw err;
            console.log(`${name} Department Added`);
            mainMenu();
        });
    });
};

// add role to the db 
const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the tile of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department ID of the role?'
        },
    ]).then(({ title, salary, department_id }) => {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        db.query(sql, [title, salary, department_id], (err,res) => {
            if (err) throw err;
            console.log(`Role ${title} Added`);
            mainMenu();
        });
    });
};

//add employee to db
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employee first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employee last name?'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the employee role ID?'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'What is the employee manager ID?'
        }
    ]).then(({ first_name, last_name, role_id, manager_id }) => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        db.query(sql, [first_name, last_name, role_id, manager_id], (err,res) => {
            if (err) throw err;
            console.log(`employee ${first_name} ${last_name} added!`);
            mainMenu();
        });
    });
};

// update role of employee into db
const updateEmployeeRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'Enter the employee ID that you want to update: '
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the new role ID: '
        }
    ]).then(({ employee_id, role_id }) => {
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
        db.query(sql, [role_id, employee_id], (err, res) => {
          if (err) throw err;
          console.log(`Employee's Role Updated`);
          mainMenu();
        });
      });
    };

    mainMenu();