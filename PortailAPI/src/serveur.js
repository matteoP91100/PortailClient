require("dotenv").config();

const express = require("express");
const db = require("./config/db");
const app = require("./app");

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("API Portail Prorel OK");
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
