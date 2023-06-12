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

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    employee_tracker();
});