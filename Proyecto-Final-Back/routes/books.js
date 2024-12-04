const { Router } = require("express");
const { getAllBooks, getBookById, createNewBook, deleteBook, updateBook } = require('../controllers/books');
const { validateJWT } = require("../middlewares/verifyJWT");
const { verifyAdminRole } = require("../middlewares/verifyAdminRole");
const router = Router();

router.get("/", getAllBooks);

router.get("/:id", getBookById);

router.post("/", [validateJWT, verifyAdminRole], createNewBook);

router.delete("/:id", [validateJWT, verifyAdminRole], deleteBook);

router.put("/:id", [validateJWT, verifyAdminRole], updateBook);

module.exports = router;