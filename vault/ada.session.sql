--@block
CREATE TABLE users(
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

--@block
CREATE TABLE user_settings(
    setting_id INT PRIMARY KEY,
    fn VARCHAR(255) NOT NULL,
    ln VARCHAR(255) NOT NULL,
    status_1 VARCHAR(255),
    status_2 VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

--@block
SELECT * FROM users;

--@block
DELETE FROM users;

--@block
DROP TABLE users;