const express = require("express");
const router = express.Router();

const { authentication } = require("../middleware/auth");

const { getAllUser, getUser, deleteUser } = require("../controllers/user");

const { Register, Login, checkAuth } = require("../controllers/auth");

const {
  getAllBook,
  getBook,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/book");

const {
  getAllCategory,
  getCategory,
  addCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/category");

// REGISTER & LOGIN ROUTE
router.post("/register", Register);
router.post("/login", Login);
router.get("/auth", authentication, checkAuth);

// USER ROUTE
router.get("/user", getAllUser);
router.get("/user/:id", getUser);
router.delete("/user/:id", deleteUser);

// CATEGORY ROUTE
router.get("/category", getAllCategory);
router.get("/category/:id", getCategory);
router.post("/category", authentication, addCategory);
router.patch("/category/:id", authentication, updateCategory);
router.delete("/category/:id", authentication, deleteCategory);

// BOOK ROUTE
router.get("/book", getAllBook);
router.get("/book/:id", getBook);
router.post("/book", authentication, addBook);
router.patch("/book/:id", authentication, updateBook);
router.delete("/book/:id", authentication, deleteBook);

module.exports = router;
