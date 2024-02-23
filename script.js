document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('user-input');
    const exampleSentence = document.getElementById('example-sentence');
    const typingSpeedDisplay = document.getElementById('typing-speed');
    const accuracyDisplay = document.getElementById('accuracy');
    let startTime;
    let charCount = 0;
    let correctCharCount = 0;
    let exampleSentenceWords;

    // Function to calculate typing speed and accuracy
    function calculateMetrics() {
        if (!startTime) {
            startTime = new Date().getTime();
        }
        const userInputValue = userInput.value.trim();
        const userInputWords = userInputValue.split(/\s+/);
        const exampleSentenceValue = exampleSentence.textContent.trim();
        const minLen = Math.min(userInputValue.length, exampleSentenceValue.length);
        correctCharCount = 0;
        charCount = 0;
        for (let i = 0; i < minLen; i++) {
            charCount ++;
            if (userInputValue[i] === exampleSentenceValue[i]) {
                correctCharCount++;
            }
        }
        const currentTime = new Date().getTime();
        const totalTime = (currentTime - startTime) / 1000; // in seconds
        const typingSpeed = Math.round((userInputValue.length * 2.2 / totalTime) * 60); // characters per minute
        typingSpeedDisplay.textContent = 'Speed: ' + typingSpeed + ' 타';
        const accuracy = Math.round((correctCharCount / charCount) * 100); // percentage
        accuracyDisplay.textContent = 'Accuracy: ' + accuracy + '%'; // Update accuracy display
    }

    // Event listener for user input
    userInput.addEventListener('input', calculateMetrics);

    // Function to fetch the next sentence from the JSON file and display it
    function showNextSentence() {
        fetch('sentences.json')
            .then(response => response.json())
            .then(sentences => {
                const randomIndex = Math.floor(Math.random() * sentences.length);
                exampleSentence.textContent = sentences[randomIndex];
                exampleSentenceWords = sentences[randomIndex].split(/\s+/);
                userInput.value = ''; // Clear user input
                startTime = null; // Reset start time for accuracy calculation
                wordCount = 0; // Reset word count for accuracy calculation
                correctWordCount = 0; // Reset correct word count for accuracy calculation
                typingSpeedDisplay.textContent = 'Speed: 0 CPM'; // Reset typing speed display
                accuracyDisplay.textContent = 'Accuracy: 0%'; // Reset accuracy display
            })
            .catch(error => console.error('Error fetching example sentences:', error));
    }

    // Event listener for Enter key press
    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            showNextSentence();
        }
    });

    // Fetch example sentences from JSON file
    fetch('sentences.json')
        .then(response => response.json())
        .then(sentences => {
            // Display initial example sentence
            const randomIndex = Math.floor(Math.random() * sentences.length);
            exampleSentence.textContent = sentences[randomIndex];
        })
        .catch(error => console.error('Error fetching example sentences:', error));
});
