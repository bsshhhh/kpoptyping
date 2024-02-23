// script.js

document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('user-input');
    const exampleSentence = document.getElementById('example-sentence');
    const typingSpeedDisplay = document.getElementById('typing-speed');
    const accuracyDisplay = document.getElementById('accuracy'); // Reference accuracy display element
    let startTime;
    let wordCount = 0;
    let correctWordCount = 0;

    // Function to calculate typing speed and accuracy
    function calculateMetrics() {
        if (!startTime) {
            startTime = new Date().getTime();
        }
        const userInputValue = userInput.value.trim();
        const userInputWords = userInputValue.split(/\s+/);
        wordCount = userInputWords.length;
        correctWordCount = 0;
        for (let i = 0; i < Math.min(userInputWords.length, exampleSentenceWords.length); i++) {
            if (userInputWords[i] === exampleSentenceWords[i]) {
                correctWordCount++;
            }
        }
        const currentTime = new Date().getTime();
        const totalTime = (currentTime - startTime) / 1000; // in seconds
        const typingSpeed = Math.round(wordCount / totalTime * 60); // words per minute
        typingSpeedDisplay.textContent = 'Speed: ' + typingSpeed + ' WPM';
        const accuracy = Math.round((correctWordCount / wordCount) * 100); // percentage
        accuracyDisplay.textContent = 'Accuracy: ' + accuracy + '%'; // Update accuracy display
    }

    // Event listener for user input
    userInput.addEventListener('input', calculateMetrics);

    // Display initial example sentence
    const exampleSentenceText = 'The quick brown fox jumps over the lazy dog.';
    const exampleSentenceWords = exampleSentenceText.split(/\s+/);
    exampleSentence.textContent = exampleSentenceText;
});
