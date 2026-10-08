// Andmebaasi aadress
const DATABASE_URL = "tinkr.tech/sdb/tinkr.tech/sdb/my-eshop-name/products";

// Leiame HTML-ist tekstikasti
const todoInput = document.getElementById("todoInput");

// Leiame Lisa nupu
const addBtn = document.getElementById("addBtn");

// Leiame koha, kuhu ülesanded tulevad
const todoList = document.getElementById("todoList");


// Laeb ülesanded andmebaasist
async function loadTodos() {

  // Puhastab vana nimekirja
  todoList.innerHTML = "";

  try {

    // Võtab andmebaasist andmed
    const response = await fetch(DATABASE_URL);

    // Muudab andmed JavaScripti kujule
    const data = await response.json();

    // Kui andmeid pole, lõpetab
    if (!data) {
      return;
    }

    // Võtab kõik ülesanded
    const todos = Object.values(data);

    // Käib kõik ülesanded läbi
    todos.forEach(todo => {

      // Loob uue div-i
      const todoDiv = document.createElement("div");

      // Annab div-ile klassi
      todoDiv.className = "todo";

      // Paneb ülesande teksti div-i
      todoDiv.innerText = todo.text;

      // Lisab ülesande lehele
      todoList.appendChild(todoDiv);
    });

  } catch (error) {

    // Näitab vea konsoolis
    console.error("Error loading todos:", error);
  }
}


// Lisab uue ülesande
async function addTodo() {

  // Võtab tekstikastist kirjutatud teksti
  const newTodo = {
    text: todoInput.value,
  };

  try {

    // Saadab ülesande andmebaasi
    await fetch(DATABASE_URL, {

      // Kasutab POST-i ehk lisab uue andme
      method: "POST",

      // Ütleme, et saadame JSON-i
      headers: {
        "Content-Type": "application/json",
      },

      // Muudab ülesande JSON-iks
      body: JSON.stringify(newTodo),
    });

    // Tühjendab tekstikasti
    todoInput.value = "";

    // Laeb nimekirja uuesti
    loadTodos();

  } catch (error) {

    // Näitab vea konsoolis
    console.error("Error adding todo:", error);
  }
}


// Kui vajutatakse Lisa nuppu, käivitatakse addTodo
addBtn.addEventListener("click", addTodo);


// Laeb ülesanded kohe lehe avamisel
loadTodos();const DATABASE_URL = "tinkr.tech/sdb/tinkr.tech/sdb/my-eshop-name/products";

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
