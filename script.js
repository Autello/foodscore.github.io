
}

// Function to calculate variables 1
function calculateScores(price, weight, totalServings, caloriesPerServing) {
  const cents = price * 100;
  const totalCalories = caloriesPerServing * totalServings;
  const caloriePrice = totalCalories / cents;
  const calorieDensity = totalCalories / weight;
  const weightScore = (calorieDensity / 240) * 50;
  const priceScore = (caloriePrice / 30) * 50;
  const totalScore = weightScore + priceScore;
  
  return {
    caloriePrice: `${caloriePrice.toFixed(2)} cal/¢`,
    calorieDensity: `${calorieDensity.toFixed(0)} cal/oz`,
    totalScore: totalScore.toFixed(0),
    totalCalories: totalCalories.toFixed(0)
  };
}

