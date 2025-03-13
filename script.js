function calculateScore() {
    const price = parseFloat(document.getElementById('price').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const totalServings = parseInt(document.getElementById('totalServings').value);
    const caloriesPerServing = parseInt(document.getElementById('caloriesPerServing').value);

    if (isNaN(price) || isNaN(weight) || isNaN(totalServings) || isNaN(caloriesPerServing)) {
        alert("Please fill in all fields with valid data.");
        return;
    }

    // Calculations
    const cents = price * 100;
    const totalCalories = caloriesPerServing * totalServings;
    const caloriesPerCent = totalCalories / cents;
    const caloriesPerOunce = totalCalories / weight;

    // Scoring
    const weightScore = (caloriesPerOunce / 240) * 50;
    const priceScore = (caloriesPerCent / 30) * 50;
    const totalScore = Math.round(weightScore + priceScore);

    // Format Result
    const resultText = `${totalScore}/100 - ${caloriesPerOunce.toFixed(2)} cal/oz - ${caloriesPerCent.toFixed(2)} cal/¢ - ${totalCalories.toLocaleString()} cal`;

    // Show result
    document.getElementById('result').textContent = resultText;
    document.getElementById('copyBtn').style.display = "block";
}

function copyToClipboard() {
    const resultText = document.getElementById('result').textContent;
    navigator.clipboard.writeText(resultText).then(() => {
        alert('Result copied to clipboard!');
    }).catch(err => {
        alert('Failed to copy result: ' + err);
    });
}
