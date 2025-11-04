document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addTransactionForm");
  const tableBody = document.querySelector("#transactionTable tbody");

  function renderTable() {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    if (tableBody) {
      tableBody.innerHTML = transactions.map((t, i) => `
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>${t.date}</td>
          <td>${t.desc}</td>
          <td>${t.type}</td>
          <td>$${t.amount.toFixed(2)}</td>
          <td><button onclick="deleteTransaction(${i})">Delete</button></td>
        </tr>
      `).join("");
    }
  }

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const t = {
        date: document.getElementById("tDate").value,
        desc: document.getElementById("tDesc").value,
        type: document.getElementById("tType").value,
        amount: parseFloat(document.getElementById("tAmount").value)
      };
      const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
      transactions.push(t);
      localStorage.setItem("transactions", JSON.stringify(transactions));
      alert("Transaction added!");
      window.location.href = "transaction.html";
    });
  }

  renderTable();
});

function deleteTransaction(i) {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  transactions.splice(i, 1);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  location.reload();
}
