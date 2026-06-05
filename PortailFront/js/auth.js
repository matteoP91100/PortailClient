async function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";
    } else {
        alert("Erreur login");
    }
}

function togglePassword() {

    const passwordInput =
        document.getElementById("password");

    passwordInput.type =
        passwordInput.type === "password"
            ? "text"
            : "password";
}