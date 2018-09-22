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
    updateTable();
})

var productsForSale;
function updateTable(){
    var query = connection.query(
        "SELECT * FROM products",
        function(err, res){
            productsForSale = res;
            displayItems();
            promptCreateOrder();
        }
    )
}

function displayItems(){
    for(let i=0; i< productsForSale.length; i++){
        log(chalk.yellow(productsForSale[i].name));
        log(chalk.red("$"+productsForSale[i].price));
        log(chalk.green("Product ID: " + productsForSale[i].id));
        log("---------------");
    }
}

function promptCreateOrder(){
    inquirer.prompt([
        {
            type: "input", 
            message: "Please input the ID of the product you'd like to order.", 
            name: "productID", 
        },
        {
            type: "input", 
            message: "How many would you like to order?", 
            name: "orderQuantity", 
        }
    ]).then(function(response){
        placeOrder(parseInt(response.productID), parseInt(response.orderQuantity))
    })
}

function placeOrder(inputId, quantity){
    let productExists = false;
    let desiredProduct;
    for(let i=0; i < productsForSale.length; i++){
        if (inputId === productsForSale[i].id){
            desiredProduct = productsForSale[i];
            productExists = true;
            break;
        }
    }
    if(productExists === false){
        log("I'm sorry, we do not carry that item.");
        promptCreateOrder();
    }
    else{
        if(quantity <= desiredProduct.stock){
            desiredProduct.stock -= quantity;
            log("Your order has been placed!");
            uploadData(desiredProduct.stock, desiredProduct.id);
        }
        else{
            log("Insufficient Quantity");
            promptCreateOrder();
        }
    }
}

function uploadData(stock, id){
    var query = connection.query(
        "UPDATE products SET stock = ? WHERE id = ?", [stock, id],
        function(err, res){
            log("Updated"); 
            promptNewOrder();
        }
    )
}

function promptNewOrder(){
    inquirer.prompt([
        {
            type: "confirm", 
            message: "Would you like to place another order?",
            name: "newOrder"
        }
    ]).then(function(response){
        if(response.newOrder === true){
            displayItems();
            promptCreateOrder();
        }
        else{
            log("Goodbye");
            connection.end();
        }
    })
}

