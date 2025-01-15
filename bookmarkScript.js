// Retrieve all the DOM elements
const inputField = document.getElementById('urlInput');
const addButton = document.getElementById('addBookmark');
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
 * Function addBookmarkFunct that adds a new bookmark list item
 */
function addBookmarkFunct() {
    // Trim the spaces from the url
    const url = inputField.value.trim();
    if (isValidURL(url)) {
        // Invoke the getDomainName to get the name from the current url
        const nameWeb = getDomainName(url);
        // Add a new list element and append a child
        const bookmarkItem = document.createElement("li");
        bookmarkItem.classList.add("bookmark-item");
        bookmarkItem.innerHTML = `<a href="${url}" target="_blank">${nameWeb}</a>`;
        bookmarkListField.appendChild(bookmarkItem); // Append to the list
        inputField.value = "";
    }
}

// add an event Listener to the addButton
addButton.addEventListener("click", addBookmarkFunct);
