INSERT INTO products
(name, dept, price, stock)
VALUES ("Echo Dot", "Electronics", 49.95, 10);

INSERT INTO products
(name, dept, price, stock)
VALUES ("Laptop", "Electronics", 1490.99, 750);

INSERT INTO products
(name, dept, price, stock)
VALUES ("Notepad", "Office Supplies", 10.19, 500);

INSERT INTO products
(name, dept, price, stock)
VALUES ("Paper Shredder", "Office Supplies", 29.99, 100);

INSERT INTO products
(name, dept, price, stock)
VALUES ("Pillow", "Home Goods", 59.99, 250);

INSERT INTO products
(name, dept, price, stock)
VALUES ("Door Mat", "Home Goods", 26.36, 150);

INSERT INTO products
(name, dept, price, stock)
VALUES ("Hammock", "Outdoor", 35.99, 300);

INSERT INTO products
(name, dept, price, stock)
VALUES ("Lantern", "Outdoor", 25.99, 200);

INSERT INTO products
(name, dept, price, stock)
VALUES ("Suitcase", "Luggage and Travel", 119.99, 350);

INSERT INTO products
(name, dept, price, stock)
VALUES ("Passport Wallet", "Luggage and Travel", 17.99, 600);

INSERT INTO departments
(name, overhead_cost)
VALUES ("Home Goods", "3000");

INSERT INTO departments
(name, overhead_cost)
VALUES ("Outdoor", "5000");

INSERT INTO departments
(name, overhead_cost)
VALUES ("Electronics", "10000");

INSERT INTO departments
(name, overhead_cost)
VALUES ("Office Supplies", "1500");

INSERT INTO departments
(name, overhead_cost)
VALUES ("Luggage and Travel", "2000");

UPDATE products SET stock = ? WHERE id = ?;

SELECT * FROM products;

SELECT departments.id, dept, overhead_cost, SUM(product_sales) as dept_sales FROM products INNER JOIN departments ON products.dept = departments.name GROUP BY dept ORDER BY departments.id;







SELECT * FROM departments;