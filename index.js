const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table")


const connection = mysql.createConnection({

  host: "localhost",
  // port
  port: 3306,
  // username
  user: "root",
  // passwrod
  password: "P@ssw0rd1234!",
  database: "employee_trackerDB"
});

connection.connect((err) => {
    if (err) throw err;
    // note for later: should I use start(); instead of runSearch(); 
    runSearch();
  });

// code
function runSearch() {
    inquirer
      .prompt({
        name: "selection",
        type: "list",
        message: "What would you like to do?",
        choices: 
          [
              "View All Employees",
              "View Departments",
              "View Roles", 
              "Add Employee",
              "Add Department",
              "Add Role", 
              "Update Employee",
          ]
      })
      .then((answer) => {
          console.log(answer);
        
        if (answer.selection === "View All Employees") {
          viewAll();
        }
        else if(answer.selection === "View Departments") {
          viewDepts();
  
        } 
        else if(answer.selection === "View Roles") {
          viewRoles();
  
        }
        else if(answer.selection === "Add Employee") {
          addEmployee();
  
        }
        else if(answer.selection === "Add Department") {
          addDept();
  
        }
        else if(answer.selection === "Add Role") {
          addRole();
  
        }
        else if(answer.selection === "Update Employee") {
          updateEmployee();
  
        }else{
          connection.end();
        }
      });
  }
  
  //View All Employees Function
  function viewAll() {
        connection.query(
          "SELECT employees.id, employees.first_name, employees.last_name, employees.role_id, employees.manager_id, role.title, role.salary, role.id, departments.id FROM employees LEFT JOIN role ON employees.role_id = role.id LEFT JOIN departments ON role.department_id = departments.id", 
          function(err, result, fields) {
            if (err) throw err;
            console.table(result);
            // re-prompt the user for another selection
            start();
          }
        );
      };
  
   function viewRoles() {
   connection.query(
  "SELECT role.id, role.title, role.salary, role.department_id, departments.id, departments.name FROM role LEFT JOIN departments on role.department_id = departments.id",
   function(err, result, fields) {
       if (err) throw err;
       console.table(result);
       // re-prompt the user for another selection
       start();
     }
   ); };
  
   function viewDepts() {
    connection.query("SELECT * FROM departments", function(err, result, fields) {
        if (err) throw err;
        console.table(result);
        // re-prompt the user for another selection
        start();
      }
    ); };
  
  
  var roleChoices = [];
  var empChoices = [];
  var deptChoices = [];
  
  function lookupRoles(){  
      
      connection.query("SELECT * FROM role", function (err, data) {
          if (err) throw err;
          for (i = 0; i < data.length; i++) {
              roleChoices.push(data[i].id + "-" + data[i].title)
          }
       })
      }
  
  function lookupEmployee(){  
       connection.query("SELECT * FROM employees", function (err, data) {
           if (err) throw err;
           for (i = 0; i < data.length; i++) {
               empChoices.push(data[i].id + "-" + data[i].first_name+" "+ data[i].last_name)
           }
       }) 
      }
  
  function lookupDepts(){
    connection.query("SELECT * FROM departments", function (err, data) {
      if (err) throw err;
      for (i = 0; i < data.length; i++) {
          deptChoices.push(data[i].id + "-" + data[i].name)
      }
  })
  }
  
  function addEmployee() {
  
      lookupRoles()
      lookupEmployee()
  
      inquirer.prompt([
      {
        name: "firstname",
        type: "input",
        message: "What is the employee's first name?"
      },
  
      {
          name: "lastname",
          type: "input",
          message: "What is the employee's last name?"
      },
  
      {
          name: "role",
          type: "list",
          message: "What is the employee's role?",
          choices: roleChoices 
        },
  
        {
          name: "reportingTo",
          type: "list",
          message: "Who is the employee's manager?",
          choices: empChoices
        }
      
       ]).then(function(answer) {
        var getRoleId =answer.role.split("-")
        var getReportingToId=answer.reportingTo.split("-")
        var query = 
        `INSERT INTO employees (first_name, last_name, role_id, manager_id)
         VALUES ('${answer.firstname}','${answer.lastname}','${getRoleId[0]}','${getReportingToId[0]}')`;
        connection.query(query, function(err, res) {
          console.log(`new employee ${answer.firstname} ${answer.lastname} added!`)
        });
        start();
      });
  };
  
  function addRole() {
  
    lookupRoles()
    lookupEmployee()
    lookupDepts()
  
    inquirer.prompt([
    {
      name: "role",
      type: "input",
      message: "Enter the role you would like to add:"
    },
  
    {
        name: "dept",
        type: "list",
        message: "In what department would you like to add this role?",
        choices: deptChoices
    },
  
    {
      name: "salary",
      type: "number",
      message: "Enter the role's salary:"
    },
    
     ]).then(function(answer) {
       console.log(`${answer.role}`)
      var getDeptId =answer.dept.split("-")
      var query = 
      `INSERT INTO role (title, salary, department_id)
       VALUES ('${answer.role}','${answer.salary}','${getDeptId[0]}')`;
      connection.query(query, function(err, res) {
        console.log(`<br>-----new role ${answer.role} added!------`)
      });
      start();
    });
  };
  
  function addDept() {
  
    lookupRoles()
    lookupEmployee()
    lookupDepts()
  
    inquirer.prompt([
    {
      name: "dept",
      type: "input",
      message: "Enter the department you would like to add:"
    }
    ]).then(function(answer) {
      var query = 
      `INSERT INTO departments (name)
       VALUES ('${answer.dept}')`;
      connection.query(query, function(err, res) {
        console.log(`-------new department added: ${answer.dept}-------`)
      });
      start();
    });
  };
  
  function updateEmployee() {
  
    connection.query("SELECT * FROM employees", function (err, results) {
      if (err) throw err;
    inquirer.prompt([
      {
        name: "employee",
        type: "list",
        message: "Which employee would you like to update?",
        choices: function () {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].id + " " + results[i].first_name + " " + results[i].last_name);
          }
          return choiceArray;
        }
      }
    ])
  
    .then(function (data) {
      for (var i = 0; i < results.length; i++) {
          if (data.employeeName === results[i].id + " " + results[i].first_name + " " + results[i].last_name) {
              var employeeID = results[i].id;
          }
      }
      return (employeeID);  
      })
  
      .then(function(employeeID){
      inquirer.prompt([
        {
          name: "updateSelection",
          type: "list",
          message: "What would you like to update?",
          choices: ["First name", "Last Name", "Role"]
        }
      ])
  
      .then(function(answer){
        if (answer.updateSelection === "First Name"){
         newFirstName(employeeID);
        } else if (answer.updateSelection === "Last Name"){
         newLastName(employeeID);
        } else if (answer.updateSelection === "Role"){
          newEmpRole(employeeID);
         }
      });
    });
  });
  };
  
  function newLastName(employeeID) {
      inquirer
          .prompt([
              {
                  type: "input",
                  name: "newLast",
                  message: "What is their new last name?"
              }
          ])
          .then(function (data) {
              connection.query(
                  "UPDATE employees SET ? WHERE ?",
                  [
                      {
                          last_name: data.newLast
                      },
                      {
                          id: employeeID
                      }
                  ],
                  function (error) {
                      if (error) throw err;
                      start();
                  }
              );
          });
  }
  
  function newFirstName(employeeID) {
      inquirer
          .prompt([
              {
                  type: "input",
                  name: "newFirst",
                  message: "What is their new first name?"
              }
          ])
          .then(function (data) {
              connection.query(
                  "UPDATE employees SET ? WHERE ?",
                  [
                      {
                          first_name: data.newFirst
                      },
                      {
                          id: employeeID
                      }
                  ],
                  function (error) {
                      if (error) throw err;
                      start();
                  }
              );
          });
  }
  
  function newEmpRole(employeeID) {
    connection.query("SELECT * FROM role", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "roleID",
                    message: "What is their new role.",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].title);
                        }
                        return choiceArray;
                    }
                }
            ])
            .then(function (data) {
                for (var i = 0; i < results.length; i++) {
                    if (data.roleID === results[i].title) {
                        data.roleID = results[i].id
                    }
                }
                return data;
            })
            .then(function (data) {
                connection.query(
                    "UPDATE employees SET ? WHERE ?",
                    [
                        {
                            role_id: data.roleID
                        },
                        {
                            id: employeeID
                        }
                    ],
                    function (error) {
                        if (error) throw err;
                        start();
                    }
                );
            });
    })
  }