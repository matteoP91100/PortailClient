const db = require("../config/db");

const Demande = {

    create: (demandeData, callback) => {

        const sql = `
            INSERT INTO demandes_inter
            (objet, description, statut, date_creation, user_id)
            VALUES (?, ?, ?, NOW(), ?)
        `;

        db.query(sql, [
            demandeData.objet,
            demandeData.description,
            demandeData.statut,
            demandeData.user_id
        ], callback);
    },

    findAll: (callback) => {

        db.query(
            "SELECT * FROM demandes_inter",
            callback
        );
    },

    findByUser: (userId, callback) => {

        db.query(
            "SELECT * FROM demandes_inter WHERE user_id = ?",
            [userId],
            callback
        );
    },

    updateStatus: (id, statut, callback) => {

        db.query(
            "UPDATE demandes_inter SET statut = ? WHERE id = ?",
            [statut, id],
            callback
        );
    }

};

module.exports = Demande;