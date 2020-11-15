const express = require("express");
const router = express.Router();
const { authentication, authAdmin } = require("../middleware/auth");
const { uploadImage } = require("../middleware/uploadImage");
const {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/user");

const { Register, Login, checkAuth } = require("../controllers/auth");

const {
  getAllLibrary,
  getLibrary,
  addLibrary,
  deleteLibrary,
} = require("../controllers/library");

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
router.get("/user", authentication, getUsers);
router.get("/user/:id", authentication, getUser);
router.patch("/user/:id", authentication, uploadImage("picture"), updateUser);
router.delete("/user/:id", authentication, authAdmin, deleteUser);

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

// LIBRARY ROUTE
router.get("/library", getAllLibrary);
router.get("/library/:id", getLibrary);
router.post("/library", addLibrary);
router.delete("/library/:id", deleteLibrary);

module.exports = router;
