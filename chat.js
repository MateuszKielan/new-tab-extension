// Insert your API
//const api = ''
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatDisplay = document.getElementById('chatDisplay');

// Submit Form
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Process the user input
    const input = chatInput.value.trim();
    if (!input) return;

    // Display user message
    chatDisplay.innerHTML += `<div><strong>You:</strong> ${input}</div>`;
    chatInput.value = '';
    chatDisplay.innerHTML += `<div><em>ChatGPT is thinking...</em></div>`;

    // Request
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${api}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [{ role: "user", content: input }]
        })
      });

        const data = await response.json();
        console.log("Full response from OpenAI:", data);
        // Process the chat-gpt response
        if (data.choices && data.choices.length > 0) {
            const botReply = data.choices[0].message.content;
            chatDisplay.innerHTML += `<div><strong>ChatGPT:</strong> ${botReply}</div>`;
        } else {
            chatDisplay.innerHTML += `<div><strong>ChatGPT:</strong> No response received.</div>`;
        }
     } catch (error) {
        console.error('Error:', error);
        chatDisplay.innerHTML += `<div><strong>Error:</strong> Something went wrong.</div>`;
    }

    // Scroll to bottom
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
});


// Track the double click and clear the display field
chatDisplay.addEventListener('dblclick', () => {
    chatDisplay.innerHTML = '';
});
