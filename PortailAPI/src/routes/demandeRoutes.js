const express = require("express");
const router = express.Router();

const demandeController = require("../controllers/demandeController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/", verifyToken, demandeController.createDemande);
router.get("/", verifyToken, demandeController.getDemandes);

module.exports = router;
