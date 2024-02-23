// Sample sentences data
const sentences = [
    { text: "The quick brown fox jumps over the lazy dog.", source: "Unknown" },
    { text: "A journey of a thousand miles begins with a single step.", source: "Lao Tzu" },
    { text: "To be, or not to be, that is the question.", source: "William Shakespeare" },
    // Add more sentences as needed
];

let currentSentenceIndex = -1;
let startTime;

const sentenceElement = document.getElementById('sentence');
const userInput = document.getElementById('userInput');
const feedbackElement = document.getElementById('feedback');

function displayNextSentence() {
    currentSentenceIndex++;
    if (currentSentenceIndex >= sentences.length) {
        alert('You have completed all sentences!');
        return;
    }
    const sentence = sentences[currentSentenceIndex];
    sentenceElement.textContent = sentence.text;
    userInput.value = '';
    userInput.focus();
    startTime = new Date().getTime(); // Record start time
}

function calculateAccuracyAndSpeed() {
    const enteredText = userInput.value.trim();
    const sentence = sentences[currentSentenceIndex];
    const elapsedTimeInSeconds = (new Date().getTime() - startTime) / 1000;
    const wordsTyped = enteredText.split(/\s+/).length;
    const accuracy = calculateAccuracy(sentence.text, enteredText);
    const speed = wordsTyped / elapsedTimeInSeconds;
    return { accuracy, speed };
}

function calculateAccuracy(originalText, enteredText) {
    if (!originalText || !enteredText) return 0;
    const originalWords = originalText.split(/\s+/);
    const enteredWords = enteredText.split(/\s+/);
    let correctWords = 0;
    for (let i = 0; i < enteredWords.length; i++) {
        if (enteredWords[i] === originalWords[i]) {
            correctWords++;
        }
    }
    return (correctWords / originalWords.length) * 100;
}

userInput.addEventListener('input', function() {
    const { accuracy, speed } = calculateAccuracyAndSpeed();
    feedbackElement.textContent = `Accuracy: ${accuracy.toFixed(2)}%, Speed: ${speed.toFixed(2)} words/s`;
});

userInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        const { accuracy, speed } = calculateAccuracyAndSpeed();
        feedbackElement.textContent = `Accuracy: ${accuracy.toFixed(2)}%, Speed: ${speed.toFixed(2)} words/s`;
        displayNextSentence();
    }
});

// Display the first sentence
displayNextSentence();
