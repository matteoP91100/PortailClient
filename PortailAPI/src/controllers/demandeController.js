const Demande = require("../models/demandeModel");


// =======================
// CREATE DEMANDE
// =======================
exports.createDemande = (req, res) => {

    const { objet, description } = req.body;
    const userId = req.user.id;

    if (!objet || !description) {
        return res.status(400).json({
            message: "Objet et description requis"
        });
    }

    Demande.create(
        {
            objet,
            description,
            statut: "en_attente",
            user_id: userId
        },
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Erreur serveur"
                });
            }

            return res.status(201).json({
                message: "Demande créée",
                id: result?.insertId
            });
        }
    );
};


// =======================
// GET DEMANDES (ADMIN + CLIENT)
// =======================
exports.getDemandes = (req, res) => {

    const user = req.user;

    if (!user) {
        return res.status(401).json({
            message: "Non authentifié"
        });
    }

    // =========================
    // CAS ADMIN → TOUTES LES DEMANDES
    // =========================
    if (user.role === "admin") {

        return Demande.findAll((err, results) => {

            if (err) {
                return res.status(500).json({
                    message: "Erreur serveur"
                });
            }

            return res.status(200).json(results);
        });
    }


    // =========================
    // CAS CLIENT → SES DEMANDES
    // =========================
    Demande.findByUser(user.id, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Erreur serveur"
            });
        }

        return res.status(200).json(results);
    });
};