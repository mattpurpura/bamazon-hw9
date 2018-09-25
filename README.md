# Bamazon-App

## Setup
1. Install the node modules list in package.json.
2. Use the schema.sql and seed.sql files to set up the database

## How to Use

### Customer
* Run the bamazonCustomer.js file in node through the terminal
    * The user is shown a list of the available products with an ID, product and price.
    * Using the product ID, the user can select a product and quantity to order.  
    * Ther order is placed if the quantity desired is less than available stock. 

### Manager
* Run the bamazonManager.js file in node through the terminal
    * The user is shown a menu with the following prompts
        1. View Products for Sale
            * Shows all products with ID, price and inventory
        2. View Low Inventory
            * Shows products with inventory < 5
        3. Add to inventory
            * Allows user to increase inventory of listed products
        4. Add new product
            * User can create new product to sell
        5. Exit
            * ends the app

### Supervisor
* Run the bamazonSupervisor.js file in node through the terminal
    * The user is shown a menu with the following options
        1. View products sales by dept
            *Groups product for sale into dept and shows dept sales, overhead and profit
        2. Create new department
            *User creates a new department, adds to database
        3. Exit

## Video Demonstration

