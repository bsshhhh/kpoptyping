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

    // Event listener for Enter key press
    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            // Fetch next sentence from JSON file
            fetch('sentences.json')
                .then(response => response.json())
                .then(sentences => {
                    // Select a random sentence from the fetched sentences
                    const randomIndex = Math.floor(Math.random() * sentences.length);
                    const nextSentence = sentences[randomIndex];

                    // Update displayed sentence
                    exampleSentence.textContent = nextSentence;

                    // Clear usesr input
                    userInput.value = '';

                    // Reset variables used for calculating typing speed and accuracy
                    startTime = null; // Reset start time for accuracy calculation
                    wordCount = 0; // Reset word count for accuracy calculation
                    correctWordCount = 0; // Reset correct word count for accuracy calculation
                    // typingSpeedDisplay.textContent = 'Speed: 0 타'; // Reset typing speed display
                    // accuracyDisplay.textContent = 'Accuracy: 0%'; // Reset accuracy display
                })
                .catch(error => console.error('Error fetching next sentence:', error));
        }
    });

    // Display initial example sentence
    const exampleSentences = [
        '엔터 눌러서 시작하기'
    ]; 
    randomIndex = Math.floor(Math.random() * exampleSentences.length);
    exampleSentence.textContent = exampleSentences[randomIndex];
    exampleSentenceWords = exampleSentences[randomIndex].split(/\s+/);
});
