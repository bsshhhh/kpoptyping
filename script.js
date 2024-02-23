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
            // Show next sentence
            const exampleSentences = [
                '널 생각만 해도 난 강해져 울지 않게 나를 도와줘',
                '다시 만들어볼게 우리 이야기 끝나지 않게 아주 기나긴 살갗을 파고 스며드는 상실감은 잠시 묻어둘게',
                '날 보며 웃을 때 마다 맘 속 깊은 곳에선 심각해지는 병이 있어요', 
                '제자리서 지켜 보는 것만이 상처 없이 너를 소유하는 방식', 
                '달콤히 찍어 문 빛의 퐁듀 보이기 시작한 음의 색도'
            ];
            const randomIndex = Math.floor(Math.random() * exampleSentences.length);
            exampleSentence.textContent = exampleSentences[randomIndex];
            exampleSentenceWords = exampleSentences[randomIndex].split(/\s+/);
            userInput.value = ''; // Clear user input
            startTime = null; // Reset start time for accuracy calculation
            wordCount = 0; // Reset word count for accuracy calculation
            correctWordCount = 0; // Reset correct word count for accuracy calculation
            typingSpeedDisplay.textContent = 'Speed: 0 타'; // Reset typing speed display
            accuracyDisplay.textContent = 'Accuracy: 0%'; // Reset accuracy display
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
