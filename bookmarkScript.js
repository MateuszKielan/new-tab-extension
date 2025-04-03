// Retrieve all the DOM elements
const bookmarkListField = document.getElementById('bookmarkList');
const modal = document.getElementById('modal');
const overlay = document.querySelector('.overlay');
const bookmarkPanelOpen = document.getElementById('bookmarkPanelOpen');

function showModal() {
    modal.classList.add('active');
    overlay.classList.add('active');
  }
  
  // Function to hide the modal
  function hideModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
  }
  
  // Event listeners
  bookmarkPanelOpen.addEventListener('click', showModal);
  overlay.addEventListener('click', hideModal);



/**
 * Function isValidURL that checks wheter the provided link is valid
 * @param {*} url 
 * @returns 
 */
function isValidURL(url) {
    const pattern = new RegExp(
        "^([a-zA-Z]+:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$", // fragment locator
        "i"
      );

    return pattern.test(url);
}

/**
 * Function getDomainName that get the domain name from the given url
 * @param {*} url 
 * @returns 
 */
function getDomainName(url) {
    // Initialize new object
    const urlObject = new URL(url);
    // Return host name
    return urlObject.hostname;
}

/**
 * Funtion getFavIcon that gets the url of a link and returns the icon of the website
 * @param {*} url 
 * @returns 
 */
function getFavIcon(url) {
    const hostName = new URL(url).hostname
    return `https://icons.duckduckgo.com/ip3/${hostName}.ico`;

}

/**
 * Function saveItem that saves the bookmark as an array with a bookmark prefix
 * @param {*} name 
 * @param {*} url 
 * @param {*} icon 
 */
function saveItem(name, url, icon) {
  const flexArr = [name,url,icon]
  const bookmarkName = `bookmark:${name}`
  localStorage.setItem(bookmarkName, JSON.stringify(flexArr));
}

/**
 * Function renderBookmark that takes 3 parameters and creates a bookmark item
 * @param {*} name 
 * @param {*} url 
 * @param {*} icon 
 */
function renderBookmark(name, url, icon) {
  const bookmarkListField = document.getElementById("bookmarkList");
  const li = document.createElement("li");
  li.classList.add("bookmark-item");

  li.innerHTML = `
    <a href="${url}" target="_blank">
      <img src="${icon}" alt="favicon" class="favicon-icon">
      ${name}
    </a>
  `;

  bookmarkListField.appendChild(li);
}

/**
 * Function addBookmarkFunct that adds a new bookmark list item
 */
function addBookmarkFunct() {
    // Retrieve the elements
    const inputField = document.getElementById('urlInput');
    const bookmarkNameField = document.getElementById('bookmarkNameInputField').value;
    const url = inputField.value.trim();
    const favIcon = getFavIcon(url)


    if (isValidURL(url)) {
        //  Save and render the bookmark from the local storage 
        saveItem(bookmarkNameField,url,favIcon)
        renderBookmark(bookmarkNameField, url, favIcon);

        // Clear the input fields
        inputField.value = "";
        bookmarkNameField.value = "";
    }


}

// Add an event Listener that loads all the bookmarks from the dataset
window.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('bookmark:')) {
      try {
        const bookmarkData = JSON.parse(localStorage.getItem(key));
        renderBookmark(bookmarkData[0], bookmarkData[1], bookmarkData[2]);
      } catch (e) {
        // Skip if it's not valid bookmark data
        console.warn(`Skipping corrupted bookmark: ${key}`);
      }
    }
  }
});

// add an event Listener to the addButton
addButton.addEventListener("click", addBookmarkFunct);

