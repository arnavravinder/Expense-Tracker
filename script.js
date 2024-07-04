document.getElementById('add-expense').addEventListener('click', function() {
    const expenseName = document.getElementById('expense-name').value;
    const expenseAmount = document.getElementById('expense-amount').value;

    if (expenseName !== '' && expenseAmount !== '') {
        const expenseList = document.getElementById('expense-items');

        const listItem = document.createElement('li');
        listItem.textContent = `${expenseName} - $${expenseAmount}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            expenseList.removeChild(listItem);
            updateTotalExpenses(-parseFloat(expenseAmount));
        });

        listItem.appendChild(deleteButton);
        expenseList.appendChild(listItem);

        updateTotalExpenses(parseFloat(expenseAmount));

        document.getElementById('expense-name').value = '';
        document.getElementById('expense-amount').value = '';
    } else {
        alert('Please enter both name and amount');
    }
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
