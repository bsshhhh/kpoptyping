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
        const userInputValue = userInput.textContent.trim();
        const exampleSentenceValue = exampleSentence.textContent.trim();
        const minLen = Math.min(userInputValue.length, exampleSentenceValue.length);
        let charCount = 0;
        let correctCharCount = 0;
        for (let i = 0; i < minLen; i++) {
            charCount ++;
            if (userInputValue[i] === exampleSentenceValue[i]) {
                correctCharCount++;
            }
        }
        const accuracy = Math.round((correctCharCount / charCount) * 100); // percentage
        accuracyDisplay.textContent = '정확도: ' + accuracy + '%'; // Update accuracy display

        const currentTime = new Date().getTime();
        const totalTime = (currentTime - startTime) / 1000; // in seconds
        const typingSpeed = Math.round((userInputValue.length / totalTime) * 60 * 2.2); // characters per minute
        typingSpeedDisplay.textContent = '속도: ' + typingSpeed + ' 타'; // Update typing speed display
    }

    // Event listener for user input
    userInput.addEventListener('input', calculateMetrics);

    // Event listener for Enter key press
    userInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            fetch('sentences.json')
                .then(response => response.json())
                .then(sentences => {
                    const randomIndex = Math.floor(Math.random() * sentences.length);
                    exampleSentence.textContent = sentences[randomIndex].sentence;
                    source.textContent = sentences[randomIndex].title + ' (' + sentences[randomIndex].year + ')' + ', ' + sentences[randomIndex].artist;
                    writer.textContent = sentences[randomIndex].writer;
                    exampleSentenceWords = sentences[randomIndex].sentence.split(/\s+/);
                    userInput.textContent = '';
                    startTime = null;
                    wordCount = 0;
                    correctWordCount = 0;
                    userInput.focus();
                })
                .catch(error => console.error('Error fetching sentences:', error));
        }
    });

    // Fetch initial sentence on page load
    userInput.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
});