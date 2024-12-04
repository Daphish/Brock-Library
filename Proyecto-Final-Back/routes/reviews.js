const { Router } = require("express");
const { createReview, deleteReview } = require("../controllers/review");
const { validateJWT } = require("../middlewares/verifyJWT");
const router = Router();

router.post("/:bookId/review", [validateJWT], createReview);
router.delete("/:id", [validateJWT], deleteReview)

module.exports = router;