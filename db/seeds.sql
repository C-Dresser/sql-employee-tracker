-- //////////Seeds department table////////// --

INSERT INTO department (id, dept_name)
VALUES  (1, "Reception"),
        (2, "Sales"),
        (3, "HR"),
        (4, "Management"),
        (5, "Accounting");

-- //////////seeds roles table////////// --

INSERT INTO roles (id, title, salary, dept_id)
VALUES  (11, "Receptionist", 32000.00, 1),
        (21, "Lead Salesman", 50000.00, 2),
        (22, "Salesman", 45000.00, 2),
        (31, "Human Resources Agent", 50000.00, 3),
        (41, "Regional Manager", 75000.00, 4),
        (42, "Assistant to the Regional Manager", 60000.00, 4),
        (51, "Lead Accountant", 55000.00, 5),
        (52, "Accountant", 50000.00, 5);

-- //////////seeds employee table////////// --

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (111, "Pam", "Beasley", 11, 41),
        (211, "Jim", "Halpert", 21, 41),
        (221, "Creed", "Bratton", 22, 21),
        (222, "Phyllis", "Vance", 22, 21),
        (223, "Stanley", "Hudson", 22, 21),
        (224, "Meredith", "Palmer", 22, 21),
        (311, "Toby", "Flenderson", 31, 42),
        (312, "Kelly", "Kapoor", 31, 41),
        (411, "Michael", "Scott", 41, NULL),
        (421, "Dwight", "Schrute", 42, 41),
        (511, "Oscar", "Martinez", 51, 41),
        (521, "Angela", "Martin", 52, 51),
        (522, "Kevin", "Malone", 52, 51);