document.getElementById('send-btn').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;

    if (userInput.trim() !== '') {
        addMessage(userInput, 'user-message');
        document.getElementById('user-input').value = ''; // Clear input field
        
        // Call your AI model's API here
        fetchYourAIResponse(userInput);
    }
});

document.getElementById('new-chat-btn').addEventListener('click', function() {
    document.getElementById('chat-box').innerHTML = ''; // Clear chat messages
});

function addMessage(text, className) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('chat-message', className);
    messageContainer.textContent = text;
    document.getElementById('chat-box').appendChild(messageContainer);

    // Scroll to the bottom after new message
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
}

function fetchYourAIResponse(userInput) {
    // Replace with your actual API call
    fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_API_KEY`
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        addMessage(data.reply, 'bot-message');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
