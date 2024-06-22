--@block
CREATE TABLE users(
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

--@block
CREATE TABLE user_settings(
    fn VARCHAR(255),
    ln VARCHAR(255),
    status_1 VARCHAR(255),
    status_2 VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

--@block
SELECT * FROM users;

--@block
SELECT * FROM user_settings;

--@block
DELETE FROM users;

--@block
DELETE FROM user_settings;

--@block
DROP TABLE users;

--@block
DROP TABLE user_settings;