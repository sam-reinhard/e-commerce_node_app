var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

prompt();

function prompt(){
    connection.query(`SELECT * FROM productsForSale`, function(err, res) {
        if (err) throw err;
        console.log("\n");
        inquirer.prompt([
            {
                type: "list",
                name: "command",
                message: "What would you like to do?",
                choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product", "Quit"]
            }
        ]).then(function(action){
            var command = action.command;
            if (command === "View products for sale"){
                console.table(res);
                prompt();

            } else if (command === "View low inventory"){
                lowInventory();

            } else if (command === "Add to inventory"){
                addInventory();

            } else if (command === "Add new product"){
                addProduct();

            } else {
                console.log("Logging off...\n");
                connection.end();
            }
        })
    })    
}

function lowInventory(){
    connection.query(`SELECT * FROM productsForSale WHERE stock_quantity < 5`, function(err, thingsToRestock){
        if (err) throw err;
        console.log("\n");
        console.table(thingsToRestock);
        console.log("\n");
    })
    prompt();
};

function addInventory(){
    connection.query(`SELECT * FROM productsForSale`, function(err, allItems){
        if (err) throw err;
        console.table(allItems)

        inquirer.prompt([
            {
                type: "input",
                name: "moreOfThis",
                message: "Please enter the ID of the item that you'd like to restock."
            },

            {
                type: "input",
                name: "newUnits",
                message: "How many units would you like to add?"
            }
        ]).then(function(response){
            var itemToRestock = response.moreOfThis;
            var newUnits = response.newUnits;
            connection.query(`
                UPDATE productsForSale 
                SET stock_quantity = stock_quantity + ? 
                WHERE item_id = ?`,
                [newUnits, itemToRestock]
            );
            prompt();
        });
    });
}

function addProduct(){
    inquirer.prompt([
        {
            type: "input",
            name: "product_name",
            message: "What is the name of the product you'd like to add?"
        },
        {
            type: "input",
            name: "department_name",
            message: "Which department should it be listed under?"
        },
        {
            type: "input",
            name: "price",
            message: "Please set the price for the item."
        },
        {
            type: "input",
            name: "stock",
            message: "How many units would you like to stock?"
        }
    ]).then(function(response){
        var product = response.product_name;
        var department = response.department_name;
        var price = response.price;
        var supply = response.stock;
        connection.query("INSERT INTO productsForSale SET ?",
            {
                product_name: product,
                department_name: department,
                price: price,
                stock_quantity: supply
            }
        );
        prompt();
    });
};