const { Router } = require("express");
const { getAllBooks, getBookById, createNewBook, deleteBook, updateBook } = require('../controllers/books');
const { validateJWT } = require("../middlewares/verifyJWT");
const { verifyAdminRole } = require("../middlewares/verifyAdminRole");
const router = Router();

router.get("/", getAllBooks);

router.get("/:id", [validateJWT, verifyAdminRole], getBookById);

router.post("/", createNewBook);

router.delete("/:id", deleteBook);

router.put("/:id", updateBook);

module.exports = router;