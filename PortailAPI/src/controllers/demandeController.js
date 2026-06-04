const Demande = require("../models/demandeModel");

// CREATE DEMANDE
exports.createDemande = (req, res) => {

    const { objet, description } = req.body;

    const userId = req.user.id;

    Demande.create(
        {
            objet,
            description,
            statut: "en_attente",
            user_id: userId
        },
        (err) => {

            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: "Demande créée"
            });
        }
    );
};


// GET USER DEMANDES
exports.getMyDemandes = (req, res) => {

    const userId = req.user.id;

    Demande.findByUser(userId, (err, results) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });
};


// GET ALL (ADMIN)
exports.getAllDemandes = (req, res) => {

    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Accès refusé" });
    }

    Demande.findAll((err, results) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });
};