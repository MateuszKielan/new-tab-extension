
/* To-Do Section for creating and deleting tasks */ 
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container")



/**
 * Function saveTask that saves the to-do item to local storage
 * @param {string} text 
 */
function saveTask(text) { 
    const taskName = `ToDo:${text}`;
    localStorage.setItem(taskName, JSON.stringify(text));
}



/**
 * Function deleteTask that deletes the task from localStorage
 * @param {string} text 
 */
function deleteTask(text) {
    localStorage.removeItem(`ToDo:${text}`)
}



/**
 * Function renderTask that renders the to-do task with the given text 
 * @param {string} text 
 */
function renderTask(text) {
    let li = document.createElement("li");
    li.innerHTML = `<p class="to-do-text"> ${text} </p>`;
    li.classList.add("task");
    li.addEventListener("click", function() {
        li.classList.toggle("completed");
    });
    // Create a delete button
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");

    // Add the delete icon as an <img> inside the button
    let deleteIcon = document.createElement("img");
    deleteIcon.src = "src/delete-sign.svg"; // Path to delete icon
    deleteIcon.alt = "Delete"; // Alternative text
    deleteIcon.classList.add("delete-icon");

    // Append the icon to the delete button
    deleteButton.appendChild(deleteIcon);

    // Add an event listener to delete the task when the button is clicked
    deleteButton.addEventListener("click", function(event) {
        event.stopPropagation(); // Prevents the click from toggling "completed" on the task
        deleteTask(text);
        li.remove();
    });

    // Append the delete button to the <li>
    li.appendChild(deleteButton);

    listContainer.appendChild(li);
}



/**
 * Function addTask that adds a to-do item
 */
function addTask() {
    const taskText = inputBox.value
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        // Save and Render task
        saveTask(taskText)
        renderTask(taskText)
    }
    inputBox.value = "";
}



/**
 * Function crossOutTask that toggles the completed class to cross out an element
 * 
 * @param {*} element - element li passed into the function
 */
function crossOutTask(element) {
    element.classList.toggle("completed");
  }



/**
 * Search engine code that takes care of two main functions:
 *  1. Switch the search engine
 *  2. Switch the placeholder name appropriately
 */
document.querySelectorAll(".engine-btn").forEach(button => {
    button.addEventListener('click', function () {
        const form = document.getElementById('search-form'); // Get the search form element
        const inputField = document.getElementById('google-search-input') // Get the placeholder element

        form.action = this.getAttribute('data-action');
        inputField.placeholder = `Search with ${this.textContent}`; // Change the placeholder content
    })
})

/**
 * Section dedicated to the digital clock
 */

// Setting the callout time to every second
setInterval(updateTime, 1000);



/**
 * Function updateTime that updates the current local time
 */
function updateTime() {
    // Get the hours, min,sec
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();

    // Get the appropriate fields from the html
    const hourField = document.getElementById('hrs');
    const minField = document.getElementById('min');
    const secField = document.getElementById('sec')

    // Update the fields with the current time
    // If the field is less then 10 add a zero to the front
    if (hour < 10) {
        hourField.innerHTML = "0" + hour;
    } else {
        hourField.innerHTML = hour;
    }

    if (min < 10) {
        minField.innerHTML = "0" + min;
    } else {
        minField.innerHTML = min;
    }

    if (sec < 10) {
        secField.innerHTML = "0" + sec;
    } else {
        secField.innerHTML = sec;
    }
}



// Add all the to-do tasks saved in the local storage on refresh
window.addEventListener("DOMContentLoaded", () => {
    for (let i= 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('ToDo:')) {
            try {
                const taskData = JSON.parse(localStorage.getItem(key));
                renderTask(taskData)
            } catch(e) {
                console.warn("Skipping corrupted tasks")
            }
        }
    }
})
// Call the function
updateTime()