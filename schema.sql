DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;
USE bamazon;
CREATE TABLE products
(
    item_id INT
    AUTO_INCREMENT NOT NULL,
  product_name VARCHAR
    (100) NOT NULL,
  department_name VARCHAR
    (100) NOT NULL,
  price DECIMAL
    (10,2) NOT NULL,
  item_sales DECIMAL
    (10,2) NOT NULL,
  stock_quantity INT
    (10) NULL,
  PRIMARY KEY
    (item_id)
);
    SELECT *
    FROM products;
