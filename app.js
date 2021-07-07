const startBTN = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");

const colors = [
  "rgb(211, 47, 184)",
  "rgb(211, 47, 61)",
  "rgb(211, 47, 110)",
  "rgb(47, 85, 211)",
  "rgb(47, 118, 211)",
  "rgb(211, 159, 47)",
  "rgb(211, 121, 47)",
  "rgb(211, 72, 47)",
  "rgb(47, 173, 211)",
  "rgb(47, 211, 184)",
  "rgb(47, 211, 115)",
  "rgb(93, 211, 47)",
  "rgb(175, 211, 47)",
];

let time = 0;

let score = 0;

startBTN.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreesTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreesTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Score : <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNamber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNamber(0, width - size);
  const y = getRandomNamber(0, height - size);

  const color = getRandomColor();
  circle.style.background = color;

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;

  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  board.append(circle);
}

function getRandomNamber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
