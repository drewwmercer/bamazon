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
          if (selectedItem[0].StockQuantity - quantity >= 0) {
            // console.log("Bamazon's shelves have enough of that item ("selectedItem[0].ProductName + ")!");
            console.log(
              'Quantity in Stock: ' +
                selectedItem[0].StockQuantity +
                ' Order Quantity: ' +
                quantity
            );
            console.log(
              'You will be charged ' +
                order.quantity * selectedItem[0].Price +
                ' dollars.  Thank you for shopping at Bamazon.'
            );
            connection.query(
              'UPDATE products SET StockQuantity=? WHERE id=?',
              [selectedItem[0].StockQuantity - quantity, itemId],
              function(err, inventory) {
                if (err) throw err;
                queryProducts();
              }
            );
          } else {
            console.log(
              'Insufficient inventory to fulfill this order. Please order less of that item, as Bamazon only has ' +
                selectedItem[0].StockQuantity +
                ' ' +
                selectedItem[0].ProductName +
                ' in stock at this moment.'
            );
            queryProducts();
          }
        }
      );
    });
}

// queryProducts();
