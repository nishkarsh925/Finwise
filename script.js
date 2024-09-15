// GaiaNet API Endpoint
const GAIA_API_URL = 'https://0xb2978ca7782e13a3b130f3230804a26c9d56d590.us.gaianet.network/v1/chat/completions'; // Replace with correct API endpoint
const MODEL_NAME = 'Personal-Financial-Advisor'; // Replace with your actual model


// Function to send user message to GaiaNet and receive the AI response
async function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    if (!userInput) return;

    // Display user message
    addMessage(userInput, 'user-message');

    // Construct the request payload
    const data = {
        model: MODEL_NAME,
        messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: userInput }
        ]
    };

    try {
        // Send POST request to GaiaNet API
        const response = await fetch(GAIA_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            // Handle HTTP errors (e.g., 400, 500)
            const errorMessage = `Error: ${response.status} ${response.statusText}`;
            addMessage(errorMessage, 'ai-message');
            console.error(errorMessage);
            return;
        }

        const result = await response.json();

        if (!result || !result.choices || result.choices.length === 0) {
            addMessage('No response from AI model.', 'ai-message');
            console.error('No response in API result:', result);
            return;
        }

        const aiResponse = result.choices[0].message.content;

        // Display AI response
        addMessage(aiResponse, 'ai-message');
    } catch (error) {
        // Log and display errors
        console.error('API request failed:', error);
        addMessage('Failed to fetch AI response. Check the console for more details.', 'ai-message');
    }

    // Clear the input field
    document.getElementById('userInput').value = '';
}

// Function to display messages in the chatbox
function addMessage(message, className) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the latest message
}
