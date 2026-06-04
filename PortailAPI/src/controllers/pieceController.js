const Piece = require("../models/pieceModel");

// AJOUT PIECE
exports.addPiece = (req, res) => {

    const { demande_id } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: "Fichier manquant" });
    }

    const data = {
        demande_id,
        nom_fichier: req.file.originalname,
        url_fichier: req.file.path
    };

    Piece.create(data, (err) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            message: "Fichier ajouté"
        });
    });
};


// GET PIECES PAR DEMANDE
exports.getPieces = (req, res) => {

    const demandeId = req.params.id;

    Piece.findByDemande(demandeId, (err, results) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });
};