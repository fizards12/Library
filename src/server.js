import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import booksHandler from "./handlers/booksHandler.js";
import borrowedBooksHandler from "./handlers/borrowedBooksHandler.js";
import borrowersHandler from "./handlers/borrowersHandler.js";
const app = express();
const corsOptions = {
  origin: '*',
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.send("Hello World!");
});

booksHandler(app);
borrowersHandler(app);
borrowedBooksHandler(app);

app.listen(3000, () => {
  console.log("starting application: http://localhost:3000");
});
