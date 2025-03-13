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
        <td><button class="copy-btn" onclick="copyRow(this)">Copy</button></td>
        <td>${productName}</td>
        <td>${totalScore.toFixed(0)}/100</td>
        <td>${caloriesPerOunce.toFixed(1)} cal/oz</td>
        <td>${caloriesPerCent.toFixed(1)} cal/¢</td>
        <td>${totalCalories.toLocaleString()} cal</td>
        <td><button class="clear-btn" onclick="clearEntry(this)">Clear</button></td>
    `;

    saveResults();
}

function saveResults() {
    var results = [];
    var rows = document.getElementById("resultsTable").getElementsByTagName('tbody')[0].rows;
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        results.push({
            productName: row.cells[1].innerText,
            totalScore: row.cells[2].innerText,
            calorieDensity: row.cells[3].innerText,
            caloriePrice: row.cells[4].innerText,
            totalCalories: row.cells[5].innerText
        });
    }
    localStorage.setItem("productResults", JSON.stringify(results));
}

function loadResults() {
    var savedResults = JSON.parse(localStorage.getItem("productResults"));
    if (savedResults) {
        var resultsTable = document.getElementById("resultsTable").getElementsByTagName('tbody')[0];
        savedResults.forEach(function(result) {
            var newRow = resultsTable.insertRow();
            newRow.innerHTML = `
                <td><button class="copy-btn" onclick="copyRow(this)">Copy</button></td>
                <td>${result.productName}</td>
                <td>${result.totalScore}</td>
                <td>${result.calorieDensity}</td>
                <td>${result.caloriePrice}</td>
                <td>${result.totalCalories}</td>
                <td><button class="clear-btn" onclick="clearEntry(this)">Clear</button></td>
            `;
        });
    }
}

function clearEntry(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    saveResults();
}

function clearAllResults() {
    var confirmClear = confirm("Are you sure you want to clear all entries? This action cannot be undone.");
    if (confirmClear) {
        var resultsTable = document.getElementById("resultsTable").getElementsByTagName('tbody')[0];
        resultsTable.innerHTML = ''; // Clear all rows
        localStorage.removeItem("productResults"); // Remove saved results from localStorage
    }
}

function copyRow(button) {
    var row = button.parentNode.parentNode;
    var resultText = `${row.cells[1].innerText} - ${row.cells[2].innerText} - ${row.cells[3].innerText} - ${row.cells[4].innerText} - ${row.cells[5].innerText}`;
    navigator.clipboard.writeText(resultText).then(function() {
        alert("Result copied to clipboard!");
    }, function(err) {
        alert("Error copying result: " + err);
    });
}

function copyResult() {
    var resultText = document.getElementById("result").innerText;
    navigator.clipboard.writeText(resultText).then(function() {
        alert("Result copied to clipboard!");
    }, function(err) {
        alert("Error copying result: " + err);
    });
}

// Load saved results on page load
window.onload = loadResults;
