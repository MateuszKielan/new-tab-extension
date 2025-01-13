
/* To-Do Section for creating and deleting tasks */ 
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container")

/**
 * Function addTask that adds a to-do item
 */
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
        // Create a delete button
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");

        // Add the delete icon as an <img> inside the button
        let deleteIcon = document.createElement("img");
        deleteIcon.src = "src/delete-sign.svg"; // Path to your delete icon
        deleteIcon.alt = "Delete"; // Alternative text for accessibility
        deleteIcon.classList.add("delete-icon"); // Add a class for styling

        // Append the icon to the delete button
        deleteButton.appendChild(deleteIcon);

        // Add an event listener to delete the task when the button is clicked
        deleteButton.addEventListener("click", function(event) {
            event.stopPropagation(); // Prevents the click from toggling "completed" on the task
            li.remove();
        });

        // Append the delete button to the <li>
        li.appendChild(deleteButton);

        listContainer.appendChild(li);
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

// Call the function
updateTime()