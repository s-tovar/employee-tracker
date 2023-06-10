INSERT INTO department (name)
VALUES ("Instructor"),
       ("Library"),
       ("Administration"),
       ("Intern");

INSERT INTO role (title, salary, department_id)
VALUES ("Teacher", 70000, 1),
       ("Librarian", 80000, 2),
       ("Principal", 100000, 3),
       ("Tutor", 50000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Instructor"),
       ("Library"),
       ("Administration"),
       ("Reception"),
       ("Intern");