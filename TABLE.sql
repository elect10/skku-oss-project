-- Create users table
CREATE TABLE users (
    id CHAR(36) NOT NULL,
    email VARCHAR(254) NOT NULL,
    password VARCHAR(64) NOT NULL,
    salt VARCHAR(8),
    nickname VARCHAR(10) NOT NULL,
    PRIMARY KEY (id)
);

-- Create questions table
CREATE TABLE questions (
    id CHAR(36) NOT NULL,
    writer CHAR(36) NOT NULL,
    content VARCHAR(2000) NOT NULL,
    date TIMESTAMP NOT NULL,
    title VARCHAR(64) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (writer) REFERENCES users(id)
);

-- Create answers table
CREATE TABLE answers (
    id CHAR(36) NOT NULL,
    writer CHAR(36) NOT NULL,
    question_id CHAR(36) NOT NULL,
    content VARCHAR(2000) NOT NULL,
    date TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (writer) REFERENCES users(id),
    FOREIGN KEY (question_id) REFERENCES questions(id)
);
