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
}

function copyResult() {
    var resultText = document.getElementById("result").innerText;
    navigator.clipboard.writeText(resultText).then(function() {
        alert("Result copied to clipboard!");
    }, function(err) {
        alert("Error copying result: " + err);
    });
}
