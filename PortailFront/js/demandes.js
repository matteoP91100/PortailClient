async function createDemande() {
  const objet = document.getElementById("objet").value;

  const description = document.getElementById("description").value;

  const response = await fetch("http://localhost:3000/api/demandes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({
      objet,
      description,
    }),
  });

  if (response.ok) {
    alert("Demande créée avec succès");
    window.location.href = "mes_demandes.html";
  }
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

  console.log(localStorage.getItem("token"));
  const demandes = await response.json();

  container.innerHTML = "";

  demandes.forEach((demande) => {
    container.innerHTML += `
            <div class="card">
                <h3>${demande.objet}</h3>
                <p>${demande.description}</p>
                <p><strong>Statut :</strong> ${demande.statut}</p>
                <p><strong>Date :</strong> ${new Date(demande.date_creation).toLocaleDateString()}</p>
            </div>
        `;
  });
}
