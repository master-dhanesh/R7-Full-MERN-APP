// const { expressjwt } = require("express-jwt");
const jwt = require("jsonwebtoken");

exports.isLoggedIn = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const { id } = jwt.verify(token, process.env.JWTSECRET);
        req.id = id;
        next();
    } catch (err) {
        if (err.name === "JsonWebTokenError") {
            res.status(500).json({
                message: "can not access resources without logging in",
            });
        } else if (err.name === "TokenExpiredError") {
            res.status(500).json({ message: "session timeout! login again" });
        } else {
            res.status(500).json(err.message);
        }
    }

    // getToken: (req, res) => req.cookies.token,
    // secret: process.env.JWTSECRET,
    // algorithms: ["HS256"],
};
// req.auth.id
