--@block
CREATE TABLE users(
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

--@block
INSERT INTO users(username, email, password) VALUES ('root', 'root@email.com', '123');

--@block
CREATE TABLE profiles(
    fn VARCHAR(255),
    ln VARCHAR(255),
    status_1 VARCHAR(255),
    status_2 VARCHAR(255),
    bio VARCHAR(255)
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

--@block
CREATE TABLE admins(
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    admin_name VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

--@block
INSERT INTO admins(admin_name, password) VALUES ('root', 'root@A99');

--@block
SELECT * FROM admins;

--@block
DROP TABLE admins;

--@block
CREATE TABLE visitations(
    last_login TIMESTAMP NOT NULL,
    last_visited TIMESTAMP NOT NULL,
    user_id INT UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

--@block
DROP TABLE visitations;

--@block
CREATE TABLE code_executions(
    date TIMESTAMP NOT NULL,
    language VARCHAR(255) NOT NULL,
    version VARCHAR(255) NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

--@block
CREATE TABLE youtube_search_histories(
    date TIMESTAMP NOT NULL,
    search TEXT NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

--@block
CREATE TABLE sessions(
    session_id VARCHAR(255) UNIQUE,
    expires VARCHAR(255),
    data VARCHAR(255)
);

--@block
SELECT * FROM users;

--@block
SELECT * FROM sessions;

--@block
SELECT * FROM profiles;

--@block
DELETE FROM users;

--@block
DELETE FROM profiles;

--@block
DELETE FROM sessions;

--@block
DROP TABLE users;

--@block
DROP TABLE sessions;

--@block
DROP TABLE profiles;

--@block
INSERT INTO code_executions(date, language, version, user_id) VALUES 
    ('2024-05-17', 'js', '20', 35),
    ('2024-05-17 00:00:01', 'py', '3', 35),
    ('2024-05-20 00:00:01', 'java', '8', 35);

--@block
DELETE FROM code_executions;

--@block
SELECT * FROM code_executions WHERE user_id = 35;

--@block
SELECT * FROM code_executions WHERE date = '2024-05-17';

