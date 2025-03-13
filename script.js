function calculate() {
    var productName = document.getElementById("productName").value;
    var price = parseFloat(document.getElementById("price").value);
    var weight = parseFloat(document.getElementById("weight").value);
    var totalServings = parseInt(document.getElementById("totalServings").value);
    var caloriesPerServing = parseInt(document.getElementById("caloriesPerServing").value);

    // Calculations
    var cents = price * 100;
    var totalCalories = caloriesPerServing * totalServings;
    var caloriesPerCent = totalCalories / cents;
    var caloriesPerOunce = totalCalories / weight;

    // Scoring
    var weightScore = (caloriesPerOunce / 240) * 50;
    var priceScore = (caloriesPerCent / 30) * 50;
    var totalScore = weightScore + priceScore;

    // Result
    var result = `${totalScore.toFixed(0)}/100 - ${caloriesPerOunce.toFixed(1)} cal/oz - ${caloriesPerCent.toFixed(1)} cal/¢ - ${totalCalories.toLocaleString()} cal`;

    // Display the result
    document.getElementById("result").innerText = result;

    // Save to localStorage
    var resultsTable = document.getElementById("resultsTable").getElementsByTagName('tbody')[0];
    var newRow = resultsTable.insertRow();

    newRow.innerHTML = `
        <td><button onclick="copyRow(this)">Copy</button></td>
        <td>${productName}</td>
        <td>${totalScore.toFixed(0)}/100</td>
        <td>${caloriesPerOunce.toFixed(1)} cal/oz</td>
        <td>${caloriesPerCent.toFixed(1)} cal/¢</td>
        <td>${totalCalories.toLocaleString()} cal</td>
        <td><button onclick="clearEntry(this)">Clear</button></td>
    `;

    saveResults();
}

function copyRow(button) {
    // Get the row of the button that was clicked
    var row = button.parentNode.parentNode;
    
    // Get the cells in the row and format the text to be copied
    var productName = row.cells[1].innerText;
    var totalScore = row.cells[2].innerText;
    var calorieDensity = row.cells[3].innerText;
    var caloriePrice = row.cells[4].innerText;
    var totalCalories = row.cells[5].innerText;
    
    var resultText = `${totalScore} - ${calorieDensity} - ${caloriePrice} - ${totalCalories}`;
    
    // Copy the result text to the clipboard
    navigator.clipboard.writeText(resultText).then(function() {
        alert("Result copied to clipboard!");
    }, function(err) {
        alert("Error copying result: " + err);
    });
}
