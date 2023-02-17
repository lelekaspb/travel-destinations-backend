const { Router } = require("express");
const {
  createDestination,
  updateDestination,
  getDestinationById,
  getAllDestinations,
  deleteDestination,
} = require("../controllers/traveldestinations.controller");
require("../configs/passport-config");
const passport = require("passport");
const { upload } = require("../services/file.service");

const router = Router();

router.post("/", upload.single("picture"), createDestination);
router.put("/:id", upload.single("picture"), updateDestination);
router.get("/:id", getDestinationById);
router.get("/", getAllDestinations);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteDestination
);

module.exports = router;
