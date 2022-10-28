// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // document selectors
  const synth = window.speechSynthesis;
  const pressToTalk = document.querySelector("button");
  const textToSpeak = document.getElementById('text-to-speak');
  const voiceSelect = document.querySelector('select');
  const speakIcon = document.querySelector('img');
  let voices = [];
  // function to get voice
  function populateVoiceList() {
    voices = synth.getVoices();

    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement('option');
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
      option.setAttribute("data-name", voices[i].name);
      option.setAttribute("data-lang", voices[i].lang);
      voiceSelect.appendChild(option);
    }
  }

  populateVoiceList();

  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
  // function to speak out
  function speak() {
    const utterThis = new SpeechSynthesisUtterance(textToSpeak.value);
    const selectOption = voiceSelect.selectedOptions[0].getAttribute("data-name");

    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectOption) {
        utterThis.voice = voices[i];
        break;
      }
    }
    synth.speak(utterThis);
    // change icon
    utterThis.onstart = e => {
      speakIcon.src = 'assets/images/smiling-open.png';
    };
    utterThis.onend = e => {
      speakIcon.src = 'assets/images/smiling.png';
    };
  }
  // add event when clicking
  pressToTalk.addEventListener("click", e => {
    speak();
  });
}