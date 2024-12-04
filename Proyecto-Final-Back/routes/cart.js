const { Router } = require("express");
const { updateCart } = require("../controllers/cart");
const { validateJWT } = require("../middlewares/verifyJWT");
const router = Router();

router.put("/", [validateJWT], updateCart);

module.exports = router;