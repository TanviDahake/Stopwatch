let startTime = 0;
let currentTime = 0;
let lapTimes = [];
let intervalId = null;

const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const milisecondsElement = document.getElementById('miliseconds');
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');
const lapButton = document.getElementById('lap-btn');
const stopButton = document.getElementById('stop-btn');
const lapList = document.getElementById('lap-list');

function startStopwatch() {
  startTime = Date.now();
  currentTime = 0;
  intervalId = setInterval(updateTime, 10);
  startButton.disabled = true;
  pauseButton.disabled = false;
  resetButton.disabled = false;
  lapButton.disabled = false;
  stopButton.disabled = false;
}

function pauseStopwatch() {
  clearInterval(intervalId);
  intervalId = null;
  pauseButton.disabled = true;
  startButton.disabled = false;
}

function resetStopwatch() {
  clearInterval(intervalId);
  intervalId = null;
  startTime = 0;
  currentTime = 0;
  lapTimes = [];
  hoursElement.textContent = '00';
  minutesElement.textContent = '00';
  secondsElement.textContent = '00';
  milisecondsElement.textContent = '00';
  lapList.innerHTML = '';
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
  lapButton.disabled = true;
  stopButton.disabled = true;
}

function stopStopwatch() {
  resetStopwatch();
}

function lapTime() {
  const lapTime = formatTime(currentTime);
  lapTimes.push(lapTime);
  const lapListItem = document.createElement('li');
  lapListItem.textContent = lapTime;
  lapList.appendChild(lapListItem);
}

function updateTime() {
  const elapsedTime = Date.now() - startTime;
  const hours = Math.floor(elapsedTime / 3600000);
  const minutes = Math.floor((elapsedTime % 3600000) / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const miliseconds = Math.floor((elapsedTime % 1000) / 10);
  hoursElement.textContent = padTime(hours);
  minutesElement.textContent = padTime(minutes);
  secondsElement.textContent = padTime(seconds);
  milisecondsElement.textContent = padTime(miliseconds);
  currentTime = elapsedTime;
}

function padTime(time) {
  return (time < 10 ? '0' : '') + time;
}

function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const miliseconds = Math.floor((time % 1000) / 10);
  return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}.${padTime(miliseconds)}`;
}