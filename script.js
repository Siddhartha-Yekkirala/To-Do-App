let tasks = [];

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const task = { id: Date.now(), text, completed: false };
  tasks.push(task);
  taskInput.value = "";
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function editTask(id) {
  const newText = prompt("Edit task:");
  if (newText) {
    tasks = tasks.map(task => task.id === id ? { ...task, text: newText } : task);
    renderTasks();
  }
}

function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;

  document.querySelector(".progress-text").innerText = `${completed} / ${total}`;
  const progressBar = document.querySelector(".progress-bar");
  progressBar.style.width = total > 0 ? `${(completed / total) * 100}%` : "0%";

  if (total > 0 && completed === total) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <div class="task-left" onclick="toggleTask(${task.id})">
        <div class="circle">${task.completed ? "✔" : ""}</div>
        <span>${task.text}</span>
      </div>
      <div class="task-buttons">
        <button onclick="editTask(${task.id})"><i class="fas fa-pen"></i></button>
        <button onclick="deleteTask(${task.id})"><i class="fas fa-trash"></i></button>
      </div>
    `;

    taskList.appendChild(li);
  });
  updateProgress();
}