const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {

    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ message: "Token manquant" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);

        req.user = decoded; // id + role
        next();

    } catch (err) {
        return res.status(401).json({ message: "Token invalide" });
    }
};

module.exports = verifyToken;