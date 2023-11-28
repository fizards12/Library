# Library
**A simple library management system provides the API's needed to manage _books_ and _borrowers_ and _borrowing_ process**



## Package installation instructions.
- run `npm i -g db-migrate` to allow us to use terminal commands it provides.
- write on Terminal `npm install` to install all dependencies on package.json file.
- #### Note: 
  - ***you have to install visual studio 17 "desktop department c++" and CMake builder for db-migrate***
    ***and db-migrate-pg libraries.***. 

#### Ports of the database and Backend:
- database Port : 5432
- Backend Port : 3000

## Database Diagram:
1. **books** TABLE:
   - **Columns Name :**
     - title
     - author
     - isbn
     - quantity
     - shelf_location
     - status
3. **borrowers** TABLE:
   - **Columns Name :**
      - name
      - email
      - register_date
5. **borrowed_books** TABLE:
   - **Columns Name :**
      - book_isbn
      - borrower_email
      - return_date
> **NOTE:** All Tables have their _id_ column which auto increment for each row added

## Steps to run the program:
1. connect to database server using  **Terminal** or **pgAdmin 4** program.
2. Create **library** database.
3. database server is connected to the express server with `database.js` file.
  - `database.js` is the script to connect to database.
  - `.env` file has the connection information which need to be secured.
  - `database.json` has the information of the database that will be migrate.
4. run `npm run watch:dev`.
> ### .env Variables:
> - POSTGRES_HOST = 127.0.0.1
> - POSTGRES_DB = library
> - POSTGRES_USER = **_write the user_** (by default "postgres") 
> - POSTGRES_PASSWORD = **_write the password_**
-----------------------------------------------------------------------------------
## API EndPoints:

### Books APIs:
> #### Show all books on the library:
> - Request Type: **_GET_**
> - Request Route: http://localhost:3000/books
> - Response : return all **books** on library
> ### Search for a book using ISBN:
> - Request Type: **_GET_**
> - Request Route: http://localhost:3000/books/isbn-of-the-book
> - Request parameters:
>    - isbn: the **isbn** value of the book.
> - Response : return the **book information** _ the row from **books** table _ which its **isbn** is the same
> ### Add a book:
> - Request Type: **_POST_**
> - Request Body: **book** json object
>    - book object: contains the details of the book will be added to the library
> - Request Route: http://localhost:3000/books
> - Response : return the **book** just added
> ### Update book details:
> - Request Type: **_POST_**
> - Request Body: **newDetails** json object
>    - newDetails object: contains the updated information of the book.
> - Request Route: http://localhost:3000/books/isbn-of-the-book
> - Request parameters:
>    - isbn: the **isbn** value of the book.
> - Response : return the **Updated book information**
> ### Delete a book:
> - Request Type: **_DELETE_**
> - Request Route: http://localhost:3000/books/isbn-of-the-book
> - Request parameters:
>    - isbn: the **isbn** value of the book.
> - Response : return the **book information** which has been deleted

### Borrowers APIs:
> #### Show all registered borrowers:
> - Request Type: **_GET_**
> - Request Route: http://localhost:3000/borrowers
> - Response : return all **registered borrowers**
> ### Register borrower:
> - Request Type: **_POST_**
> - Request Body: **borrower** json object
>    - borrower object: contains borrower informations
> - Request Route: http://localhost:3000/borrowers
> - Response : return the **borrower** just added
> ### Update book details:
> - Request Type: **_POST_**
> - Request Body: **updatedInfo** json object
>    - updatedInfo object: contains the updated information of the borrower
> - Request Route: http://localhost:3000/borrowers/email-of-the-borrower
> - Request parameters:
>    - email: the **email** value of the borrower.
> - Response : return the **Updated borrower information**
> ### End membership:
> - Request Type: **_DELETE_**
> - Request Route: http://localhost:3000/borrowers/email-of-the-borrower
> - Request parameters:
>    - email: the **email** value of the borrower.
> - Response : return the **borrower information** which has been deleted

### Borrowed Books APIs:

> #### Show all borrowed books:
> - Request Type: **_GET_**
> - Request Route: http://localhost:3000/borrowed-books
> - Response : return all **borrowed books**
> - the information provided on each book object is: borrower_name , book_title, return_date
> ### find all books that borrowed by a borrower using borrower's email:
> - Request Type: **_GET_**
> - Request Route: http://localhost:3000/borrowed-books/email-of-the-borrower
> - Request parameters:
>    - email: the **email** value of the borrower.
> - Response : return all books **borrowed by** a borrower.
> - the information provided on each book object is: borrower_name , book_title, return_date
> ### find borrowed books that exceeds the return_date:
> - Request Type: **_GET_**
> - Request Route: http://localhost:3000/borrowed-books/currentDate
> - Request parameters:
>    - currentDate: write a specified date you want to check what are the borrowed books that overdue until that date.
> - Response : return the **overdue books**
> - the information provided on each book object is: borrower_name , book_title
> ### borrow a book:
> - Request Type: **_POST_**
> - Request Body: **borrowedBook** json object
>    - borrowedBook object: contains the details of the book will be borrowed
>       - book_isbn
>       - borrower_email
>       - return_date
> - Request Route: http://localhost:3000/borrowed-books
> - Response : return the **Request Body**.
> ### End borrowing:
> - Request Type: **_DELETE_**
> - Request Route: http://localhost:3000/borrowed-books/isbn-of-the-book
> - Request parameters:
>    - isbn: the **isbn** value of the book.
> - Response : return the row that deleted from the **borrowed_books** Table


