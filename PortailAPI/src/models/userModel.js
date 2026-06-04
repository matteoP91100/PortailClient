const db = require("../config/db");

const User = {

    create: (userData, callback) => {

        const sql = `
            INSERT INTO users
            (societe, firstname, lastname, email, password, role)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [
            userData.societe,
            userData.firstname,
            userData.lastname,
            userData.email,
            userData.password,
            userData.role
        ], callback);
    },

    findByEmail: (email, callback) => {

        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            callback
        );
    },

    findById: (id, callback) => {

        db.query(
            "SELECT * FROM users WHERE id = ?",
            [id],
            callback
        );
    }

};

module.exports = User;