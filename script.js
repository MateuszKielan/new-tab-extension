
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container")

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        li.classList.add("task");

        // Add an event listener to toggle the "completed" class on click
        li.addEventListener("click", function() {
            li.classList.toggle("completed");
        });
        listContainer.appendChild(li);
    }
    inputBox.value = "";
}

function crossOutTask(element) {
    element.classList.toggle("completed");
  }

