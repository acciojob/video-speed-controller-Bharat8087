const video = document.querySelector('.viewer');
const toggleButton = document.querySelector('.toggle');
const volumeSlider = document.querySelector('input[name="volume"]');
const playbackRateSlider = document.querySelector('input[name="playbackRate"]');
const skipButtons = document.querySelectorAll('[data-skip]');
const progressFilled = document.querySelector('.progress__filled');
const progress = document.querySelector('.progress');
const rewindButton = document.querySelector('.rewind');

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  toggleButton.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function rewind() {
  video.currentTime -= 10;
}

video.addEventListener('click', togglePlay);
toggleButton.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
volumeSlider.addEventListener('input', handleRangeUpdate);
playbackRateSlider.addEventListener('input', handleRangeUpdate);
skipButtons.forEach(button => button.addEventListener('click', skip));
rewindButton.addEventListener('click', rewind);
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
