const { Router } = require("express");
const { signUp, signIn } = require("../controllers/auth.controller.js");

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

module.exports = router;
