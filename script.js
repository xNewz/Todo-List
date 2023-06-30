function createTodoItem(task, checked) { // Add a second parameter to set the initial state of the checkbox
  const li = document.createElement("li"); // Create a new list item

  const checkbox = document.createElement("input"); // Create a new checkbox
  checkbox.type = "checkbox"; // Set the checkbox type
  checkbox.checked = checked; // Set the checkbox state
  checkbox.addEventListener("change", markTodoItemDone); // Add an event listener for the checkbox

  const label = document.createElement("label"); // Create a new label
  label.innerText = task; // Set the label text

  const editButton = document.createElement("button"); // Create a new button
  editButton.innerText = "Edit"; // Set the button text
  editButton.classList.add("edit-button"); // Add a class to the button
  editButton.addEventListener("click", editTodoItem); // Add an event listener for the button

  const removeButton = document.createElement("button"); // Create a new button
  removeButton.innerText = "Remove"; // Set the button text
  removeButton.classList.add("remove-button"); // Add a class to the button
  removeButton.addEventListener("click", removeTodoItem); // Add an event listener for the button

  li.classList.add("todo-item"); // Add a class to the list item
  li.appendChild(checkbox); // Add the checkbox to the list item
  li.appendChild(label); // Add the label to the list item
  li.appendChild(editButton); // Add the edit button to the list item
  li.appendChild(removeButton); // Add the remove button to the list item
  return li; // Return the list item
}

function addTodoItem(event) { // Add an event parameter to the function
  event.preventDefault(); // Prevent the default form submit behavior
  const input = document.getElementById("todo-input"); // Get the input element
  const task = input.value.trim(); // Get the trimmed value of the input

  if (task !== "") { // Check if the task is not an empty string
    const todoItem = createTodoItem(task, false); // Pass false as the initial state of the checkbox
    document.getElementById("todo-list").appendChild(todoItem); // Add the todo item to the list
    input.value = ""; // Reset the input
    saveTodoList(); // Save the todo list
  }
}

function removeTodoItem(event) { // Add an event parameter to the function
  const listItem = event.target.parentNode; // Get the parent list item of the button
  listItem.remove(); // Remove the list item
  saveTodoList(); // Save the todo list
}

function editTodoItem(event) { // Add an event parameter to the function
  const listItem = event.target.parentNode; // Get the parent list item of the button
  const label = listItem.querySelector("label"); // Get the label element
  const newTask = prompt("Enter a new task", label.innerText); // Prompt the user for a new task

  if (newTask !== null) { // Check if the user clicked the Cancel button
    label.innerText = newTask.trim(); // Set the label text
    saveTodoList(); // Save the todo list
  }
}

function markTodoItemDone(event) { // Add an event parameter to the function
  const listItem = event.target.parentNode; // Get the parent list item of the checkbox
  listItem.classList.toggle("done"); // Toggle the done class on the list item
  saveTodoList(); // Save the todo list
}

function saveTodoList() { // Add a function to save the todo list
  const todoList = document.getElementById("todo-list").innerHTML; // Get the todo list HTML
  document.cookie = `todoList=${encodeURIComponent(todoList)}`; // Set the todo list as a cookie
}

function loadTodoList() { // Add a function to load the todo list
  const cookies = document.cookie.split(";"); // Get all the cookies
  for (let cookie of cookies) { // Loop through the cookies
    const [name, value] = cookie.split("="); // Get the cookie name and value
    if (name.trim() === "todoList") { // Check if the cookie name is todoList
      const todoItems = document.createElement("div"); // Create a new div element
      todoItems.innerHTML = decodeURIComponent(value.trim()); // Set the div HTML

      const checkboxList = todoItems.querySelectorAll("input[type=checkbox]"); // Get all the checkboxes
      checkboxList.forEach((checkbox) => { // Loop through the checkboxes
        checkbox.addEventListener("change", markTodoItemDone); // Add an event listener for the checkbox
      });

      const removeButtons = todoItems.querySelectorAll(".remove-button"); // Get all the remove buttons
      removeButtons.forEach((button) => { // Loop through the remove buttons
        button.addEventListener("click", removeTodoItem); // Add an event listener for the button
      });

      const editButtons = todoItems.querySelectorAll(".edit-button"); // Get all the edit buttons
      editButtons.forEach((button) => { // Loop through the edit buttons
        button.addEventListener("click", editTodoItem); // Add an event listener for the button
      });

      document.getElementById("todo-list").appendChild(todoItems); // Add the todo items to the list
    }
  }
}

document.getElementById("todo-form").addEventListener("submit", addTodoItem); // Add an event listener for the form submit
loadTodoList(); // Load the todo list