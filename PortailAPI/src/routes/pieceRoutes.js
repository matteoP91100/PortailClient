const express = require("express");
const router = express.Router();

const pieceController = require("../controllers/pieceController");
const upload = require("../middleware/upload");

// upload fichier
router.post("/", upload.single("file"), pieceController.addPiece);

// récupérer pièces d'une demande
router.get("/:id", pieceController.getPieces);

module.exports = router;