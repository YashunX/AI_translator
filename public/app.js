let translationMode = 'en-to-ja';

const recognition = new webkitSpeechRecognition();
recognition.interimResults = false;

function startTranslation(mode) {
  translationMode = mode;
  recognition.lang = (mode === 'en-to-ja') ? 'en-US' : 'ja-JP';
  updateModeDisplay();
  recognition.start();
}

function updateModeDisplay() {
  const modeText = (translationMode === 'en-to-ja') ? "英語 → 日本語" : "日本語 → 英語";
  document.getElementById('modeDisplay').innerText = "現在のモード：" + modeText;
}

recognition.onresult = async function(event) {
  const text = event.results[0][0].transcript;
  document.getElementById('originalText').innerText = "認識結果: " + text;

  const translated = await translateText(text);
  document.getElementById('translatedText').innerText = "翻訳結果: " + translated;
  speakText(translated);
};

async function translateText(text) {
  const response = await fetch('/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, mode: translationMode })
  });

  const data = await response.json();
  return data.translated;
}

function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = (translationMode === 'en-to-ja') ? 'ja-JP' : 'en-US';
  speechSynthesis.speak(utterance);
}

