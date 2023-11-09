import { BorrowedBooks } from "../models/borrowedBooks";

const borrowedBooks = new BorrowedBooks();

//Show all borrowed books with title of the book and name of the borrower
const showAll = async (req, res) => {
  try {
    const allBorrowedBooks = await borrowedBooks.index().catch((err) => {
      console.log(err)
      res.status(401);
      throw Error(`Can't read borrowedBooks from database:${err}`);
    });

    res.json(allBorrowedBooks);
  } catch (err) {
    res.json(err);
  }
};

// Show the books that the borrower took from library with
// the name of the borrower,
// books titles ,and last borrowing date
const findBorrowerBooks = async (req, res) => {
  try {
    const result = await borrowedBooks
      .borrowerBooks(req.params.email)
      .catch((err) => {
        res.status(402);
        throw err;
      });
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

// Borrow a book from the library and returning an object
// as response to the request with the name of the borrower and title of the book
const borrowBook = async (req, res) => {
  const borrowedBook = { ...req.body.borrowedBook };
  try {
    const result = await borrowedBooks.borrow(borrowedBook).catch((err) => {
      console.log(err);
      res.status(403);
      throw new Error(err);
    });

    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

//Show the overDue Books 
const overDueBooks = async (req, res) => {
  const currentDate = req.params.currentDate;
  try {
    const result = await borrowedBooks.overDue(currentDate).catch((err) => {
      console.log(err)
      res.status(404);
      throw err;
    });

    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

// End borrowing a book
const returnBook = async (req, res) => {
  const isbn = req.params.isbn;

  try {
    const result = await borrowedBooks.endBorrowing(isbn).catch((err) => {
      res.status(405);
      throw err;
    });
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

const borrowedBooksHandler = (app) => {
  app.get("/borrowed-books", showAll);
  app.get("/borrowed-books/:email", findBorrowerBooks);
  app.get("/borrowed-books/over-due/:currentDate", overDueBooks);
  app.post("/borrowed-books", borrowBook);
  app.delete("/borrowed-books/:isbn", returnBook);
};

export default borrowedBooksHandler;
