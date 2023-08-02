const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token) {
            next({
                status: 401,
                errorName: "No token",
                error: "No token present in headers"
            })

            // return res.status(401).json({
            //     message: "No token provided"
            // })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: "HS512"
        });

        req.user = decoded;

        next();

    } catch (error) {
        res.status(498).json(error);
    }

}

module.exports = authenticate;