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
    downloadData();
})

var productsForSale;
function downloadData(){
    var query = connection.query(
        "SELECT * FROM products", 
        function(err, res){
            if(err) throw err;
            productsForSale = res;
            displayMenu();
        }
    )
}

function displayItems(){
    for(let i=0; i<productsForSale.length; i++){
        log(chalk.blue("Product ID: " + productsForSale[i].id));
        log(chalk.yellow(productsForSale[i].name));
        log(chalk.red("$"+productsForSale[i].price));
        log(chalk.green("Stock: " + productsForSale[i].stock));
        log("---------------");
    }
}

function displayLowInventory(){
    let inventoryLow = false;
    for (let i=0; i<productsForSale.length; i++){
        if(productsForSale[i].stock < 5){
            inventoryLow = true;
            log(chalk.blue("Product ID: " + productsForSale[i].id));
            log(chalk.yellow(productsForSale[i].name));
            log(chalk.red("$"+productsForSale[i].price));
            log(chalk.green("Stock: " + productsForSale[i].stock));
            log("---------------");
        }
    }
    if(inventoryLow === false){
        log("No products have low inventory!")
    }
}

function addInventory(){
    inquirer.prompt([
        {
            type: "input", 
            message: "Input product ID:", 
            name: "idToUpdate"
        },
        {
            type: "input", 
            message: "How much stock are you adding to inventory?", 
            name: "inventoryToAdd"
        }
    ]).then(function(response){
        let inputId = parseInt(response.idToUpdate);
        let quantity = parseInt(response.inventoryToAdd);
        let productExists = false;
        let productToBeUpdated;
        for(let i=0; i < productsForSale.length; i++){
            if (inputId === productsForSale[i].id){
                productToBeUpdated = productsForSale[i];
                productExists = true;
                break;
        }
        }
        if(productExists === false){
            log("That item does not exist, please check ID number.");
            promptCreateOrder();
        }
        else{
            productToBeUpdated.stock += quantity;
            log("Inventory has been updated");
            log("Product: "+productToBeUpdated.name+" - Current Inventory: "+productToBeUpdated.stock);
            uploadData(productToBeUpdated.stock, productToBeUpdated.id);
        }
    })
}

function uploadData(stock, id){
    var query = connection.query(
        "UPDATE products SET stock = ? WHERE id = ?", [stock, id],
        function(err, res){
            log("Updated"); 
            displayMenu();
        }
    )
}

function createProduct(name, dept, price, stock){
    var query = connection.query(
        "INSERT INTO products SET name = ?, dept = ?, price = ?, stock = ?", 
        [name, dept, price, stock],
        function(err, res){
            if (err) throw err;
            downloadData();
        }   
    )
}

function addNewProduct(){
    inquirer.prompt([
        {
            type: "input", 
            message: "Product Name:", 
            name: "productName"
        },
        {
            type: "input", 
            message: "Department:", 
            name: "productDept"
        },
        {
            type: "input", 
            message: "Price:", 
            name: "productPrice"
        },
        {
            type: "input", 
            message: "Inventory:", 
            name: "productStock"
        },
    ]).then(function(response){
        let name = response.productName;
        let dept = response.productDept;
        let price = response.productPrice;
        let stock = response.productStock;
        log("New Product Added!");
        createProduct(name, dept, price, stock);
    })
}

function displayMenu(){
    inquirer.prompt([
        {
            type: "list",
            message: "Choose an action:", 
            choices: ["View Products for Sale", 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit'],
            name: "menu"
        }
    ]).then(function(response){
        switch (response.menu){
            case "View Products for Sale":
                displayItems();
                displayMenu();
            break;
            case "View Low Inventory":
                displayLowInventory();
                displayMenu();
            break;
            case "Add to Inventory":
                addInventory();
            break;
            case "Add New Product":
                addNewProduct();
            break;
            case "Exit":
                connection.end();
            break;
        }

    })
}