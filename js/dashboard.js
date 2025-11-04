document.addEventListener("DOMContentLoaded", () => {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  const income = transactions
    .filter(t => t.type === "buy")
    .reduce((a, b) => a + b.amount, 0);
  const expenses = transactions
    .filter(t => t.type === "sell")
    .reduce((a, b) => a + b.amount, 0);
  const tax = (income - expenses) * 0.05;

  document.getElementById("totalIncome").textContent = `$${income.toFixed(2)}`;
  document.getElementById("totalExpenses").textContent = `$${expenses.toFixed(2)}`;
  document.getElementById("totalTax").textContent = `$${tax.toFixed(2)}`;

  const tbody = document.querySelector("#recentTransactions tbody");
  tbody.innerHTML = transactions.slice(-5).reverse().map(t => `
    <tr>
      <td>${t.date}</td>
      <td>${t.desc}</td>
      <td>${t.type}</td>
      <td>$${t.amount.toFixed(2)}</td>
    </tr>
  `).join("");
});
