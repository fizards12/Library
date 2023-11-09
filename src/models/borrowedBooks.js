import database from "../database";
export class BorrowedBooks {
  async index() {
    try {
      const connect = await database.connect();
      const sql = `SELECT title AS book_title,name AS borrower_name, return_date FROM borrowed_books
         INNER JOIN books ON borrowed_books.book_isbn = books.isbn 
         INNER JOIN borrowers ON borrowed_books.borrower_email = borrowers.email`;
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can't find books table: ${err}`);
    }
  }

  async borrowerBooks(borrowerEmail) {
    try {
      const connect = await database.connect();
      const sql = `SELECT name AS borrower_name, title AS book_title, return_date FROM borrowed_books
         JOIN books ON borrowed_books.book_isbn = books.isbn 
         JOIN borrowers ON borrowed_books.borrower_email = borrowers.email
         WHERE borrower_email=$1`;
      const result = await connect.query(sql, [borrowerEmail]);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can't find borrower books table: ${err}`);
    }
  }

  async borrow({ return_date, bookISBN, borrowerEmail }) {
    try {
      const connect = await database.connect();
      //A book has been borrowed from the library so it.

      let sql = `INSERT INTO borrowed_books (return_date,book_isbn,borrower_email) VALUES ($1, $2, $3) 
        RETURNING *`;

      const result = await connect.query(sql, [
        return_date,
        bookISBN,
        borrowerEmail,
      ]);
      sql = "UPDATE books SET quantity = quantity-1 WHERE isbn=$1";
      await connect.query(sql, [bookISBN]);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can't return the book to library: ${err}`);
    }
  }

  async endBorrowing(isbn) {
    try {
      const connect = await database.connect();
      let sql = `DELETE FROM borrowed_books WHERE book_isbn=$1 RETURNING *`;
      const result = await connect.query(sql, [isbn]);
      sql = "UPDATE books SET quantity = quantity+1 WHERE isbn=$1";
      await connect.query(sql, [isbn]);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can't return the book to library: ${err}`);
    }
  }

  async overDue(currentDate) {
    console.log(currentDate);
    try {
      const connect = await database.connect();
      const sql = `SELECT name AS borrower_name, title AS book_title FROM borrowed_books
     INNER JOIN books ON borrowed_books.book_isbn = books.isbn 
     INNER JOIN borrowers ON borrowed_books.borrower_email = borrowers.email
     WHERE return_date < $1`;
      const result = await connect.query(sql, [currentDate]);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can't return the book to library: ${err}`);
    }
  }
}
