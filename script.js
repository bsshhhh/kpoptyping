// Function to fetch data from JSON file
function fetchData() {
  return fetch('sentences.json')
    .then(response => response.json());
}

// Function to get a random sentence
function getRandomSentence(sentences) {
  // Generate a random index
  const randomIndex = Math.floor(Math.random() * sentences.length);

  // Get the random sentence
  const randomSentence = sentences[randomIndex];

  // Display the random sentence
  document.getElementById('sentence').textContent = randomSentence;
}

// Call fetchData() to fetch JSON data and display random sentence
fetchData()
  .then(data => {
    const sentences = data.sentences;
    getRandomSentence(sentences);
  })
  .catch(error => console.error('Error fetching data:', error));
