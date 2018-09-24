CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    dept VARCHAR(100) NOT NULL,
    price DEC(10,2) NOT NULL,
    stock INT DEFAULT 0, 
    product_sales DEC(10,2) DEFAULT 0
);

CREATE TABLE departments(
	id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(100) NOT NULL, 
    overhead_cost INT NOT NULL 
);

CREATE TABLE dept_sales

SELECT * FROM products;

DROP TABLE products