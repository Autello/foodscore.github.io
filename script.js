function calculate() {
  // get input values
  const price = parseFloat(document.getElementById('price').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const total_servings = parseFloat(document.getElementById('total_servings').value);
  const calories_per_serving = parseFloat(document.getElementById('calories_per_serving').value);

  // calculate variables

  let cents = price * 100;
  let total_calories = calories_per_serving * total_servings;
  let calorie_price = total_calories / cents;
  let calorie_weight = total_calories / weight;

  //calculate scores

  let weight_score = (calorie_weight / 240) * 50;
  let price_score = (calorie_price / 30) * 50;
  let score = weight_score + price_score;
  let rounded_score = Math.floor(score * 10) / 10;

  //validate inputs

  if (isNaN(price) || isNaN(weight) || isNaN(total_servings) || isNaN(calories_per_serving)) {
    alert("some fields have been left blank.");
    return;
  }
  
 if (weight === 0 || price === 0) {
    alert("Price and weight must be greater than zero.");
    return;
  }

  //display results

  document.getElementById("result").textContent = string(rounded_score) + "/100";
}

  
