let timer;
let isRunning = false;
let elapsedTime = 0;
let lapCounter = 1;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function updateDisplay(time) {
    const hours = String(Math.floor(time / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
    display.textContent = `${hours}:${minutes}:${seconds}`;
}

function startStopwatch() {
    const startTime = Date.now() - elapsedTime;
    timer = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay(elapsedTime);
    }, 1000);
    isRunning = true;
    startStopBtn.textContent = 'Pause';
}

function stopStopwatch() {
    clearInterval(timer);
    isRunning = false;
    startStopBtn.textContent = 'Start';
}

function resetStopwatch() {
    stopStopwatch();
    elapsedTime = 0;
    updateDisplay(elapsedTime);
    laps.innerHTML = '';
    lapCounter = 1;
}

function recordLap() {
    if (isRunning) {
        const lapTime = elapsedTime;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${display.textContent}`;
        laps.appendChild(lapItem);
        lapCounter++;
    }
}

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        stopStopwatch();
    } else {
        startStopwatch();
    }
});

resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
