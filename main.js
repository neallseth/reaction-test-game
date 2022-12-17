let startTime = 0;
let activeGame = false;
let score = 0;
let record = null;

const actionButtonElement = document.querySelector(".action-btn");
actionButtonElement.addEventListener("click", (e) => {
  if (!activeGame) {
    handleGameStart();
  } else if (startTime) {
    handleGameEnd();
  }
});

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.code === "Space") {
    if (!activeGame) {
      console.log("space clicked, starting game!");
      handleGameStart();
    } else if (startTime) {
      handleGameEnd();
    }
  }
});

function setButtonState(color, text) {
  actionButtonElement.style.backgroundColor = color;
  actionButtonElement.innerText = text;
}

function handleGameStart() {
  activeGame = true;
  setButtonState("#fce78e73", "Ready...");
  const msUntilTrigger = Math.random() * 4000 + 1500;
  setTimeout(triggerTimeStart, msUntilTrigger);
}

function triggerTimeStart() {
  setButtonState("rgb(76 197 80 / 33%)", "Now!");
  startTime = Date.now();
}

function handleGameEnd() {
  score = Date.now() - startTime;
  updateUIWithScore(score);
  activeGame = false;
  startTime = 0;
  if (!record || score < record) {
    record = score;
    handleNewRecord();
  }
  setButtonState("#80808021", "Start Game");
}

function updateUIWithScore(score) {
  let scoreSectionElement = document.querySelector(".score-section");
  if (!scoreSectionElement) {
    scoreSectionElement = document.createElement("div");
    scoreSectionElement.classList.add("score-section");
    scoreSectionElement.innerHTML =
      '<span>Your score:</span><span class="score"></span>';
    const mainElement = document.querySelector("main");
    mainElement.appendChild(scoreSectionElement);
  }
  const scoreElement = document.querySelector(".score");
  scoreElement.innerText = `${score}ms`;
}

function handleNewRecord() {
  let recordDisplayElement = document.querySelector(".record-display");
  if (!recordDisplayElement) {
    recordDisplayElement = document.createElement("p");
    recordDisplayElement.classList.add("record-display");
    const mainElement = document.querySelector("main");
    mainElement.appendChild(recordDisplayElement);
  }
  recordDisplayElement.innerText = `Your best time: ${record}ms`;
}
