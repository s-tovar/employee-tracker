INSERT INTO department (name)
VALUES ("Instructor"),
       ("Library"),
       ("Administration"),
       ("Intern");

INSERT INTO role (title, salary, department_id)
VALUES ("AVID Teacher", 70000, 1),
       ("Math Teacher", 80000, 2),
       ("Librarian", 90000, 3),
       ("Computer Librarian", 91000, 4),
       ("Principal", 100000, 5),
       ("Vice Principal", 99000, 6),
       ("AVID Tutor 1", 35000, 7),
       ("AVID Tutor 2", 35000, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Marissa", "Gaustin", 1, 5),
       ("Axel", "Molson", 2, 5),
       ("Grace", "Dominguez", 3, 5),
       ("Richard", "Wilson", 4, 3),
       ("James", "Gallardo", 5, NULL),
       ("Ray", "Espinoza", 6, 5),
       ("Precious", "Smith", 7, 1),
       ("Darling", "Santiago", 8, 1);