document.addEventListener('DOMContentLoaded', function() {
    loadExpenses();
    updateTotalExpenses(0); // init ttl expenses
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
    { name: 'Uber', amount: 25.00, category: 'Transport' }
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
