import database from "../database.js";
export class Books {
  async index() {
    try {
      const connect = await database.connect();
      const sql = "SELECT * FROM books";
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can't find books table: ${err}`);
    }
  }

  async find(property, value) {
    try {
      const connect = await database.connect();
      const sql = `SELECT * FROM books WHERE ${property}=$1`;
      const result = await connect.query(sql, [value]);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can't find the book: ${err}`);
    }
  }

  async add({ title,author, isbn, quantity, shelf_location, status }) {
    try {
      const connect = await database.connect();
      const sql = `INSERT INTO books (title,author,isbn,quantity,shelf_location,status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;
      const result = await connect.query(sql, [
        title,
        author,
        isbn,
        quantity,
        shelf_location,
        status,
      ]);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can't add the book: ${err}`);
    }
  }
  async update(newDetails, searchByISBN) {
    let ColumnsWithValues = "";
    const columnsValue = Object.values(newDetails);
    Object.keys(newDetails).forEach((columnName, index) => {
      ColumnsWithValues =
        index === 0
          ? `${ColumnsWithValues}${columnName}='${columnsValue[index]}'`
          : `${ColumnsWithValues}, ${columnName}='${columnsValue[index]}'`;
    });
    try {
      const conn = await database.connect();
      const sql = `UPDATE books SET ${ColumnsWithValues} WHERE isbn=$1 RETURNING *`;
      const result = await conn.query(sql, [searchByISBN]);
      conn.release();
      return result.rows;
    } catch (err) {
      console.log(err);
      throw new Error(`Cannot change the book details ${err}`);
    }
  }
  async delete(isbn) {
    try {
      const conn = await database.connect();
      const sql = "DELETE FROM books WHERE isbn=$1 RETURNING *";
      const result = await conn.query(sql, [isbn]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot find the book ${err}`);
    }
  }
}
