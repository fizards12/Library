"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _pg = require("pg");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var _process$env = process.env,
  POSTGRES_HOST = _process$env.POSTGRES_HOST,
  POSTGRES_DB = _process$env.POSTGRES_DB,
  POSTGRES_USER = _process$env.POSTGRES_USER,
  POSTGRES_PASSWORD = _process$env.POSTGRES_PASSWORD;
var database = new _pg.Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD
});
var _default = exports["default"] = database;