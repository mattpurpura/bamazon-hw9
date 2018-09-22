var inquirer = require("inquirer");
var mysql  = require("mysql");
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
        "SELECT id, name, price FROM products",
        function(err, res){
            productsForSale = res;
            log(productsForSale);
            promptCreateOrder();
        }
    )
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
        // placeOrder(response.productID, response.orderQuantity)
    })
}

function placeOrder(inputId, quantity){
    let productExists = false;
    for(let i=0; i < productsForSale.length; i++){
        if (inputId === productsForSale[i].id){
           return productExists = true
        }
    }
    if(productExists === false){
        log("I'm sorry, we do not carry that item.");
    }
    else{
        
    }
}

