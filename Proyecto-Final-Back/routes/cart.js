const { Router } = require("express");
const { updateCart, deleteFromCart } = require("../controllers/cart");
const { validateJWT } = require("../middlewares/verifyJWT");
const router = Router();

router.put("/", [validateJWT], updateCart);
router.delete("/:id", [validateJWT], deleteFromCart);

module.exports = router;