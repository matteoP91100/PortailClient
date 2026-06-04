const db = require("../config/db");

const Piece = {

    create: (data, callback) => {

        const sql = `
            INSERT INTO pieces_jointes
            (demande_id, nom_fichier, url_fichier, date_upload)
            VALUES (?, ?, ?, NOW())
        `;

        db.query(sql, [
            data.demande_id,
            data.nom_fichier,
            data.url_fichier
        ], callback);
    },

    findByDemande: (demandeId, callback) => {

        db.query(
            "SELECT * FROM pieces_jointes WHERE demande_id = ?",
            [demandeId],
            callback
        );
    }
};

module.exports = Piece;