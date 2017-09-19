DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_num INT NOT NULL,
  item_description VARCHAR(100) NULL,
  department VARCHAR(100) NULL,
  item_price INT NULL,
  item_sales DECIMAL(10,4) NULL,
  item_qty DECIMAL(10,4) NULL,
  PRIMARY KEY (item_num)
);

SELECT * FROM products;
