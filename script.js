const timerElement = document.getElementById("timer");
const modeElement = document.getElementById("mode");
const sessionsElement = document.getElementById("sessions");
const workInput = document.getElementById("workInput");
const breakInput = document.getElementById("breakInput");

let workMinutes = Number(localStorage.getItem("workMinutes")) || 25;
let breakMinutes = Number(localStorage.getItem("breakMinutes")) || 5;
let completedSessions = Number(localStorage.getItem("completedSessions")) || 0;
let mode = "work";
let remainingSeconds = workMinutes * 60;
let intervalId = null;

workInput.value = workMinutes;
breakInput.value = breakMinutes;
sessionsElement.textContent = completedSessions;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function updateDisplay() {
  timerElement.textContent = formatTime(remainingSeconds);
  modeElement.textContent = mode === "work" ? "Work Session" : "Break Session";
}

function startTimer() {
  if (intervalId !== null) return;
  intervalId = setInterval(() => {
    remainingSeconds -= 1;
    if (remainingSeconds <= 0) {
      completeCurrentSession();
      return;
    }
    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

function resetTimer() {
  pauseTimer();
  mode = "work";
  remainingSeconds = workMinutes * 60;
  updateDisplay();
}

function completeCurrentSession() {
  pauseTimer();

  if (mode === "work") {
    completedSessions += 1;
    localStorage.setItem("completedSessions", completedSessions);
    sessionsElement.textContent = completedSessions;
    mode = "break";
    remainingSeconds = breakMinutes * 60;
  } else {
    mode = "work";
    remainingSeconds = workMinutes * 60;
  }

  updateDisplay();
  startTimer();
}

function saveSettings() {
  const newWork = Number(workInput.value);
  const newBreak = Number(breakInput.value);

  if (newWork < 1 || newWork > 120 || newBreak < 1 || newBreak > 60) {
    alert("Enter valid durations.");
    return;
  }

  workMinutes = newWork;
  breakMinutes = newBreak;
  localStorage.setItem("workMinutes", workMinutes);
  localStorage.setItem("breakMinutes", breakMinutes);
  resetTimer();
}

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("pauseBtn").addEventListener("click", pauseTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);
document.getElementById("saveBtn").addEventListener("click", saveSettings);

updateDisplay();
