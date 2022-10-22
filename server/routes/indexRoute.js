var express = require("express");
var router = express.Router();

const {
    homepage,
    signup,
    signin,
    logout,
    upload,
    loaduser,
} = require("../controllers/indexController");
const { isLoggedIn } = require("../utils/isloggedin");

/**@api GET / homepage */
router.get("/", isLoggedIn, homepage);

/**@api GET /me homepage */
router.get("/me", isLoggedIn, loaduser);

/**@api POST / signup */
router.post("/signup", signup);

/**@api POST / signin */
router.post("/signin", signin);

/**@api GET / logout */
router.get("/logout", logout);

/**@api POST / upload/:id */
router.post("/upload/:id", upload);

module.exports = router;
