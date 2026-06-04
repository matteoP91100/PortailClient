require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const demandeRoutes = require("./routes/demandeRoutes");
const pieceRoutes = require("./routes/pieceRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/demandes", demandeRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/pieces", pieceRoutes);
module.exports = app;