document.addEventListener('DOMContentLoaded', function() {
    loadExpenses();
    updateTotalExpenses(0); 
});

document.getElementById('add-expense').addEventListener('click', function() {
    const expenseName = document.getElementById('expense-name').value;
    const expenseAmount = document.getElementById('expense-amount').value;
    const expenseCategory = document.getElementById('expense-category').value;

    if (expenseName !== '' && expenseAmount !== '' && expenseCategory !== '') {
        const expenseList = document.getElementById('expense-items');

        const listItem = document.createElement('li');
        listItem.textContent = `${expenseName} - $${expenseAmount} (${expenseCategory})`;
        listItem.setAttribute('data-category', expenseCategory);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            expenseList.removeChild(listItem);
            updateTotalExpenses(-parseFloat(expenseAmount));
            saveExpenses();
        });

        listItem.appendChild(deleteButton);
        expenseList.appendChild(listItem);

        updateTotalExpenses(parseFloat(expenseAmount));
        saveExpenses();

        document.getElementById('expense-name').value = '';
        document.getElementById('expense-amount').value = '';
        document.getElementById('expense-category').value = '';
    } else {
        alert('Please enter all fields');
    }
});

document.getElementById('filter-category').addEventListener('change', function() {
    const filterCategory = this.value;
    const expenseItems = document.querySelectorAll('#expense-items li');

    expenseItems.forEach(item => {
        if (filterCategory === 'all' || item.getAttribute('data-category') === filterCategory) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});

function updateTotalExpenses(amount) {
    const totalExpensesElement = document.getElementById('total-expenses');
    const currentTotal = parseFloat(totalExpensesElement.textContent);
    const newTotal = currentTotal + amount;
    totalExpensesElement.textContent = newTotal.toFixed(2);
}

document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const container = document.querySelector('.container');
    container.classList.toggle('dark-mode');

    const listItems = document.querySelectorAll('.expense-list li');
    listItems.forEach(item => {
        item.classList.toggle('dark-mode');
    });

    const themeToggleBtn = document.getElementById('theme-toggle');
    themeToggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

function saveExpenses() {
    const expenseItems = document.querySelectorAll('#expense-items li');
    const expenses = [];

    expenseItems.forEach(item => {
        const text = item.textContent.replace('Delete', '').trim();
        const amount = parseFloat(text.match(/\$([\d.]+)/)[1]);
        const name = text.split(' - ')[0];
        const category = item.getAttribute('data-category');
        expenses.push({ name, amount, category });
    });

    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense => {
        const expenseList = document.getElementById('expense-items');

        const listItem = document.createElement('li');
        listItem.textContent = `${expense.name} - $${expense.amount} (${expense.category})`;
        listItem.setAttribute('data-category', expense.category);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            expenseList.removeChild(listItem);
            updateTotalExpenses(-parseFloat(expense.amount));
            saveExpenses();
        });

        listItem.appendChild(deleteButton);
        expenseList.appendChild(listItem);

        updateTotalExpenses(parseFloat(expense.amount));
    });
}

const exampleExpenses = [
    { name: 'Lunch', amount: 15.00, category: 'Food' },
    { name: 'Bus Ticket', amount: 2.50, category: 'Transport' },
    { name: 'Movie', amount: 12.00, category: 'Entertainment' },
    { name: 'Coffee', amount: 4.50, category: 'Food' },
    { name: 'Uber', amount: 25.00, category: 'Transport' },
    // Add more example expenses here
];

function addExampleExpenses() {
    exampleExpenses.forEach(expense => {
        const expenseList = document.getElementById('expense-items');

        const listItem = document.createElement('li');
        listItem.textContent = `${expense.name} - $${expense.amount} (${expense.category})`;
        listItem.setAttribute('data-category', expense.category);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            expenseList.removeChild(listItem);
            updateTotalExpenses(-parseFloat(expense.amount));
            saveExpenses();
        });

        listItem.appendChild(deleteButton);
        expenseList.appendChild(listItem);

        updateTotalExpenses(parseFloat(expense.amount));
        saveExpenses();
    });
}

addExampleExpenses();

document.getElementById('export-expenses').addEventListener('click', function() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    if (expenses.length === 0) {
        alert('No expenses to export.');
        return;
    }
    
    const csvContent = "data:text/csv;charset=utf-8,"
        + expenses.map(expense => `${expense.name},${expense.amount},${expense.category}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link); 
    link.click();
});

function toggleInstructions() {
    const instructions = document.getElementById('instructions');
    instructions.classList.toggle('hidden');
}

document.getElementById('toggle-instructions').addEventListener('click', toggleInstructions);

function calculateTotalBudget() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const totalBudget = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    return totalBudget.toFixed(2);
}

document.getElementById('calculate-total-budget').addEventListener('click', function() {
    const totalBudget = calculateTotalBudget();
    alert(`Total Budget: $${totalBudget}`);
});

function filterExpensesByCategory(category) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const filteredExpenses = expenses.filter(expense => expense.category === category);
    return filteredExpenses;
}

document.getElementById('filter-by-category').addEventListener('change', function() {
    const selectedCategory = this.value;
    const filteredExpenses = filterExpensesByCategory(selectedCategory);

    const expenseList = document.getElementById('expense-items');
    expenseList.innerHTML = '';

    filteredExpenses.forEach(expense => {
        const listItem = document.createElement('li');
        listItem.textContent = `${expense.name} - $${expense.amount} (${expense.category})`;
        listItem.setAttribute('data-category', expense.category);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            expenseList.removeChild(listItem);
            updateTotalExpenses(-parseFloat(expense.amount));
            saveExpenses();
        });

        listItem.appendChild(deleteButton);
        expenseList.appendChild(listItem);

        updateTotalExpenses(parseFloat(expense.amount));
    });
});

document.getElementById('sort-by-amount').addEventListener('click', function() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.sort((a, b) => b.amount - a.amount);

    const expenseList = document.getElementById('expense-items');
    expenseList.innerHTML = '';

    expenses.forEach(expense => {
        const listItem = document.createElement('li');
        listItem.textContent = `${expense.name} - $${expense.amount} (${expense.category})`;
        listItem.setAttribute('data-category', expense.category);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            expenseList.removeChild(listItem);
            updateTotalExpenses(-parseFloat(expense.amount));
            saveExpenses();
        });

        listItem.appendChild(deleteButton);
        expenseList.appendChild(listItem);

        updateTotalExpenses(parseFloat(expense.amount));
    });
});

document.getElementById('calculate-average').addEventListener('click', function() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    if (expenses.length === 0) {
        alert('No expenses to calculate average.');
        return;
    }

    const totalAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const averageAmount = (totalAmount / expenses.length).toFixed(2);
    alert(`Average Expense Amount: $${averageAmount}`);
});
