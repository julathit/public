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
      </tr>
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

function deleteAccount(i) {
  const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  accounts.splice(i, 1);
  localStorage.setItem("accounts", JSON.stringify(accounts));
  location.reload();
}
