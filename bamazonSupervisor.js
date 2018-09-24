var Table = require('cli-table');
var inquirer = require("inquirer");
var mysql  = require("mysql");
var chalk = require("chalk");
const log = console.log;


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
  });

  connection.connect(function(err){
    if(err) throw err;
    log("Connected as id"+connection.threadId + "\n");
    runSupervisor()
})

function runSupervisor(){
inquirer.prompt([
    {
        type: "list", 
        message: "What would you like to do?", 
        choices: ["View product sales by dept", 'Create new department'], 
        name: "action"
    }
]).then(function(response){
    switch (response.action){
        case "View product sales by dept":
            grabDeptData();
        break;
        case "Create new department":
            addNewDepartment();
        break;
    }
})
}

function grabDeptData(){
    var query = connection.query(
        "SELECT departments.id, departments.name, overhead_cost, SUM(product_sales) as dept_sales FROM departments LEFT JOIN products ON products.dept = departments.name GROUP BY dept ORDER BY departments.id", 
        function(err, res){
            log(res);
            var deptTable = new Table({
                head: ["Dept_ID", 'Dept_Name', 'Overhead_Cost', 'Dept_Sales', 'Dept_Profit']
            });

            for(let i=0; i < res.length; i++){
                let deptName = res[i].name;
                let deptID = res[i].id;
                let overhead = res[i].overhead_cost;
                let deptSales = res[i].dept_sales;
                    if(deptSales === null){
                        deptSales = 0;
                    }
                let deptProfit = res[i].dept_sales-res[i].overhead_cost

                deptTable.push(
                [deptID, deptName, overhead, deptSales, deptProfit]
            )
            }
            log(deptTable.toString());
        }
    )
}

function createDepartment(name, cost){
    var query = connection.query(
        "INSERT INTO departments SET name = ?, overhead_cost = ?", 
        [name, cost],
        function(err, res){
            if (err) throw err;
            log("Dept Created")
        }   
    )
}

function addNewDepartment(){
    inquirer.prompt([
        {
            type: "input", 
            message: "Department Name:", 
            name: "deptName"
        },
        {
            type: "input", 
            message: "Department Overhead Cost:", 
            name: "deptCost"
        }
    ]).then(function(response){
        let name = response.deptName;
        let cost = response.deptCost
        log("New Product Added!");
        createDepartment(name, cost);
    })
}