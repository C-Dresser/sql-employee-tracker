DROP DATABASE IF EXISTS staff_db;
CREATE DATABASE staff_db;

USE staff_db;

-- creates department table in staff_db --

CREATE TABLE department (
    id INT NOT NULL,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- creates department roles in staff_db --

CREATE TABLE roles (
    id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    dept_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

-- creates employee table in staff_db --

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (roles_id)
    REFERENCES roles(id)
);