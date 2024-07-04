document.getElementById('add-expense').addEventListener('click', function() {
    const expenseName = document.getElementById('expense-name').value;
    const expenseAmount = document.getElementById('expense-amount').value;

    if (expenseName !== '' && expenseAmount !== '') {
        const expenseList = document.getElementById('expense-items');

        const listItem = document.createElement('li');
        listItem.textContent = `${expenseName} - $${expenseAmount}`;

        expenseList.appendChild(listItem);

        document.getElementById('expense-name').value = '';
        document.getElementById('expense-amount').value = '';
    } else {
        alert('Please enter both name and amount');
    }
});
