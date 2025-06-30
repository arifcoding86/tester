document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("regUsername").value;
      const password = document.getElementById("regPassword").value;
      localStorage.setItem("user", JSON.stringify({ username, password, coins: 100 }));
      alert("Registrasi berhasil!");
      window.location.href = "index.html";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("loginUsername").value;
      const password = document.getElementById("loginPassword").value;
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.username === username && user.password === password) {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "game.html";
      } else {
        alert("Login gagal!");
      }
    });
  }
});
