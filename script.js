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

    // Display initial example sentence
    const exampleSentences = [
        'The quick brown fox jumps over the lazy dog.',
        'Sphinx of black quartz, judge my vow.',
        'Pack my box with five dozen liquor jugs.'
    ];
    const randomIndex = Math.floor(Math.random() * exampleSentences.length);
    exampleSentence.textContent = exampleSentences[randomIndex];
});