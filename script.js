const phrases = [
  "The owl flies at midnight.",
  "The raven knows the secret.",
  "Silence hides the truth.",
  "The fox waits in the shadows.",
  "A whisper echoes in the dark."
];

let currentLevel = 0;
let attempts = 0;
const maxAttempts = 3;

const bgMusic = document.getElementById('bgMusic');
bgMusic.volume = 0.4;
bgMusic.play();

function startLevel() {
  attempts = 0;
  document.getElementById('secretPhrase').textContent = `"${phrases[currentLevel]}"`;
  document.getElementById('result').textContent = '';
  const userInput = document.getElementById('userInput');
  userInput.value = '';
  userInput.disabled = false;
  document.getElementById('gameStage').style.display = 'block';
  document.getElementById('recallStage').style.display = 'none';
}

function memorized() {
  document.getElementById('gameStage').style.display = 'none';
  document.getElementById('recallStage').style.display = 'block';
  document.getElementById('userInput').focus();
}

function checkAnswer() {
  const input = document.getElementById('userInput').value.trim();
  const result = document.getElementById('result');
  if (input === phrases[currentLevel]) {
    result.textContent = "✅ Correct! Moving to the next mystery...";
    result.style.color = '#0f0';
    setTimeout(() => {
      currentLevel++;
      if (currentLevel < phrases.length) {
        startLevel();
      } else {
        result.textContent = "🎉 You've solved all the mysteries, master detective!";
      }
    }, 1500);
  } else {
    attempts++;
    if (attempts >= maxAttempts) {
      result.textContent = "❌ Too many incorrect attempts! Game over.";
      result.style.color = '#f00';
      document.getElementById('userInput').disabled = true;
    } else {
      result.textContent = `❌ Incorrect! Attempts left: ${maxAttempts - attempts}`;
      result.style.color = '#f00';
    }
  }
}

document.getElementById('userInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    checkAnswer();
  }
});

window.onload = startLevel;
