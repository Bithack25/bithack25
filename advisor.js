document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const suggestionButtons = document.querySelectorAll('.suggestion-btn');
    const currentTimeDisplay = document.getElementById('currentTime');

    // Function to update the time to always show 05:56 PM
    function updateTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const currentTimeString = `${hours}:${minutes} ${ampm}`;
        currentTimeDisplay.textContent = currentTimeString;
    }

    // Call updateTime initially to set the time when the page loads
    updateTime();

    // Update the time every second (1000 milliseconds)
    setInterval(updateTime, 1000);

    // Sample responses (can be extended and ideally fetched from an API)
    const sampleResponses = {
        "technology": "Careers in technology include software development, data science, cybersecurity, and IT support. Based on your interests, you might enjoy roles that involve problem-solving and innovation.",
        "healthcare": "Healthcare careers require skills like empathy, attention to detail, and scientific knowledge. Popular paths include nursing, medicine, physical therapy, and medical research.",
        "engineering": "Engineering typically requires a bachelor's degree in an engineering discipline. Specializations include mechanical, electrical, civil, and biomedical engineering.",
        "creative": "Creative fields include graphic design, writing, film production, and music. These careers value originality, artistic skills, and the ability to think outside the box.",
        "outlook": "Currently, careers in healthcare, technology, and renewable energy have excellent job outlooks. Data scientists, nurses, and solar panel installers are in high demand."
    };

    // Function to add a message to the chat interface
    function addMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
        messageDiv.innerHTML = `<strong>${sender === 'user' ? 'You' : 'AI Advisor'}:</strong> ${message}`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the latest message
    }

    // Function to handle sending a message
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        addMessage('user', message);
        userInput.value = '';

        // Simulate AI response with a slight delay
        setTimeout(() => {
            getAIResponse(message);
        }, 800); // Slightly faster response

    }

    // Function to generate AI response based on user input
    function getAIResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        let response = "I can help you explore career options. Tell me more about what you're interested in!";

        if (lowerMessage.includes('technology') || lowerMessage.includes('tech')) {
            response = sampleResponses.technology;
        } else if (lowerMessage.includes('healthcare') || lowerMessage.includes('medical')) {
            response = sampleResponses.healthcare;
        } else if (lowerMessage.includes('engineering')) {
            response = sampleResponses.engineering;
        } else if (lowerMessage.includes('creative') || lowerMessage.includes('art')) {
            response = sampleResponses.creative;
        } else if (lowerMessage.includes('outlook') || lowerMessage.includes('demand')) {
            response = sampleResponses.outlook;
        } else if (lowerMessage.includes('skills for technology')) {
            response = "Essential skills for technology careers often include programming, problem-solving, logical thinking, and continuous learning.";
        } else if (lowerMessage.includes('entry level healthcare')) {
            response = "Entry-level healthcare positions can include roles like medical assistant, nursing assistant, and home health aide. These often require specific certifications.";
        } else if (lowerMessage.includes('types of engineering')) {
            response = "There are many branches of engineering, such as mechanical, electrical, civil, chemical, and aerospace engineering, each focusing on different areas of design and problem-solving.";
        } else if (lowerMessage.includes('how to get into creative fields')) {
            response = "Building a portfolio, networking, and developing your unique artistic style are crucial for entering creative fields. Formal education can also be beneficial.";
        } else if (lowerMessage.includes('future job growth')) {
            response = "Fields like artificial intelligence, renewable energy, and biotechnology are expected to see significant job growth in the future.";
        } else if (lowerMessage.includes('tell me a joke')) {
            response = "Why don't scientists trust atoms? Because they make up everything!";
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            response = "Hello there! How can I help you with your career exploration today?";
        }

        addMessage('ai', response);
    }

    // Event listener for sending a message when the send button is clicked
    sendButton.addEventListener('click', sendMessage);

    // Event listener for sending a message when the Enter key is pressed in the input field
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Event listeners for suggestion buttons to populate the input field
    suggestionButtons.forEach(button => {
        button.addEventListener('click', function() {
            userInput.value = this.textContent;
        });
    });

    // Initial AI message when the page loads
    addMessage('ai', "Hello! I'm your AI Career Advisor. How can I assist you today?");
});

async function getAIResponse(userMessage) {
    addMessage('ai', "Thinking...");

    try {
        const response = await fetch('/api/chat', { // Call your backend endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Backend API Error:', errorData);
            addMessage('ai', "Sorry, there was an error getting a response.");
            return;
        }

        const data = await response.json();
        addMessage('ai', data.response); // Display the AI response from your backend

    } catch (error) {
        console.error('Error sending message to backend:', error);
        addMessage('ai', "Sorry, there was a network error.");
    }
}
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');

mobileNavToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
});