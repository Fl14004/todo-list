const DATABASE_URL = "tinkr.tech/sdb/tinkr.tech/sdb/my-eshop-name/products";

const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

async function loadTodos() {
  todoList.innerHTML = "";

  try {
    const response = await fetch(DATABASE_URL);
    const data = await response.json();

    if (!data) {
      return;
    }

    const todos = Object.values(data);

    todos.forEach(todo => {
      const todoDiv = document.createElement("div");
      todoDiv.className = "todo";
      todoDiv.innerText = todo.text;
      todoList.appendChild(todoDiv);
    });
  } catch (error) {
    console.error("Error loading todos:", error);
  }
}

async function addTodo() {
  const newTodo = {
    text: todoInput.value,
  };

  try {
    await fetch(DATABASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    todoInput.value = "";
    loadTodos();
  } catch (error) {
    console.error("Error adding todo:", error);
  }
}

addBtn.addEventListener("click", addTodo);

loadTodos();
