// ==========================================
// SpendWise - Interactive JavaScript Logic
// ==========================================

// Initial Application State & Data Storage (Arrays)
let monthlyBudget = 50000; // Default base budget
let expenses = [
    { name: "Rent / Housing", amount: 15000 },
    { name: "Food & Groceries", amount: 10000 },
    { name: "Transport", amount: 5000 }
];

// DOM Elements Selection
const budgetDisplay = document.getElementById("display-budget");
const totalExpensesDisplay = document.getElementById("display-total-expenses");
const balanceDisplay = document.getElementById("display-balance");
const expenseList = document.getElementById("expense-list");
const expenseForm = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const budgetAlertBox = document.getElementById("budget-alert");

/**
 * Requirement 3: Process Data with Loops
 * Calculates total expenses by looping through the expenses array.
 */
function calculateTotalExpenses() {
    let sum = 0;
    for (let i = 0; i < expenses.length; i++) {
        sum += expenses[i].amount;
    }
    return sum;
}

/**
 * Requirement 1: Implement Decision Making (Conditionals)
 * Evaluates the remaining balance and updates visual feedback alerts.
 */
function evaluateBudgetStatus(remaining, total, budget) {
    budgetAlertBox.style.display = "block";
    
    if (remaining < 0) {
        budgetAlertBox.style.background = "#fee2e2";
        budgetAlertBox.style.color = "#991b1b";
        budgetAlertBox.style.border = "1px solid #f87171";
        budgetAlertBox.textContent = `⚠️ Alert: You have exceeded your budget by KES ${Math.abs(remaining).toLocaleString()}!`;
    } else if (remaining < budget * 0.2) {
        budgetAlertBox.style.background = "#fef3c7";
        budgetAlertBox.style.color = "#92400e";
        budgetAlertBox.style.border = "1px solid #fbbf24";
        budgetAlertBox.textContent = `⚠️ Warning: You are running low on funds. Only KES ${remaining.toLocaleString()} left.`;
    } else {
        budgetAlertBox.style.background = "#d1fae5";
        budgetAlertBox.style.color = "#065f46";
        budgetAlertBox.style.border = "1px solid #34d399";
        budgetAlertBox.textContent = `✅ Great job! Your budget is healthy with KES ${remaining.toLocaleString()} remaining surplus.`;
    }
}

/**
 * Requirement 4: Update the Dashboard Dynamically (DOM Manipulation)
 * Updates text content and renders the expense list using a loop.
 */
function updateDashboard() {
    let totalExpenses = calculateTotalExpenses();
    let remainingBalance = monthlyBudget - totalExpenses;

    // Update Summary Metric Cards
    budgetDisplay.textContent = `KES ${monthlyBudget.toLocaleString()}`;
    totalExpensesDisplay.textContent = `KES ${totalExpenses.toLocaleString()}`;
    balanceDisplay.textContent = `KES ${remainingBalance.toLocaleString()}`;

    // Clear current list content
    expenseList.innerHTML = "";

    // Handle empty state or render expense list items using a loop
    if (expenses.length === 0) {
        expenseList.innerHTML = `<p style="color: var(--secondary-text-color);">No expenses recorded yet.</p>`;
    } else {
        expenses.forEach((item, index) => {
            const li = document.createElement("li");
            li.style.display = "flex";
            li.style.justifyContent = "space-between";
            li.style.alignItems = "center";
            li.style.padding = "12px";
            li.style.marginbottom = "8px";
            li.style.borderBottom = "1px solid var(--border-color, #e2e8f0)";
            
            li.innerHTML = `
                <span><strong>${item.name}</strong></span>
                <span style="color: var(--brand-color); font-weight: 600;">KES ${item.amount.toLocaleString()}</span>
            `;
            expenseList.appendChild(li);
        });
    }

    // Trigger Decision Making Conditionals
    evaluateBudgetStatus(remainingBalance, totalExpenses, monthlyBudget);
}

/**
 * Requirement 5: Handle User Interactions (Event Listeners)
 * Listens for form submissions to capture user input, push to array, and refresh UI.
 */
expenseForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page reload

    let name = expenseNameInput.value.trim();
    let amount = parseFloat(expenseAmountInput.value);

    if (name && !isNaN(amount) && amount > 0) {
        // Push new record object into the expenses array
        expenses.push({ name: name, amount: amount });

        // Reset input fields
        expenseNameInput.value = "";
        expenseAmountInput.value = "";

        // Refresh dynamic dashboard view
        updateDashboard();
    } else {
        alert("Please enter a valid expense name and a positive amount.");
    }
});

// Initial Render on Page Load
updateDashboard();