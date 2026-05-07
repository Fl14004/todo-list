const databaseUrl = "tinkr.tech/sdb/tinkr.tech/sdb/my-eshop-name/products";

const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");


async function loadTodos() {

  todoList.innerHTML = "";

  const response = await fetch(databaseUrl);
  const data = await response.json();


  if (data === null) {
    return;
  }


  const todosArray = Object.values(data);


  todosArray.forEach(function(todo) {

    const div = document.createElement("div");
    div.className = "todo";

    div.innerText = todo.text;

    todoList.appendChild(div);
  });
}


async function addTodo() {

  const newTodo = {
    text: todoInput.value
  };


  await fetch(databaseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newTodo)
  });


  todoInput.value = "";

  loadTodos();
}


addBtn.addEventListener("click", addTodo);


loadTodos();