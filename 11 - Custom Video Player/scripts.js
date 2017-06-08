// Get elements
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');

// Build functions
function togglePlay() {
  // video.paused returns a boolean checking for if video has been paused
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateToggle() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  // dataset attribute in skip buttons for easy access to numbers
  video.currentTime += parseInt(this.dataset.skip);
}

function handleRangeUpdate() {
  // video.volume controls the volume from 0 - 1
  // video.playbackRate controls the playback speed with 1.0 being normal speed
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  console.log('firing scrub')
  // e.offsetX gets the width in pixels, and progress.offsetWidth gets the progress total width
  // returns a percentage. Multiply by video duration for actual time based on said percentage.
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Hook up event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateToggle);
video.addEventListener('pause', updateToggle);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => {
  button.addEventListener('click', skip);
})
ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate);
  range.addEventListener('mousemove', handleRangeUpdate);
})

let onScrub = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => onScrub && scrub(e));
progress.addEventListener('mousedown', () => onScrub = true);
progress.addEventListener('mouseup', () => onScrub = false);
