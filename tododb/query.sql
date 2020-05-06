CREATE TABLE todo (
  id int AUTO_INCREMENT PRIMARY KEY,
  content varchar(255) NOT NULL,
  category varchar(255) NOT NULL,
  dueDate date NOT NULL, 
  createDate date NOT NULL
) DEFAULT CHARSET=utf8mb4;

CREATE USER 'user'@'%' IDENTIFIED BY '${MYSQL_ROOT_PASSWORD}';

GRANT ALL ON *.* TO 'user'@'%';
