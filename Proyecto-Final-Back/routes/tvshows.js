const { Router } = require("express");
const { getAllTvShows, createNewTvShow, getTvShowById, deleteTvShow, updateTvShow } = require('../controllers/tvshows');
const { validateJWT } = require("../middlewares/verifyJWT");
const { verifyAdminRole } = require("../middlewares/verifyAdminRole");
const router = Router();

router.get("/", [validateJWT], getAllTvShows);

router.get("/:id", [validateJWT, verifyAdminRole], getTvShowById);

router.post("/", createNewTvShow);

router.delete("/:id", deleteTvShow);

router.put("/:id", updateTvShow);

module.exports = router;