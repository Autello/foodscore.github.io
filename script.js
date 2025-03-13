function calculate() {
    // Get input values
    const productName = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('price').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const totalServings = parseFloat(document.getElementById('totalServings').value);
    const caloriesPerServing = parseFloat(document.getElementById('caloriesPerServing').value);

    // Perform calculations
    const cents = price * 100;
    const totalCalories = caloriesPerServing * totalServings;
    const caloriesPerCent = totalCalories / cents;
    const caloriesPerOunce = totalCalories / weight;
    
    // Scoring calculations
    const weightScore = (caloriesPerOunce / 240) * 50;
    const priceScore = (caloriesPerCent / 30) * 50;
    const totalScore = weightScore + priceScore;

    // Display result
    const resultText = `${totalScore.toFixed(0)}/100 - ${caloriesPerOunce.toFixed(2)} cal/oz - ${caloriesPerCent.toFixed(2)} cal/¢ - ${totalCalories.toFixed(0)} cal`;

    // Display result in the result div
    document.getElementById('result').textContent = resultText;

    // Add result to the table
    const resultsTable = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    const newRow = resultsTable.insertRow();

    newRow.innerHTML = `
        <td>${productName}</td>
        <td>${totalScore.toFixed(0)} / 100</td>
        <td>${caloriesPerOunce.toFixed(2)} cal/oz</td>
        <td>${caloriesPerCent.toFixed(2)} cal/¢</td>
        <td>${totalCalories.toFixed(0)} cal</td>
        <td>
            <button class="clear-btn" onclick="clearEntry(this)">Clear</button>
            <button class="copy-btn" onclick="copyEntry(this)">Copy</button>
        </td>
    `;
}

function clearEntry(button) {
    const row = button.closest('tr');
    row.remove();
}

function copyEntry(button) {
    const row = button.closest('tr');
    const resultText = Array.from(row.cells)
        .slice(0, 5) // Get the first 5 cells of the row (excluding the buttons)
        .map(cell => cell.textContent)
        .join(' - '); // Join the text with ' - '

    // Copy the result text to clipboard
    navigator.clipboard.writeText(resultText)
        .then(() => {
            alert('Result copied to clipboard!');
        })
        .catch(err => {
            console.error('Error copying to clipboard: ', err);
        });
}

function clearAllResults() {
    const resultsTable = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    if (confirm("Are you sure you want to clear all results?")) {
        resultsTable.innerHTML = ''; // Clear all rows
    }
}
