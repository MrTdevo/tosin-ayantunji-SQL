const { Client } = require("pg");
const inquirer = require("inquirer");

const client = new Client(
  {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  },
  console.log(`Connected to the employee_management database.`)
);

client.connect();

function viewDepartments() {
  client.query(
    'SELECT id AS "Department ID", name AS "Department Name" FROM department',
    (err, res) => {
      if (err) throw err;
      console.table(res.rows);
      client.end();
    }
  );
}

inquirer
  .prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
      ],
    },
  ])
  .then((answers) => {
    switch (answers.action) {
      case "View all departments":
        viewDepartments();
        break;
    }
  });
