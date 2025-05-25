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
  
  // Add drag-and-drop functionality to the new ingredient
  addDragAndDrop(newIngredients);
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

// Add drag-and-drop functionality
function addDragAndDrop(ingredientDiv) {
  ingredientDiv.setAttribute('draggable', true);

  ingredientDiv.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', null); // For Firefox compatibility
    setTimeout(() => {
      ingredientDiv.classList.add('dragging');
    }, 0);
  });

  ingredientDiv.addEventListener('dragend', () => {
    ingredientDiv.classList.remove('dragging');
  });

  ingredientDiv.addEventListener('dragover', (e) => {
    e.preventDefault();
    const draggingElement = document.querySelector('.dragging');
    const afterElement = getDragAfterElement(ingredientList, e.clientY);
    if (afterElement == null) {
      ingredientList.appendChild(draggingElement);
    } else {
      ingredientList.insertBefore(draggingElement, afterElement);
    }
  });
}

// Function to get the element after which the dragged element should be placed
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.ingredientDiv:not(.dragging)')];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Initialize drag-and-drop for existing ingredients
document.querySelectorAll('.ingredientDiv').forEach(addDragAndDrop);
