let totalCalories = 0;
let calorieChart; //stores chart.js instance

document.addEventListener('DOMContentLoaded', () => {
  const foodForm = document.getElementById('food-form');
//gets form element by ID
  const foodNameInput = document.getElementById('food-name');4
//gets food name input element
  const foodCaloriesInput = document.getElementById('food-calories');
//gets food calories input element
  const foodItemsList = document.getElementById('food-items');
//gets list element
  const totalCaloriesDisplay = document.getElementById('total-calories');
//gets total calories 

//DOM lets us access docs



  // Initialize Chart.js
  const ctx = document.getElementById('calorieChart').getContext('2d');
//gets 2D context of canvas element for Chart.js
  calorieChart = new Chart(ctx, { //initializes new chart.js instance
    type: 'bar', 
    data: {
      labels: [],
      datasets: [{
        label: 'Calories',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Load data from local storage
  const storedFoodItems = JSON.parse(localStorage.getItem('foodItems')) || [];
  //loads stored food items from local storage
  const storedTotalCalories = parseInt(localStorage.getItem('totalCalories')) || 0;
//loads total calorie as an int
  storedFoodItems.forEach(item => addFoodItem(item.name, item.calories));
//adds stored food items to list
  totalCalories = storedTotalCalories;
  totalCaloriesDisplay.textContent = totalCalories;
//updates total calories, displays total calories

  foodForm.addEventListener('submit', (event) => { //add event listener for form submission
    event.preventDefault(); //prevent default form submission behavior

    const foodName = foodNameInput.value;
    const foodCalories = parseInt(foodCaloriesInput.value);
//get food name & calories input value

    if (foodName && foodCalories) {
      addFoodItem(foodName, foodCalories);
      foodNameInput.value = '';
      foodCaloriesInput.value = '';
    }
  });
//checks validity of Foodname & foodcalories,
//adds the food item to list, clears food name and cal input

  function addFoodItem(name, calories) { //creates new list item element
    const listItem = document.createElement('li');
    const foodText = document.createElement('span');
    foodText.textContent = `${name} - ${calories} calories`;
    listItem.appendChild(foodText);
//make new list item element, span element for text, text content of span, appends
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editFoodItem(listItem, name, calories));
    listItem.appendChild(editButton);
//make new button element for editing, put "edit" on the button
//add event listener to edit button, append edit button to list item
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteFoodItem(listItem, calories));
    listItem.appendChild(deleteButton);
//new button for deleting, put "delete" on button, add event listener to delete button
//append delete button to list items
    foodItemsList.appendChild(listItem);
//append list item to list
    totalCalories += calories;
    totalCaloriesDisplay.textContent = totalCalories;
//update calories & displays it
    updateChart(name, calories);
    // Updates chart & Save to local storage
    saveToLocalStorage();
  }

  function editFoodItem(listItem, name, calories) {
    foodNameInput.value = name;
    foodCaloriesInput.value = calories;
    deleteFoodItem(listItem, calories);
  }
//set food name input val, set food calories, delete food item

  function deleteFoodItem(listItem, calories) {
    const name = listItem.querySelector('span').textContent.split(' - ')[0];
    foodItemsList.removeChild(listItem);

    totalCalories -= calories;
    totalCaloriesDisplay.textContent = totalCalories;

    updateChart(name, -calories);
    saveToLocalStorage();
  }
//get food name, remove it from list, update & display calories

  function updateChart(name, calories) {
    const index = calorieChart.data.labels.indexOf(name);
    if (index === -1) {
      calorieChart.data.labels.push(name);
      calorieChart.data.datasets[0].data.push(calories);
    } else {
      calorieChart.data.datasets[0].data[index] += calories;
      if (calorieChart.data.datasets[0].data[index] === 0) {
        calorieChart.data.labels.splice(index, 1);
        calorieChart.data.datasets[0].data.splice(index, 1);
      }
    }
    calorieChart.update();
  }
//find index of food name in chart labels, if food name not in chart labels:
//if: add food name to chart labels & add calories to chart data
//else: update calories, 
//if: if cals become 0, remove food name from chart labels, remove cal from chart data
  function saveToLocalStorage() {
    const foodItems = [];
    foodItemsList.querySelectorAll('li').forEach(listItem => {
      const [name, caloriesText] = listItem.querySelector('span').textContent.split(' - ');
      const calories = parseInt(caloriesText.replace(' calories', ''));
      foodItems.push({ name, calories });
    });

    localStorage.setItem('foodItems', JSON.stringify(foodItems));
    localStorage.setItem('totalCalories', totalCalories);
  //stores food items & calories in local
  }
});
//save data to local storage
//initialize array to store food items, iterates thru, then splits text to get name/cal
//parses cals then adds item to array