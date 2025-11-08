document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("addAccountBtn");
  const table = document.querySelector("#accountTable tbody");

  function render() {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    table.innerHTML = accounts.map((a, i) => `
      <tr>
        <td>${a.name}</td>
        <td>$${a.balance.toFixed(2)}</td>
        <td><button onclick="deleteAccount(${i})">Delete</button></td>
        <td><button onclick="loginAccount(${i})">select</button></td>  </tr>
    `).join("");
  }

  if (btn) {
    btn.addEventListener("click", () => {
      const name = prompt("Account name:");
      const balance = parseFloat(prompt("Starting balance:"));
      if (!name || isNaN(balance)) return;
      const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
      accounts.push({ name, balance });
      localStorage.setItem("accounts", JSON.stringify(accounts));
      render();
    });
  }

  render();
});

// Existing function for deleting an account
function deleteAccount(i) {
  const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  accounts.splice(i, 1);
  localStorage.setItem("accounts", JSON.stringify(accounts));
  // Call render() instead of location.reload() for better user experience
  // but keeping location.reload() for simplicity with external functions:
  location.reload(); 
}

// ⭐ NEW FUNCTION: Handles the "login" action and redirection
function loginAccount(i) {
    // 1. (Optional) Store which account is "logged in" for the dashboard to use
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const loggedInAccount = accounts[i];
    
    // You could save the selected account's index or ID to sessionStorage/localStorage
    // for your dashboard page to retrieve. Example:
    sessionStorage.setItem("loggedInAccountIndex", i);
    console.log(`Logging in with account: ${loggedInAccount.name}`);

    // 2. Redirect the user to the dashboard page
    window.location.href = "dashboard.html"; // ⭐ CHANGE 'dashboard.html' to your actual dashboard URL
}