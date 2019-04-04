var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("\n");
  displayItems();
});

console.log("\nWelcome to Bamazon!");

// Show what's for sale and display the prompt that allows a user to buy something
function displayItems(){
    connection.query("SELECT * FROM productsForSale", function(err, res) {
      if (err) throw err;
      console.table(res);
      initialPrompt();

        function initialPrompt(){
            inquirer.prompt([
                {
                    type: "input",
                    name: "wantedItemId",
                    message: "Please input the ID of the item you would like to purchase."
                },

                {
                    type: "input",
                    name: "units",
                    message: "How many would you like?"
                }
            ]) .then(function(response){
                var itemId = response.wantedItemId;
                var units = response.units;
                
                // if units > stock_quantity, error message and return the user to the start of initialPrompt
                if (units > res[itemId -1].stock_quantity){
                    console.log("\nSorry, we don't have enough to fill that order.\n");
                    whatNext();
                }
                
                //else subtract units from stock_quantity in the database, save price * units to var cost, give user option to return to the start or quit
                else {
                    connection.query(`
                    UPDATE productsForSale 
                    SET stock_quantity = stock_quantity - ? 
                    WHERE item_id = ?`,
                    [units, itemId]);
                    console.log(`\nGreat! Your total is $${units * res[itemId - 1].price}.\n`);
                    whatNext();
                }
            })
        }
    })    
};

// Function that runs after the completion of a sale, user can make another purchase or quit
function whatNext(){
    inquirer.prompt([
        {
            type: "list",
            name: "nextMove",
            message: "What would you like to do next?",
            choices: ["Make another purchase", "Leave the store"],
        }
    ]).then(function(choice){
        if (choice.nextMove === "Leave the store"){
            console.log("\nThanks for stopping by! \n");
            connection.end();

        } else if (choice.nextMove === "Make another purchase"){
            displayItems();
        }
    })
}