-- Create the library database
CREATE DATABASE library_db;

-- Use the library_db database
USE library_db;

-- Create a table for books
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    publication_year INT,
    genre VARCHAR(100)
);


-- Insert a new book record
INSERT INTO books (title, author, publication_year, genre)
VALUES ('To Kill a Mockingbird', 'Harper Lee', 1960, 'Fiction');


-- Select all books
SELECT * FROM books;

-- Select books by a specific author
SELECT * FROM books WHERE author = 'Harper Lee';



-- Update the genre of a specific book
UPDATE books
SET genre = 'Historical Fiction'
WHERE title = 'To Kill a Mockingbird';


-- Update the genre of a specific book
UPDATE books
SET genre = 'Historical Fiction'
WHERE title = 'To Kill a Mockingbird';
