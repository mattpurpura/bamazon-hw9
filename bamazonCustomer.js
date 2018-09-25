var inquirer = require("inquirer");
var mysql  = require("mysql");
var chalk = require("chalk");
const log = console.log;
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
  });

  connection.connect(function(err){
    if(err) throw err;
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
    let products = new Table({
        head: ["Product ID", 'Name', 'Price']
    });

    for(let i=0; i < productsForSale.length; i++){
        let productName = productsForSale[i].name;
        let productID = productsForSale[i].id;
        let productPrice = productsForSale[i].price;

        products.push(
        [productID, productName, productPrice]
    )
    }
    log(products.toString());
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
            desiredProduct.product_sales += quantity*desiredProduct.price;
            log("Your order of "+quantity+" "+desiredProduct.name+" for $"+desiredProduct.product_sales+" has been placed!");
            uploadData(desiredProduct.stock, desiredProduct.id, desiredProduct.product_sales);
        }
        else{
            log("Insufficient Quantity");
            promptCreateOrder();
        }
    }
}

function uploadData(stock, id, sales){
    var query = connection.query(
        "UPDATE products SET stock = ?, product_sales = ? WHERE id = ?", [stock, sales, id],
        function(err, res){
            if(err) throw err;
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

