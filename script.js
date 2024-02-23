// script.js

document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('user-input');
    const exampleSentence = document.getElementById('example-sentence');
    const typingSpeedDisplay = document.getElementById('typing-speed');
    let startTime;
    let wordCount = 0;

    // Function to calculate typing speed
    function calculateSpeed() {
        if (!startTime) {
            startTime = new Date().getTime();
        }
        const userInputValue = userInput.value.trim();
        const userInputWordCount = userInputValue === '' ? 0 : userInputValue.split(/\s+/).length;
        wordCount = userInputWordCount;
        const currentTime = new Date().getTime();
        const totalTime = (currentTime - startTime) / 1000; // in seconds
        const typingSpeed = Math.round(wordCount / totalTime * 60); // words per minute
        typingSpeedDisplay.textContent = 'Speed: ' + typingSpeed + ' WPM';
    }

    // Event listener for user input
    userInput.addEventListener('input', calculateSpeed);

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