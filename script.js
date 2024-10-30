// JavaScript to make the cards draggable
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd);
  });
  
  function dragStart(event) {
    event.target.classList.add('dragging');
    event.dataTransfer.setData('text/plain', event.target.id);
  }
  
  function dragEnd(event) {
    event.target.classList.remove('dragging');
  }
  
  // Add dragover event to the dashboard to allow dropping
  const dashboard = document.querySelector('.dashboard');
  dashboard.addEventListener('dragover', event => {
    event.preventDefault();
    const draggingCard = document.querySelector('.dragging');
    const afterElement = getDragAfterElement(dashboard, event.clientY);
    if (afterElement == null) {
      dashboard.appendChild(draggingCard);
    } else {
      dashboard.insertBefore(draggingCard, afterElement);
    }
  });
  
  // Function to get the element after which to insert the dragged card
  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];
  
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
  