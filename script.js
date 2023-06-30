function createTodoItem(task, checked) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = checked; // Set the checkbox state
  checkbox.addEventListener("change", markTodoItemDone);

  const label = document.createElement("label");
  label.innerText = task;

  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.classList.add("edit-button");
  editButton.addEventListener("click", editTodoItem);

  const removeButton = document.createElement("button");
  removeButton.innerText = "Remove";
  removeButton.classList.add("remove-button");
  removeButton.addEventListener("click", removeTodoItem);

  li.classList.add("todo-item");
  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(editButton);
  li.appendChild(removeButton);
  return li;
}

function addTodoItem(event) {
  event.preventDefault();
  const input = document.getElementById("todo-input");
  const task = input.value.trim();

  if (task !== "") {
    const todoItem = createTodoItem(task, false); // Pass false as the initial state of the checkbox
    document.getElementById("todo-list").appendChild(todoItem);
    input.value = "";
    saveTodoList();
  }
}

function removeTodoItem(event) {
  const listItem = event.target.parentNode;
  listItem.remove();
  saveTodoList();
}

function editTodoItem(event) {
  const listItem = event.target.parentNode;
  const label = listItem.querySelector("label");
  const newTask = prompt("Enter a new task", label.innerText);

  if (newTask !== null) {
    label.innerText = newTask.trim();
    saveTodoList();
  }
}

function markTodoItemDone(event) {
  const listItem = event.target.parentNode;
  listItem.classList.toggle("done");
  saveTodoList();
}

function saveTodoList() {
  const todoList = document.getElementById("todo-list").innerHTML;
  document.cookie = `todoList=${encodeURIComponent(todoList)}`;
}

function loadTodoList() {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name.trim() === "todoList") {
      const todoItems = document.createElement("div");
      todoItems.innerHTML = decodeURIComponent(value.trim());

      const checkboxList = todoItems.querySelectorAll("input[type=checkbox]");
      checkboxList.forEach((checkbox) => {
        checkbox.addEventListener("change", markTodoItemDone);
      });

      const removeButtons = todoItems.querySelectorAll(".remove-button");
      removeButtons.forEach((button) => {
        button.addEventListener("click", removeTodoItem);
      });

      const editButtons = todoItems.querySelectorAll(".edit-button");
      editButtons.forEach((button) => {
        button.addEventListener("click", editTodoItem);
      });

      document.getElementById("todo-list").appendChild(todoItems);
    }
  }
}

document.getElementById("todo-form").addEventListener("submit", addTodoItem);
loadTodoList();