// Helper function to save to localStorage
function saveToLocalStorage(results) {
  localStorage.setItem('calorieResults', JSON.stringify(results));
}

// Helper function to load from localStorage
function loadFromLocalStorage() {
  const savedResults = localStorage.getItem('calorieResults');
  return savedResults ? JSON.parse(savedResults) : [];
}

// Function to calculate the scores
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

// Function to generate a new row in the table
function addRowToTable(product) {
  const table = document.querySelector('#results-table tbody');
  const row = document.createElement('tr');
  
  row.innerHTML = `
    <td><button class="export-btn">Export</button></td>
    <td>${product.totalScore}</td>
    <td>${product.name}</td>
    <td>${product.caloriePrice}</td>
    <td>${product.calorieDensity}</td>
    <td><button class="clear-btn">Clear</button></td>
  `;
  
  table.appendChild(row);
  
  // Add event listeners for export and clear buttons
  row.querySelector('.export-btn').addEventListener('click', () => exportRow(product));
  row.querySelector('.clear-btn').addEventListener('click', () => clearRow(row, product));
}

// Function to export the row to clipboard
function exportRow(product) {
  const text = `${product.totalScore}/100 - ${product.name} - ${product.calorieDensity} - ${product.caloriePrice} - ${product.totalCalories} cal`;
  navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard!'));
}

// Function to clear individual row
function clearRow(row, product) {
  row.remove();
  const results = loadFromLocalStorage();
  const index = results.findIndex(result => result.name === product.name);
  if (index > -1) {
    results.splice(index, 1);
    saveToLocalStorage(results);
  }
}

// Function to clear all rows
function clearAllRows() {
  const table = document.querySelector('#results-table tbody');
  table.innerHTML = '';
  saveToLocalStorage([]);
}

// Function to filter table by search
function filterTable(searchValue) {
  const rows = document.querySelectorAll('#results-table tbody tr');
  rows.forEach(row => {
    const nameCell = row.cells[2].textContent.toLowerCase();
    if (nameCell.includes(searchValue.toLowerCase())) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

// Event listener for Add Product button
document.getElementById('add-row').addEventListener('click', () => {
  const productName = document.getElementById('product-name').value;
  const price = parseFloat(document.getElementById('price').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const totalServings = parseInt(document.getElementById('total-servings').value);
  const caloriesPerServing = parseInt(document.getElementById('calories-per-serving').value);
  
  if (productName && !isNaN(price) && !isNaN(weight) && !isNaN(totalServings) && !isNaN(caloriesPerServing)) {
    const scores = calculateScores(price, weight, totalServings, caloriesPerServing);
    const product = {
      name: productName,
      price,
      weight,
      totalServings,
      caloriesPerServing,
      caloriePrice: scores.caloriePrice,
      calorieDensity: scores.calorieDensity,
      totalScore: scores.totalScore,
      totalCalories: scores.totalCalories
    };
    
    // Save the new product to local storage
    const results = loadFromLocalStorage();
    results.push(product);
    saveToLocalStorage(results);
    
    // Add row to table
    addRowToTable(product);
    
    // Clear input fields
    document.getElementById('product-name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('total-servings').value = '';
    document.getElementById('calories-per-serving').value = '';
  }
});

// Event listener for Search
document.getElementById('search').addEventListener('input', (e) => {
  filterTable(e.target.value);
});

// Event listener for Clear All button
document.querySelector('#clear-all')?.addEventListener('click', clearAllRows);

// Load saved results from local storage
window.addEventListener('load', () => {
  const savedResults = loadFromLocalStorage();
  savedResults.forEach(addRowToTable);
});
