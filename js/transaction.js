document.addEventListener("DOMContentLoaded", () => {
    // 1. Get references
    const form = document.getElementById("transactionForm"); 
    const tableBody = document.querySelector("#transactionTable tbody");

    // 2. Function to render the table of transactions (for transaction.html)
    function renderTable() {
        const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        if (tableBody) {
            // Mapping the saved object keys (date, desc, type, amount) to the table columns
            tableBody.innerHTML = transactions.map((t, i) => `
                <tr>
                    <td>${i + 1}</td> 
                    <td>${t.date}</td>
                    <td>${t.desc}</td>
                    <td>${t.type}</td>
                    <td>$${t.amount.toFixed(2)}</td> 
                    <td><button onclick="deleteTransaction(${i})">Delete</button></td>
                </tr>
            `).join("");
        }
    }

    // 3. Form Submission Logic (Runs on add-transaction.html)
    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();
            
            // Get common fields and the option type
            const tOptionValue = document.getElementById("tOption").value;
            const tDate = document.getElementById("tDate") ? document.getElementById("tDate").value : '';
            const tType = document.getElementById("tType") ? document.getElementById("tType").value : '';

            let amount = 0;
            let desc = "N/A";

            // Determine 'amount' and 'desc' based on the selected option and type (FIXED LOGIC)
            if (tOptionValue === "exchange") {
                const thbAmount = parseFloat(document.getElementById("tAmountTHB").value);
                const usdAmount = parseFloat(document.getElementById("tAmountUSD").value);
                const transactionType = document.getElementById("tType").value; // 'buy' or 'sell'

                // FIX: Apply your specific rule: Buy=THB amount, Sell=USD amount
                if (transactionType === "buy") {
                    amount = thbAmount;
                    desc = `Exchange: Buy USD with ${thbAmount.toFixed(2)} THB`;
                } else if (transactionType === "sell") {
                    amount = usdAmount;
                    desc = `Exchange: Sell ${usdAmount.toFixed(2)} USD for THB`;
                }
                
            } else if (tOptionValue === "trade_us") {
                // Assuming 'tGross' (Gross Amount USD) is the value to record
                amount = parseFloat(document.getElementById("tGross").value);
                const symbol = document.getElementById("tStockSymbol").value;
                desc = `US Trade (${tType}): ${symbol}`;
            } else if (tOptionValue === "trade_th") {
                // Assuming 'tGross' (Gross Amount THB) is the value to record
                amount = parseFloat(document.getElementById("tGross").value);
                const symbol = document.getElementById("tStockSymbol").value;
                desc = `TH Trade (${tType}): ${symbol}`;
            }

            // Create and save the unified transaction object
            const t = {
                date: tDate,
                desc: desc,
                type: tType,
                amount: amount
            };
            
            const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
            transactions.push(t);
            localStorage.setItem("transactions", JSON.stringify(transactions));
            
            alert("Transaction added!");
            
            // Redirect to the view page after saving
            window.location.href = "transaction.html"; 
        });
    }

    // 4. Initialization: Render table if on the transaction view page
    if (tableBody) {
        renderTable();
    }
});

// 5. Global Delete Function
function deleteTransaction(i) {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.splice(i, 1); 
    localStorage.setItem("transactions", JSON.stringify(transactions));
    
    // Reload the page to refresh the display
    location.reload(); 
}