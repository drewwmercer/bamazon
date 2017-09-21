var mysql = require('mysql');
var table = require('console.table');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 8889,
  user: 'root',
  password: 'root',
  database: 'bamazon'
});

connection.connect(function(err) {
  if (err) throw err;
  queryProducts();
});

function queryProducts() {
  var query =
    'SELECT item_id AS SKU, product_name AS "Product Description", price AS Price FROM products';
  connection.query(query, function(err, res) {
    console.table(res);
    goShopping();
  });
}

function goShopping() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What product id would you like to buy?',
        name: 'id',
        validate: function(value) {
          if (isNaN(value) == false) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        type: 'input',
        message: 'How many units would you like to buy?',
        name: 'quantity',
        validate: function(value) {
          if (isNaN(value) == false) {
            return true;
          } else {
            return false;
          }
        }
      }
    ])
    .then(function(order) {
      var quantity = order.quantity;
      var itemId = order.id;
      connection.query(
        'SELECT * FROM products WHERE item_id=' + itemId,
        function(err, selectedItem) {
          if (err) throw err;
          if (selectedItem[0].stock_quantity - quantity >= 0) {
            // console.log("Bamazon's shelves have enough of that item ("selectedItem[0].ProductName + ")!");
            console.log(
              '\n\n°º¤ø,¸¸,ø¤º°`°º¤ø,¸,ø¤°º¤ø,¸¸,ø¤º°`°º¤ø,¸°º¤ø,¸¸,ø¤º°`°º¤ø,¸,ø¤°\n\nQuantity in Stock: ' +
                selectedItem[0].stock_quantity +
                ' Order Quantity: ' +
                quantity
            );
            console.log(
              'You will be charged ' +
                quantity * selectedItem[0].price +
                ' dollars.  Thank you for shopping at Bamazon.\n\n°º¤ø,¸¸,ø¤º°`°º¤ø,¸,ø¤°º¤ø,¸¸,ø¤º°`°º¤ø,¸°º¤ø,¸¸,ø¤º°`°º¤ø,¸,ø¤°\n\n'
            );
            connection.query(
              'UPDATE products SET stock_quantity=? WHERE item_id=?',
              [selectedItem[0].stock_quantity - quantity, itemId],
              function(err, inventory) {
                if (err) throw err;
                queryProducts();
              }
            );
          } else {
            console.log(
              '\n\n°º¤ø,¸¸,ø¤º°`°º¤ø,¸,ø¤°º¤ø,¸¸,ø¤º°`°º¤ø,¸°º¤ø,¸¸,ø¤º°`°º¤ø,¸,ø¤°\n\nInsufficient inventory to fulfill this order. Please order less of that item, as Bamazon only has ' +
                selectedItem[0].stock_quantity +
                ' ' +
                selectedItem[0].ProductName +
                ' in stock at this moment.\n\n°º¤ø,¸¸,ø¤º°`°º¤ø,¸,ø¤°º¤ø,¸¸,ø¤º°`°º¤ø,¸°º¤ø,¸¸,ø¤º°`°º¤ø,¸,ø¤°\n\n'
            );
            queryProducts();
          }
        }
      );
    });
}

// queryProducts();
