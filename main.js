let elapsed = parseInt(localStorage.getItem('studyTime')) || 0;
let timerInterval = null;
const monthlyGoal = 200 * 3600; // 200 hours in seconds

const milestones = [50, 100, 150, 200];
let milestonesHit = JSON.parse(localStorage.getItem('milestonesHit')) || [];

const quotes = [
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Don't watch the clock; do what it does. Keep going.",
  "Success doesn’t just find you. You have to go out and get it.",
  "The harder you work for something, the greater you’ll feel when you achieve it.",
  "Dream bigger. Do bigger.",
  "Don’t stop when you’re tired. Stop when you’re done."
];

function getTodayQuote() {
  const today = new Date();
  const dayIndex = today.getDate() % quotes.length;
  return quotes[dayIndex];
}

function showConfetti() {
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

function updateTimeDisplay() {
  const hours = Math.floor(elapsed / 3600);
  const minutes = Math.floor((elapsed % 3600) / 60);
  const seconds = elapsed % 60;
  document.getElementById('time').textContent = `${hours}h ${minutes}m ${seconds}s`;

  const remainingHours = Math.max(200 - hours, 0);
  document.getElementById('remaining').textContent = `Remaining: ${remainingHours} hours`;

  const progressPercent = Math.min((elapsed / monthlyGoal) * 100, 100);
  const progressBar = document.getElementById('progressBar');
  progressBar.style.width = `${progressPercent}%`;
  progressBar.textContent = `${hours}h`;

  // Check milestones
  milestones.forEach((milestone) => {
    if (hours >= milestone && !milestonesHit.includes(milestone)) {
      showConfetti();
      milestonesHit.push(milestone);
      localStorage.setItem('milestonesHit', JSON.stringify(milestonesHit));
    }
  });
}

document.getElementById('startBtn').addEventListener('click', () => {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      elapsed += 1;
      localStorage.setItem('studyTime', elapsed);
      updateTimeDisplay();
    }, 1000);
  }
});

document.getElementById('pauseBtn').addEventListener('click', () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
});

// Set daily quote
document.querySelector('.quote').textContent = `"${getTodayQuote()}"`;

// Initialize display
updateTimeDisplay();
