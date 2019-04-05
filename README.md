# e-commerce_node_app

## Instructions
For this assignment, we were tasked with creating an an Amazon-like storefront with MySQL and Node.js. The app takes in orders from customers and depletes stock from the store's inventory. Additonally, there is a manager component to the application that allows the user to check the items currently for sale, view items with an inventory of less than 5, add inventory, and add new items.

## How It Works - bamazonCustomer.js

When the user starts up the bamazonCustomer.js file, the user is immediately presented with a table of the items currently for sale as well as a prompt that asks them to input the ID of the item they wish to purchase. After they enter the ID, they are then asked how many they would like to buy. If there is enough in stock_quantity to fill the order, the application shows them their total cost and asks what they would like to do next.

![Successful Purchase](/images/successfulPurchase.png)

 If there isn't, the application presents them with a message that indicates there isn't enough stock and asks what they would like to do next without updating the database. See the image below to see how this is presented in the command line.

![Unsuccessful Purchase](/images/unsuccessfulPurchase.png)

## How It Works - bamazonManager.js

When the user opens up the bamazonManager.js file, they are immediately presented with a prompt that allows them to select an action from a prompt (view products for sale, view low inventory, add inventory, add a new product, quit). When the user selects "View products for sale", the application queries the database to present a table of all of the items currently for sale.

![View Products](/images/viewProducts.png)

After the user is shown the table of available items, they are brought back to the main prompt and again shown their options. If the user selects "View low inventory", they are shown a table of items that have a stock_quantity of less than 5.

![View low inventory](/images/viewLowInventory.png)

Again, the user is brought back to the main prompt after the table is shown. If the user selects "Add inventory", they are then asked for the id of the item that they would like to restock as well as the number of units they'd like to add.

![Add inventory](/images/addInventory.png)

Once the user provides the above values, they are then brought back to the main prompt. If the user then selects "Add new item", the prompt asks for the name of the item, the department that it should belong to, the price, and the number of units that they would like to stock. 

![Add new item](/images/addItem.png)

It is important to note that the user doesn't have to go about these actions in the order that I have described and can perform them in any order as they all end by bringing the user back to the main prompt. When done, the user can select "Quit" which ends the connection to the database and ends the program.
