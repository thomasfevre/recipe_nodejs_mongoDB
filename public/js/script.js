let addIngredientsBtn = document.getElementById('addIngredientsBtn');
let ingredientList = document.querySelector('.ingredientList');
let ingredientDiv = document.querySelectorAll('.ingredientDiv')[0];

addIngredientsBtn.addEventListener('click', function(){
  let newIngredients = ingredientDiv.cloneNode(true);
  let input = newIngredients.getElementsByTagName('input')[0];
  input.value = '';
  ingredientList.appendChild(newIngredients);
  
  // Add event listener to the new remove button
  newIngredients.querySelector('.remove-ingredient').addEventListener('click', removeIngredient);
});

// Function to remove ingredient
function removeIngredient(event) {
  let ingredientDiv = event.target.closest('.ingredientDiv');
  if (ingredientList.children.length > 1) {
    ingredientDiv.remove();
  } else {
    alert('You need at least one ingredient!');
  }
}

// Add event listeners to existing remove buttons
document.querySelectorAll('.remove-ingredient').forEach(button => {
  button.addEventListener('click', removeIngredient);
});
