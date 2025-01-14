// Retrieve all the DOM elements
const inputField = document.getElementById('urlInput');
const addButton = document.getElementById('addBookmark');
const bookmarkListField = document.getElementById('bookmarkList');

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
function getDomainName(url) {
    const urlObject = new URL(url);
    return urlObject.hostname;
}

function addBookmarkFunct() {
    const url = inputField.value.trim();
    if (isValidURL(url)) {
        const nameWeb = getDomainName(url);
        const bookmarkItem = document.createElement("li");
        bookmarkItem.classList.add("bookmark-item");
        bookmarkItem.innerHTML = `<a href="${url}" target="_blank">${nameWeb}</a>`;
        bookmarkListField.appendChild(bookmarkItem); // Append to the list
        inputField.value = "";
    }
}

addButton.addEventListener("click", addBookmarkFunct);
