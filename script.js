function createTodoItem(task, checked) { // เพิ่ม parameter ให้กับ function เพื่อรับค่า task และ checked
  const li = document.createElement("li"); // สร้าง list item ใหม่

  const checkbox = document.createElement("input"); // สร้าง checkbox ใหม่
  checkbox.type = "checkbox"; // กำหนด type ของ checkbox
  checkbox.checked = checked; // กำหนดค่า checked ของ checkbox
  checkbox.addEventListener("change", markTodoItemDone); // เพิ่ม event listener ให้กับ checkbox

  const label = document.createElement("label"); // สร้าง label ใหม่
  label.innerText = task; // กำหนดค่า text ของ label

  const editButton = document.createElement("button"); // สร้าง button ใหม่
  editButton.innerText = "Edit"; // กำหนดค่า text ของ button
  editButton.classList.add("edit-button"); // เพิ่ม class ให้กับ button
  editButton.addEventListener("click", editTodoItem); // เพิ่ม event listener ให้กับ button

  const removeButton = document.createElement("button"); // สร้าง button ใหม่
  removeButton.innerText = "Remove"; // กำหนดค่า text ของ button
  removeButton.classList.add("remove-button"); // เพิ่ม class ให้กับ button
  removeButton.addEventListener("click", removeTodoItem); // เพิ่ม event listener ให้กับ button

  li.classList.add("todo-item"); // เพิ่ม class ให้กับ list item
  li.appendChild(checkbox); // เพิ่ม checkbox ใน list item
  li.appendChild(label); // เพิ่ม label ใน list item
  li.appendChild(editButton); // เพิ่ม button ใน list item
  li.appendChild(removeButton); // เพิ่ม button ใน list item
  return li; // ส่งค่า list item กลับไป
}

function addTodoItem(event) { // เพิ่ม parameter ให้กับ function เพื่อรับค่า event
  event.preventDefault(); // ปิดการทำงานของ form submit เพื่อไม่ให้รีเฟรชหน้าเว็บ
  const input = document.getElementById("todo-input"); // ดึงค่า input จาก DOM 
  const task = input.value.trim(); // ดึงค่า task จาก input และตัดช่องว่างด้านหน้าและด้านหลังออก

  if (task !== "") { // ตรวจสอบว่า task ไม่ใช่ค่าว่าง
    const todoItem = createTodoItem(task, false); // สร้าง todo item ใหม่
    document.getElementById("todo-list").appendChild(todoItem); // เพิ่ม todo item ใน list
    input.value = ""; // ล้างค่า input
    saveTodoList(); // เรียกใช้ function saveTodoList เพื่อบันทึก todo list
  }
}

function removeTodoItem(event) { // เพิ่ม parameter ให้กับ function เพื่อรับค่า event
  const listItem = event.target.parentNode; // ดึงค่า parent node ของ button
  listItem.remove(); // ลบ list item ออกจาก DOM
  saveTodoList(); // เรียกใช้ function saveTodoList เพื่อบันทึก todo list
}

function editTodoItem(event) { // เพิ่ม parameter ให้กับ function เพื่อรับค่า event
  const listItem = event.target.parentNode; // ดึงค่า parent node ของ button
  const label = listItem.querySelector("label"); // ดึงค่า label ของ list item
  const newTask = prompt("Enter a new task", label.innerText); // แสดง prompt ขึ้นมาเพื่อรับค่า task ใหม่

  if (newTask !== null) { // ตรวจสอบว่าผู้ใช้กด cancel หรือไม่
    label.innerText = newTask.trim(); // กำหนดค่า text ของ label
    saveTodoList(); // เรียกใช้ function saveTodoList เพื่อบันทึก todo list
  }
}

function markTodoItemDone(event) { // เพิ่ม parameter ให้กับ function เพื่อรับค่า event
  const listItem = event.target.parentNode; // ดึงค่า parent node ของ checkbox
  listItem.classList.toggle("done"); // เพิ่มหรือลบ class ชื่อ done ของ list item
  saveTodoList(); // เรียกใช้ function saveTodoList เพื่อบันทึก todo list
}

function saveTodoList() { // เพิ่ม function saveTodoList เพื่อบันทึก todo list
  const todoList = document.getElementById("todo-list").innerHTML; // ดึงค่า HTML ของ todo list
  document.cookie = `todoList=${encodeURIComponent(todoList)}`; // บันทึก todo list ลงใน cookie
}

function loadTodoList() { // เพิ่ม function loadTodoList เพื่อโหลด todo list
  const cookies = document.cookie.split(";"); // แยก cookie ที่มีชื่อต่างๆออกจากกัน
  for (let cookie of cookies) { // Loop ผ่าน cookie ที่แยกออกมา
    const [name, value] = cookie.split("="); // แยกชื่อและค่าของ cookie ออกจากกัน
    if (name.trim() === "todoList") { // ตรวจสอบว่าชื่อของ cookie เป็น todoList หรือไม่
      const todoItems = document.createElement("div"); // สร้าง div สำหรับเก็บ todo items
      todoItems.innerHTML = decodeURIComponent(value.trim()); // กำหนดค่า HTML ให้กับ div ที่สร้างขึ้นมา

      const checkboxList = todoItems.querySelectorAll("input[type=checkbox]"); // ดึงค่า checkbox ทั้งหมด
      checkboxList.forEach((checkbox) => { // Loop ผ่าน checkbox ทั้งหมด
        checkbox.addEventListener("change", markTodoItemDone); // เพิ่ม event listener สำหรับ checkbox
      });

      const removeButtons = todoItems.querySelectorAll(".remove-button"); // ดึงค่า remove buttons ทั้งหมด
      removeButtons.forEach((button) => { // Loop ผ่าน remove buttons ทั้งหมด
        button.addEventListener("click", removeTodoItem); // เพิ่ม event listener สำหรับ remove button
      });

      const editButtons = todoItems.querySelectorAll(".edit-button"); // ดึงค่า edit buttons ทั้งหมด
      editButtons.forEach((button) => { // Loop ผ่าน edit buttons ทั้งหมด
        button.addEventListener("click", editTodoItem); // เพิ่ม event listener สำหรับ edit button
      });

      document.getElementById("todo-list").appendChild(todoItems); // เพิ่ม todo items ใน list
    }
  }
}

document.getElementById("todo-form").addEventListener("submit", addTodoItem); // เพิ่ม event listener สำหรับ form submit
loadTodoList(); // เรียกใช้ function loadTodoList เพื่อโหลด todo list