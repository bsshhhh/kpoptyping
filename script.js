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
                '다시 만들어볼게 우리 이야기 끝나지 않게 아주 기나긴',
                '날 보며 웃을 때 마다 맘 속 깊은 곳에선 심각해지는 병이 있어요', 
                '제자리서 지켜 보는 것만이 상처 없이 너를 소유하는 방식', 
                '달콤히 찍어 문 빛의 퐁듀 보이기 시작한 음의 색도', 
                '꿈에 그려온 환상 속 그가 날 찾아와 또 말 없이 다가와 숨 멎는 미소만', 
                '미처 말하지 못했어 다만 너를 좋아했어 어린 날의 꿈처럼 마치 기적처럼', 
                '우리 엄만 매일 내게 말했어 언제나 남자 조심하라고', 
                '별 하나 있고 너 하나 있는 그 곳이 내 오랜 밤이었어', 
                '네 이름을 가만 불러보면 사랑한단 말 같아', 
                '오직 나에게만 펼쳐져 온통 너로 날 물들여', 
                '내 가장 아름다운 시절 그 이름은 너야 가장 찬란했던 계절 그 중심엔 너잖아', 
                '매일이, 매일이, 매일이 너로 젖는다 우산 없이 널 씻어내린다 시간이 흐르는 것처럼'
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

    // Display initial example sentence
    const exampleSentences = [
        '널 생각만 해도 난 강해져 울지 않게 나를 도와줘',
        '다시 만들어볼게 우리 이야기 끝나지 않게 아주 기나긴',
        '날 보며 웃을 때 마다 맘 속 깊은 곳에선 심각해지는 병이 있어요', 
        '제자리서 지켜 보는 것만이 상처 없이 너를 소유하는 방식', 
        '달콤히 찍어 문 빛의 퐁듀 보이기 시작한 음의 색도', 
        '꿈에 그려온 환상 속 그가 날 찾아와 또 말 없이 다가와 숨 멎는 미소만', 
        '미처 말하지 못했어 다만 너를 좋아했어 어린 날의 꿈처럼 마치 기적처럼', 
        '우리 엄만 매일 내게 말했어 언제나 남자 조심하라고', 
        '별 하나 있고 너 하나 있는 그 곳이 내 오랜 밤이었어', 
        '네 이름을 가만 불러보면 사랑한단 말 같아', 
        '오직 나에게만 펼쳐져 온통 너로 날 물들여', 
        '내 가장 아름다운 시절 그 이름은 너야 가장 찬란했던 계절 그 중심엔 너잖아', 
        '매일이, 매일이, 매일이 너로 젖는다 우산 없이 널 씻어내린다 시간이 흐르는 것처럼'
    ]; 
    randomIndex = Math.floor(Math.random() * exampleSentences.length);
    exampleSentence.textContent = exampleSentences[randomIndex];
    exampleSentenceWords = exampleSentences[randomIndex].split(/\s+/);
});
