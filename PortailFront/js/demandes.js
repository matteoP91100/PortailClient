async function createDemande() {
  const objet = document.getElementById("objet").value;
  const description = document.getElementById("description").value;
  const fichiers = document.getElementById("pieces-jointes").files;

  // 1. Créer la demande
  const response = await fetch("http://localhost:3000/api/demandes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({ objet, description }),
  });

  if (!response.ok) {
    alert("Erreur lors de la création de la demande");
    return;
  }

  const demande = await response.json(); // ton API doit retourner { id, ... }

  // 2. Upload les pièces jointes si présentes
  if (fichiers.length > 0) {
    for (const fichier of fichiers) {
      const formData = new FormData();
      formData.append("fichier", fichier); // "fichier" correspond à upload.single("fichier")
      formData.append("demande_id", demande.id); // ✅ requis par addPiece

      const uploadResponse = await fetch(`http://localhost:3000/api/pieces`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
      });

      if (!uploadResponse.ok) {
        alert(`Erreur lors de l'upload de : ${fichier.name}`);
        window.location.href = "mes_demandes.html";
        return;
      }
    }
  }
  alert("Demande créée avec succès");
  window.location.href = "mes_demandes.html";
}
async function loadDemandes() {
  const container = document.getElementById("list-demandes");

  if (!container) {
    console.error("Element #list-demandes introuvable");
    return;
  }

  const response = await fetch("http://localhost:3000/api/demandes", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  const demandes = await response.json();
  container.innerHTML = "";

  for (const demande of demandes) {
    // Récupère les pièces jointes de chaque demande
    const pieceResponse = await fetch(
      `http://localhost:3000/api/pieces/${demande.id}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
    );
    const pieces = await pieceResponse.json();

    // Génère le HTML des pièces jointes
    const piecesHTML =
      pieces.length > 0
        ? `<div class="pieces-jointes">
                    <strong>Pièces jointes :</strong>
                    <ul>
                        ${pieces
                          .map(
                            (p) => `
                            <li>
                                <a href="http://localhost:3000/${p.url_fichier}" target="_blank">
                                    📎 ${p.nom_fichier}
                                </a>
                            </li>`,
                          )
                          .join("")}
                    </ul>
                   </div>`
        : `<p class="no-pieces"><em>Aucune pièce jointe</em></p>`;

    container.innerHTML += `
            <div class="card">
                <h3>${demande.objet}</h3>
                <p>${demande.description}</p>
                <p><strong>Statut :</strong> ${demande.statut}</p>
                <p><strong>Date :</strong> ${new Date(demande.date_creation).toLocaleDateString()}</p>
                ${piecesHTML}
            </div>
        `;
  }
}

async function loadToutesDemandes() {
    const container = document.getElementById("list-demandes");
    const token = localStorage.getItem("token");

    const societe = document.getElementById("filter-societe")?.value || "";
    const date = document.getElementById("filter-date")?.value || "";
    const statut = document.getElementById("filter-statut")?.value || "";

    // Construction des query params
    const params = new URLSearchParams();
    if (societe) params.append("societe", societe);
    if (date) params.append("date", date);
    if (statut) params.append("statut", statut);

    const response = await fetch(
        `http://localhost:3000/api/demandes?${params.toString()}`,
        { headers: { Authorization: "Bearer " + token } }
    );

    const demandes = await response.json();
    container.innerHTML = "";

    if (demandes.length === 0) {
        container.innerHTML = "<p>Aucune demande trouvée.</p>";
        return;
    }

    for (const demande of demandes) {
        const pieceResponse = await fetch(
            `http://localhost:3000/api/pieces/${demande.id}`,
            { headers: { Authorization: "Bearer " + token } }
        );
        const pieces = await pieceResponse.json();

        const piecesHTML = pieces.length > 0
            ? `<div class="pieces-jointes"><strong>Pièces jointes :</strong><ul>
                ${pieces.map(p =>
                    `<li><a href="http://localhost:3000/${p.url_fichier}" target="_blank">📎 ${p.nom_fichier}</a></li>`
                ).join("")}
               </ul></div>`
            : `<p><em>Aucune pièce jointe</em></p>`;

        container.innerHTML += `
            <div class="card">
                <h3>${demande.objet}</h3>
                <p>${demande.description}</p>
                <p><strong>Société :</strong> ${demande.societe}</p>
                <p><strong>Créé par :</strong> ${demande.firstname} ${demande.lastname}</p>
                <p><strong>Statut :</strong> ${demande.statut}</p>
                <p><strong>Date :</strong> ${new Date(demande.date_creation).toLocaleDateString()}</p>
                ${piecesHTML}
            </div>
        `;
    }
}