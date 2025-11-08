// Basic login/logout + session management
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const currentPage = window.location.pathname.split("/").pop();

  if (!user && currentPage !== "index.html") {
    window.location.href = "index.html";
  }

  if (currentPage === "index.html") {
    const form = document.getElementById("loginForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const pass = document.getElementById("password").value;

        if (email === "user@test.com" && pass === "123456") {
          localStorage.setItem("user", JSON.stringify({ email }));
          window.location.href = "account.html";
        } else {
          alert("Invalid credentials. Try user@test.com / 123456");
        }
      });
    }
  }

  const logout = document.getElementById("logoutBtn");
  if (logout) {
    logout.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "index.html";
    });
  }
});
