let sentencesData;
let currentSentenceIndex = 0;
let startTime;

const sentenceElement = document.getElementById('sentence');
const sourceElement = document.getElementById('source');
const inputElement = document.getElementById('input');

// Function to fetch sentences data from JSON file
async function fetchSentences() {
    try {
        const response = await fetch('sentences.json');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        sentencesData = await response.json();
        displayNextSentence();
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

// Function to display the next sentence
function displayNextSentence() {
    if (currentSentenceIndex < sentencesData.length) {
        const { sentence, source } = sentencesData[currentSentenceIndex];
        sentenceElement.textContent = sentence;
        sourceElement.textContent = `- ${source}`;
        currentSentenceIndex++;
    } else {
        sentenceElement.textContent = "No more sentences.";
        sourceElement.textContent = "";
        inputElement.disabled = true;
    }
}

// Event listener for input
inputElement.addEventListener('input', () => {
    if (!startTime) {
        startTime = new Date();
    }
    
    const typedText = inputElement.value.trim();
    const currentSentence = sentencesData[currentSentenceIndex - 1].sentence;
    
    if (typedText === currentSentence) {
        const endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000; // in seconds
        const accuracy = (currentSentence.length / typedText.length) * 100;
        
        alert(`You typed the sentence correctly in ${timeTaken} seconds with ${accuracy.toFixed(2)}% accuracy.`);
        
        inputElement.value = '';
        startTime = null;
        displayNextSentence();
    }
});

// Fetch sentences data when the page loads
fetchSentences();
