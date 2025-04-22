document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        {
            question: "Which activities do you enjoy the most?",
            options: [
                "Solving complex problems and puzzles",
                "Creating art or designing things",
                "Helping and teaching others",
                "Working with numbers and analyzing data",
                "Building or fixing things with my hands"
            ]
        },
        {
            question: "Which school subjects do you find most interesting?",
            options: [
                "Math and science",
                "Art and literature",
                "Social studies and psychology",
                "Computer science and technology",
                "Shop class and hands-on activities"
            ]
        },
        {
            question: "What kind of work environment do you prefer?",
            options: [
                "Quiet office or lab",
                "Creative studio or flexible space",
                "Helping people directly",
                "Fast-paced and dynamic",
                "Outdoors or hands-on setting"
            ]
        },
        {
            question: "Which of these values is most important to you in a career?",
            options: [
                "Intellectual challenge",
                "Creative expression",
                "Helping others",
                "Financial success",
                "Practical results"
            ]
        },
        {
            question: "How do you prefer to learn new things?",
            options: [
                "Through research and reading",
                "Through creative projects",
                "Through discussion and collaboration",
                "Through hands-on experimentation",
                "By watching demonstrations"
            ]
        },
        {
            question: "Which of these describes your strengths?",
            options: [
                "Analytical thinking",
                "Creativity and imagination",
                "Communication skills",
                "Technical skills",
                "Manual dexterity"
            ]
        },
        {
            question: "What type of tasks do you find most rewarding?",
            options: [
                "Solving difficult problems",
                "Creating something new",
                "Helping someone succeed",
                "Completing complex projects",
                "Building or repairing things"
            ]
        },
        {
            question: "Where do you see yourself in 10 years?",
            options: [
                "In a leadership or expert role",
                "Working on creative projects",
                "Helping people directly",
                "Running my own business",
                "Working with my hands in a skilled trade"
            ]
        }
    ];
    
    // DOM Elements
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const progressPercent = document.getElementById('progressPercent');
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const nextButton = document.getElementById('nextButton');
    const prevButton = document.getElementById('prevButton');
    
    let currentQuestion = 0;
    let answers = Array(questions.length).fill(null);
    
    // Load question
    function loadQuestion(index) {
        // Update progress
        const progress = ((index + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `Question ${index + 1} of ${questions.length}`;
        progressPercent.textContent = `${Math.round(progress)}%`;
        
        // Load question text
        questionText.textContent = questions[index].question;
        
        // Clear previous options
        optionsContainer.innerHTML = '';
        
        // Add new options
        questions[index].options.forEach((option, i) => {
            const optionElement = document.createElement('label');
            optionElement.className = 'option';
            
            // Check if this option was previously selected
            const isChecked = answers[index] === i;
            
            optionElement.innerHTML = `
                <input type="radio" name="answer" value="${i}" ${isChecked ? 'checked' : ''}>
                <span>${option}</span>
            `;
            optionsContainer.appendChild(optionElement);
        });
        
        // Update navigation buttons
        prevButton.disabled = index === 0;
        nextButton.textContent = index === questions.length - 1 ? 'Submit' : 'Next';
    }
    
    // Save answer and move to next question
    nextButton.addEventListener('click', function() {
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        
        // Validate selection except when submitting
        if (!selectedOption && currentQuestion < questions.length - 1) {
            alert('Please select an option before continuing.');
            return;
        }
        
        // Save answer
        if (selectedOption) {
            answers[currentQuestion] = parseInt(selectedOption.value);
        }
        
        // Move to next question or submit
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            loadQuestion(currentQuestion);
        } else {
            submitAssessment();
        }
    });
    
    // Move to previous question
    prevButton.addEventListener('click', function() {
        if (currentQuestion > 0) {
            currentQuestion--;
            loadQuestion(currentQuestion);
        }
    });
    
    // Handle assessment submission
    function submitAssessment() {
        console.log('Assessment submitted with answers:', answers);
        alert('Thank you for completing the assessment! Your results are being calculated.');
        
        // In a real application, you would:
        // 1. Send answers to server for processing
        // 2. Redirect to results page
        // 3. Or show results directly
        
        // For demo purposes, we'll just show a message
        const resultDiv = document.createElement('div');
        resultDiv.className = 'assessment-result';
        resultDiv.innerHTML = `
            <h3>Your Assessment Results</h3>
            <p>Based on your answers, you might be interested in these career paths:</p>
            <ul>
                <li>Technology/Engineering</li>
                <li>Creative Arts</li>
                <li>Healthcare Services</li>
            </ul>
            <p>For more detailed recommendations, please chat with our AI Advisor.</p>
        `;
        
        const container = document.querySelector('.assessment-container .container');
        container.appendChild(resultDiv);
        
        // Hide the question and navigation
        document.querySelector('.assessment-question').style.display = 'none';
        document.querySelector('.assessment-navigation').style.display = 'none';
    }
    
    // Initialize the assessment
    loadQuestion(0);
});
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