import { Books } from "../models/books.js";

const books = new Books();

const showAll = async (req, res) => {
  try {
    const allBooks = await books.index().catch((err) => {
      res.status(401);
      throw Error(`Can't read from database:${err}`);
    });

    res.json(allBooks);
  } catch (err) {
    res.json(err);
  }
};

const findBook = async (req, res) => {
  try {
    const result = await books
      .find(Object.keys(req.params)[0], Object.values(req.params)[0])
      .catch((err) => {
        res.status(402);
        throw err;
      });

    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

const addBook = async (req, res) => {
  const newBook = {
    title: req.body.book.title,
    author: req.body.book.author,
    isbn: req.body.book.isbn,
    quantity: req.body.book.quantity,
    shelf_location: req.body.book.shelf_location,
    status: req.body.book.status,
  };

  try {
    const result = await books.add(newBook).catch((err) => {
      res.status(403);
      throw new Error(err);
    });

    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

const editBookDetails = async (req, res) => {
  const newDetails = { ...req.body.newDetails };
  const isbn = req.params.isbn;
  try {
    const result = await books.update(newDetails, isbn).catch((err) => {
      res.status(404);
      throw err;
    });

    res.json(result);
  } catch (err) {
    res.json(err);
  }
};
const deleteBook = async (req, res) => {
  const isbn = req.params.isbn;

  try {
    const result = await books.delete(isbn).catch((err) => {
      res.status(405);
      throw err;
    });
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

const booksHandler = (app) => {
  app.get("/books", showAll);
  app.get("/books/:isbn", findBook);
  app.post("/books", addBook);
  app.post("/books/:isbn", editBookDetails);
  app.delete("/books/:isbn", deleteBook);
};

export default booksHandler;
