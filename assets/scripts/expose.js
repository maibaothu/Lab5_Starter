// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // document selectors
  const hornSelect = document.getElementById("horn-select");
  const image = document.querySelector('img[alt="No image selected"]');
  const audioDisplay = document.querySelector('audio[src=""]');
  const volumeChange = document.getElementById("volume");
  const volumeIcon = document.querySelector('img[alt="Volume level 2"]')
  const soundButton = document.querySelector("button");
  const jsConfetti = new JSConfetti();

  // after select a horn from drop down, display image and audio
  hornSelect.addEventListener("input", e => {
    if (e.target.value == "air-horn") {
      image.src = 'assets/images/air-horn.svg';
      audioDisplay.src = 'assets/audio/air-horn.mp3';
    }
    else if (e.target.value == "car-horn") {
      image.src = 'assets/images/car-horn.svg';
      audioDisplay.src = 'assets/audio/car-horn.mp3';
    }
    else if (e.target.value == "party-horn") {
      image.src = 'assets/images/party-horn.svg';
      audioDisplay.src = 'assets/audio/party-horn.mp3';
    }
  });
  // adjust the volume based on volume slider
  volumeChange.addEventListener("input", e => {
    if (e.target.value == 0) {
      volumeIcon.src = 'assets/icons/volume-level-0.svg';
    } else if (e.target.value < 33) {
      volumeIcon.src = 'assets/icons/volume-level-1.svg';
    } else if (e.target.value < 67) {
      volumeIcon.src = 'assets/icons/volume-level-2.svg';
    } else if (e.target.value >= 67) {
      volumeIcon.src = 'assets/icons/volume-level-3.svg'
    }
  });
  // display sound and confetti when clicking button
  soundButton.addEventListener("click", e => {
    audioDisplay.play();
    // maximum volume is 1.0
    audioDisplay.volume = volumeChange.value / 100;
    if (hornSelect.value == "party-horn") {
      jsConfetti.addConfetti();
    }
  });
}