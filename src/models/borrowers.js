import database from "../database";
export class Borrowers {
  async index() {
    try {
      const connect = await database.connect();
      const sql = "SELECT * FROM borrowers";
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can't find borrowers table: ${err}`);
    }
  }

  async register({ name, email, register_date }) {
    try {
      const connect = await database.connect();
      const sql =
        "INSERT INTO borrowers (name, email, register_date) VALUES ($1, $2, $3) RETURNING *";
      const result = await connect.query(sql, [name, email, register_date]);
      connect.release;
      return result.rows;
    } catch (err) {
      throw new Error(`Can't register the borrower: ${err}`);
    }
  }
  async update(updatedInfo, searchByEmail) {
    let ColumnsWithValues = "";
    const columnsValue = Object.values(updatedInfo);
    Object.keys(updatedInfo).forEach((columnName, index) => {
      ColumnsWithValues =
        index === 0
          ? `${ColumnsWithValues}${columnName}='${columnsValue[index]}'`
          : `${ColumnsWithValues}, ${columnName}='${columnsValue[index]}'`;
    });
    try {
      const conn = await database.connect();
      const sql = `UPDATE borrowers SET ${ColumnsWithValues} WHERE email=$1 RETURNING *`;
      console.log(sql);
      const result = await conn.query(sql, [searchByEmail]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot update the borrower details ${err}`);
    }
  }
  async delete(email) {
    try {
      const conn = await database.connect();
      const sql = "DELETE FROM borrowers WHERE email=$1";
      const result = await conn.query(sql, [email]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot find the borrower ${err}`);
    }
  }
}
