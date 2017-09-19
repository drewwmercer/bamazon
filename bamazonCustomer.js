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
  var query = 'SELECT item_id, product_name, price FROM products';
  connection.query(query, function(err, res) {
    console.table(res);
  });
}
