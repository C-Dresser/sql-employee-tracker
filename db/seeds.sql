-- Seeds department table --
INSERT INTO department (id, dept_name)
VALUES  (1, "Reception"),
        (2, "Sales"),
        (3, "HR"),
        (4, "Management"),
        (5, "Accounting");

-- seeds roles table --

INSERT INTO roles (id, title, salary, dept_id)
VALUES  (11, "Receptionist", 32000.00, 1),
        (21, "Lead Salesman", 50000.00, 2),
        (22, "Salesman", 45000.00, 2),
        (31, "Human Resources Agent", 50000.00, 3),
        (41, "Regional Manager", 75000.00, 4),
        (42, "Assistant to the Regional Manager", 60000.00, 4),
        (51, "Lead Accountant", 55000.00, 5),
        (52, "Accountant", 50000.00, 5);