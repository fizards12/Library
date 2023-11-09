"use strict";

var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _booksHandler = _interopRequireDefault(require("./handlers/booksHandler.js"));
var _borrowedBooksHandler = _interopRequireDefault(require("./handlers/borrowedBooksHandler.js"));
var _borrowersHandler = _interopRequireDefault(require("./handlers/borrowersHandler.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
var corsOptions = {
  origin: '*',
  optionSuccessStatus: 200
};
app.use((0, _cors["default"])(corsOptions));
app.use(_bodyParser["default"].json());
app.get("/", function (req, res) {
  res.send("Hello World!");
});
(0, _booksHandler["default"])(app);
(0, _borrowersHandler["default"])(app);
(0, _borrowedBooksHandler["default"])(app);
app.listen(3000, function () {
  console.log("starting application: http://localhost:3000");
});