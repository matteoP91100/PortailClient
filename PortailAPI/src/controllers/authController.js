const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const SECRET_KEY = process.env.JWT_SECRET; // 

// REGISTER
exports.register = (req, res) => {

    const { societe, firstname, lastname, email, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {

        if (err) {
            return res.status(500).json({ error: err });
        }

        const user = {
            societe,
            firstname,
            lastname,
            email,
            password: hash,
            role: "client"
        };

        User.create(user, (err) => {

            if (err) {
                return res.status(500).json({ error: err });
            }

            res.status(201).json({ message: "Utilisateur créé" });
        });
    });
};


// LOGIN
exports.login = (req, res) => {

    const { email, password } = req.body;

    User.findByEmail(email, (err, results) => {

        if (err) return res.status(500).json({ error: err });

        if (results.length === 0) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {

            if (!isMatch) {
                return res.status(401).json({ message: "Mot de passe incorrect" });
            }

            const token = jwt.sign(
                { id: user.id, role: user.role },
                SECRET_KEY,
                { expiresIn: "1h" }
            );

            res.json({
                message: "Connexion réussie",
                token
            });
        });
    });
};