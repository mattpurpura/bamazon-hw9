CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    dept VARCHAR(100) NOT NULL,
    price DEC(10,2) NOT NULL,
    stock INT DEFAULT 0
);

SELECT * FROM products;
