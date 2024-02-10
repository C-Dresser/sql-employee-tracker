-- //////////Seeds department table////////// --

INSERT INTO departments (id, dept_name)
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

INSERT INTO employees (id, first_name, last_name, roles_id, manager_id)
VALUES  (111, "Pam", "Beasley", 11, 411),
        (211, "Jim", "Halpert", 21, 411),
        (221, "Creed", "Bratton", 22, 211),
        (222, "Phyllis", "Vance", 22, 211),
        (223, "Stanley", "Hudson", 22, 211),
        (224, "Meredith", "Palmer", 22, 211),
        (311, "Toby", "Flenderson", 31, 421),
        (312, "Kelly", "Kapoor", 31, 411),
        (411, "Michael", "Scott", 41, NULL),
        (421, "Dwight", "Schrute", 42, 411),
        (511, "Oscar", "Martinez", 51, 411),
        (521, "Angela", "Martin", 52, 511),
        (522, "Kevin", "Malone", 52, 511);