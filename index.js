let expenseForm = document.getElementById("expenseForm");
let expenseName = document.getElementById("expenseName");
let expenseAmount = document.getElementById("expenseAmount");
let expenseCategory = document.getElementById("expenseCategory");
let expenseDate = document.getElementById("expenseDate");
let expenseList = document.getElementById("expenseList");
let totalAmount = document.getElementById("totalAmount");
let categoryFilter = document.getElementById("categoryFilter");

let expenses = [];

expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let expense = {
        name: expenseName.value,
        amount: expenseAmount.value,
        category: expenseCategory.value,
        date: expenseDate.value,
        id: Date.now()
    };

    expenses.push(expense);
    displayExpenses();
    updateTotal();
    expenseForm.reset();
});

function displayExpenses(filteredList = expenses) {
    expenseList.innerHTML = ""; 

    filteredList.forEach((expense) => {
        let row = document.createElement("tr");
        row.classList.add("border");
        row.innerHTML = `
            <td class="border px-4 py-2">${expense.name}</td>
            <td class="border px-4 py-2">₹ ${expense.amount}</td>
            <td class="border px-4 py-2">${expense.category}</td>
            <td class="border px-4 py-2">${expense.date}</td>
            <td class="border px-4 py-2">
                <button class="edit-btn border p-2 bg-yellow-500 text-white" data-id="${expense.id}">Edit</button>
                <button class="delete-btn border p-2 bg-red-500 text-white" data-id="${expense.id}">Delete</button>
            </td>
        `;
        expenseList.appendChild(row);
    });
}

function updateTotal() {
    let total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    totalAmount.textContent = total.toFixed(2);
}

expenseList.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-btn")) {
        let id = event.target.getAttribute("data-id");
        expenses = expenses.filter(exp => exp.id != id);
        displayExpenses();
        updateTotal();
    }

    if (event.target.classList.contains("edit-btn")) {
        let id = event.target.getAttribute("data-id");
        let expense = expenses.find(exp => exp.id == id);
        if (expense) {
            expenseName.value = expense.name;
            expenseAmount.value = expense.amount;
            expenseCategory.value = expense.category;
            expenseDate.value = expense.date;

            expenses = expenses.filter(exp => exp.id != id);
            displayExpenses();
            updateTotal();
        }
    }
});

categoryFilter.addEventListener("change", function () {
    const selectedCategory = categoryFilter.value;

    if (selectedCategory === "All") {
        displayExpenses();
    } else {
        let filteredExpenses = expenses.filter(exp => exp.category === selectedCategory);
        displayExpenses(filteredExpenses);
    }
});
