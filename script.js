document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('user-input');
    const exampleSentence = document.getElementById('example-sentence');
    const source = document.getElementById('source');
    const typingSpeedDisplay = document.getElementById('typing-speed');
    const accuracyDisplay = document.getElementById('accuracy');
    let startTime;
    let wordCount = 0;
    let correctWordCount = 0;
    let exampleSentenceWords;

    // Function to calculate typing speed and accuracy
    function calculateMetrics() {
        if (!startTime) {
            startTime = new Date().getTime();
        }
        const userInputValue = userInput.value.trim();
        const exampleSentenceValue = exampleSentence.textContent.trim();
        const minLen = Math.min(userInputValue.length, exampleSentenceValue.length);
        let correctCharCount = 0;
        for (let i = 0; i < minLen; i++) {
            if (userInputValue[i] === exampleSentenceValue[i]) {
                correctCharCount++;
            }
        }
        const accuracy = Math.round((correctCharCount / exampleSentenceValue.length) * 100); // percentage
        accuracyDisplay.textContent = 'Accuracy: ' + accuracy + '%'; // Update accuracy display

        const currentTime = new Date().getTime();
        const totalTime = (currentTime - startTime) / 1000; // in seconds
        const typingSpeed = Math.round((userInputValue.length / totalTime) * 60); // characters per minute
        typingSpeedDisplay.textContent = 'Speed: ' + typingSpeed + ' CPM'; // Update typing speed display
    }

    // Event listener for user input
    userInput.addEventListener('input', calculateMetrics);

    // Event listener for Enter key press
    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            fetch('sentences.json')
                .then(response => response.json())
                .then(sentences => {
                    const randomIndex = Math.floor(Math.random() * sentences.length);
                    exampleSentence.textContent = sentences[randomIndex].sentence;
                    source.textContent = 'Source: ' + sentences[randomIndex].source;
                    exampleSentenceWords = sentences[randomIndex].sentence.split(/\s+/);
                    userInput.value = '';
                    startTime = null;
                    wordCount = 0;
                    correctWordCount = 0;
                    userInput.focus();
                })
                .catch(error => console.error('Error fetching sentences:', error));
        }
    });

    // Fetch initial sentence on page load
    userInput.dispatchEvent(new KeyboardEvent('keypress', {'key': 'Enter'}));
});
