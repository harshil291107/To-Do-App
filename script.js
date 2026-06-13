let btn = document.querySelector("button");
let input = document.querySelector("input");
let list = document.querySelector("ul");
let counter = document.querySelector("#counter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounter() {
    let totalTasks = tasks.length;

    let completedTasks = tasks.filter(task => task.completed).length;

    counter.innerText = `${completedTasks} of ${totalTasks} tasks completed`;
}

function createTask(taskObj) {

    let newtask = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = taskObj.completed;

    let taskText = document.createElement("span");
    taskText.innerText = taskObj.text;

    if (taskObj.completed) {
        taskText.style.textDecoration = "line-through";
    }

    let delBtn = document.createElement("button");
    delBtn.innerHTML = "🗑️";

    checkbox.addEventListener("change", () => {

        taskObj.completed = checkbox.checked;

        if (checkbox.checked) {
            taskText.style.textDecoration = "line-through";
        } else {
            taskText.style.textDecoration = "none";
        }

        saveTasks();
        updateCounter();
    });

    delBtn.addEventListener("click", () => {

        tasks = tasks.filter(task => task !== taskObj);

        saveTasks();
        updateCounter();

        newtask.remove();
    });

    newtask.appendChild(checkbox);
    newtask.appendChild(taskText);
    newtask.appendChild(delBtn);

    list.appendChild(newtask);
}

tasks.forEach(task => {
    createTask(task);
});

updateCounter();

btn.addEventListener("click", () => {

    if (input.value.trim() === "") {
        return;
    }

    let taskObj = {
        text: input.value,
        completed: false
    };

    tasks.push(taskObj);

    saveTasks();

    createTask(taskObj);

    updateCounter();

    input.value = "";
});

input.addEventListener("keypress", (event) => {

    if (event.key === "Enter") {
        btn.click();
    }
});