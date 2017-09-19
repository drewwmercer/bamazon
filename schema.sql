DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_num INT AUTO_INCREMENT NOT NULL,
  item_description VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL,
  item_price DECIMAL(10,2) NOT NULL,
  item_sales DECIMAL(10,2) NOT NULL,
  item_qty INT(10) NULL,
  PRIMARY KEY (item_num)
);

SELECT * FROM products;
