const doorImage1 = document.getElementById("door1");
const doorImage2 = document.getElementById("door2");
const doorImage3 = document.getElementById("door3");
const startButton = document.getElementById("start");
const resultText = document.getElementById("pickDoor");
const doorText1 = document.getElementById("text1");
const doorText2 = document.getElementById("text2");
const doorText3 = document.getElementById("text3");
const winId = document.getElementById("num-win");
const lostId = document.getElementById("num-lost");
const strCu = document.getElementById("num-c-str");
const strBest = document.getElementById("num-b-str");

let catDoorPath = "https://i.ibb.co/Qj46vY9/robot.gif";
let jakeDoorPath = "https://i.ibb.co/6mT4x0Y/jake.gif";
let starDoorPath = "https://i.ibb.co/qmTwYdn/star.gif";
let closedDoorPath = "https://i.ibb.co/7WS7sYW/closed-Door.png";
let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
let openText1;
let openText2;
let openText3;
let currentlyPlaying = true;
let theWin = 0;
let theLost = 0;
let score = 0;
let highScore = 0;

const whoIsIt = (door, textNum, textDoor) => {

  if (door.src === catDoorPath && textNum === 1) {

    textDoor.innerHTML = "That's Timmy, he is cool I know.";;
  }
  else if (door.src === jakeDoorPath && textNum === 2) {
    textDoor.innerHTML = "It's Jake! Let's Party!";
  }
  else if (door.src === starDoorPath && textNum === 3) {
    textDoor.innerHTML = "Weird girl wants out... RUN...";
  }
}

const isBot = door => {
  if (door.src === catDoorPath) {
    return true;
  }
  else {
    return false;
  }
}

const isClicked = door => {
  if (door.src === closedDoorPath) {
    return false;
  }
  else {

    return true;
  }
}

const playDoor = door => {
  numClosedDoors -= 1;
  if (numClosedDoors === 0) {
    gameOver("win");
  }
  else if (isBot(door)) {
    gameOver("lost");
  }
}

const randomChoreDoorGenerator = () => {
  let choreDoor = Math.floor(Math.random() * numClosedDoors);
  if (choreDoor === 0) {
    openDoor1 = catDoorPath;
    openDoor2 = jakeDoorPath;
    openDoor3 = starDoorPath;
    openText1 = 1;
    openText2 = 2;
    openText3 = 3;
  }
  else if (choreDoor === 1) {
    openDoor2 = catDoorPath;
    openDoor3 = jakeDoorPath;
    openDoor1 = starDoorPath;
    openText2 = 1;
    openText3 = 2;
    openText1 = 3;
  }
  else if (choreDoor === 2) {
    openDoor3 = catDoorPath;
    openDoor1 = jakeDoorPath;
    openDoor2 = starDoorPath;
    openText3 = 1;
    openText1 = 2;
    openText2 = 3;
  }
}


doorImage1.onclick = () => {

  startButton.onclick = () => {
    if (!currentlyPlaying) {
      startRound();
    }
  }
  console.log(doorImage1);
  if(!isClicked(doorImage1) && currentlyPlaying) {
    doorImage1.src = openDoor1;
    whoIsIt(doorImage1, openText1, doorText1);
    playDoor(doorImage1);

  }
}

doorImage2.onclick = () => {

  startButton.onclick = () => {
    if (!currentlyPlaying) {
      startRound();
    }
  }

  if (!isClicked(doorImage2) && currentlyPlaying) {
    doorImage2.src = openDoor2;
    whoIsIt(doorImage2, openText2, doorText2);
    playDoor(doorImage2);

  }
}

doorImage3.onclick = () => {

  startButton.onclick = () => {
    if (!currentlyPlaying) {
      startRound();
    }
  }

  if (!isClicked(doorImage3) && currentlyPlaying) {
    doorImage3.src = openDoor3;
    whoIsIt(doorImage3, openText3, doorText3);
    playDoor(doorImage3);
  }
}

const startRound = () => {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  numClosedDoors = 3;
  currentlyPlaying = true;
  doorText1.innerHTML = "First Mysterious Door";
  doorText2.innerHTML = "Second Mysterious Door";
  doorText3.innerHTML = "Third Mysterious Door";
  startButton.innerHTML = '<i class="fa fa-play"></i> Good luck!';
  resultText.innerHTML = "Chose a door...";
  resultText.classList.remove("green-text");
  resultText.classList.remove("green-glow");
  resultText.classList.remove("red-text");
  resultText.classList.remove("red-glow");
  randomChoreDoorGenerator();

}

const gameOver = status => {
  if (status === "win") {
    startButton.innerHTML = '<i class="fa fa-repeat"></i> Play Again?';
    resultText.innerHTML = "You Win!!!";
    resultText.classList.add("green-text");
    resultText.classList.add("green-glow");
    setTimeout(function() {
    resultText.classList.remove("green-text")}, 3000);
    setTimeout(function() {
      resultText.classList.remove("green-glow")}, 3000);
    theWin += 1;
    winId.innerHTML = `${theWin}`;
    streakStuff();
  }
  else if (status === "lost") {
    startButton.innerHTML = '<i class="fa fa-repeat"></i> Play Again?';
    resultText.innerHTML = "Game over!";
    resultText.classList.add("red-text");
    resultText.classList.add("red-glow");
    setTimeout(function() {
      resultText.classList.remove("red-text")}, 3000);
    setTimeout(function() {
      resultText.classList.remove("red-glow")}, 3000);
    theLost += 1;
    lostId.innerHTML = `${theLost}`;
    score = 0;
    strCu.innerHTML = score;
  }
  currentlyPlaying = false;
}

const streakStuff = () => {
  score += 1;
  strCu.innerHTML = score;
  if (score > highScore) {
    highScore = score;
    strBest.innerHTML = highScore;
  }
}
// randomChoreDoorGenerator();
startRound();
