const modal = document.querySelector(".modalContainer");
const gameContainer = document.querySelector(".gameContainer");
const instCon = document.querySelector(".instCon");
const boxes = document.querySelectorAll(".col");
const numTxt = document.querySelector(".numTxt1");
const roll = document.querySelector("#roll"); //button
const rollDice = document.querySelector("#rollDice");
const resultTxt = document.querySelector("#resultTxt");
const colorSelected = document.querySelector("#colorSelected");
const winLose = document.querySelector("#winLose");
const i = document.querySelector("#info");
const insBtn = document.querySelector("#insBtn");
let choosenCol = document.querySelector("#choosenCol");
const userPlayer = document.querySelector(".userPlayer");
const betCon = document.querySelector(".betCon");
let betAmount = document.querySelector("#betAmount");
let bet = document.querySelector("#bet");
let betLabel = document.querySelector("#betLabel");
const betBtnBack = document.querySelector("#betBtnBack");
const betBtnOkay = document.querySelector("#betBtnOkay");
const labelScore = document.querySelector("#labelScore");
const pointsCont = document.querySelector("#pointsCont");
const betBalance = document.querySelector("#betBalance");
const end = document.querySelector(".end");
const gEndP = document.querySelector("#gEndP");
const restart = document.querySelector("#restartBtn");
const userBtnOkay = document.querySelector("#userBtnOkay");
const pName = document.querySelector("#pName");
const playerName = document.querySelector("#player span");
const newGameBtn = document.querySelector("#newGameBtn");
const dices = document.querySelectorAll("img");
const images = [
  "../images/dice-blue.png",
  "../images/dice-green.png",
  "../images/dice-brown.png",
  "../images/dice-red.png",
  "../images/dice-yellow.png",
  "../images/dice-pink.png",
];
const colArr = ["Blue", "Green", "Brown", "Red", "Yellow", "Pink"];
let tempCol = "";
let amountBet = 0;
let tempPoints;
let countChecker = 0;

//boxes on click
for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", function () {
    //console.log(colArr[i]);
    displayTxt();

    tempCol = this.getAttribute("color");

    choosenCol.textContent = "You Choose Color: " + tempCol.toUpperCase();
    betLabel.textContent = "Bet amount for color " + tempCol.toUpperCase();
  });
}
//check for suffcient points
betBtnOkay.addEventListener("click", function () {
  let balChecker = Number(pointsCont.value);
  let betChecker = Number(betAmount.value);

  if (betChecker <= balChecker) {
    if (balChecker <= 0) {
      alert("you don't have enough balance!");
      gEndP.textContent = "You have 0 balance, Thank you for playing!";
      betCon.classList.add("hidden");
      end.classList.remove("hidden");
    } else {
      gameContainer.classList.add("hidden");
      modal.classList.remove("hidden");
      betCon.classList.add("hidden");
      getBetAmount();
      amountBet = parseInt(betAmount.value);
      countChecker++;
    }
  } else {
    alert("your bet is greater than your balance!");
    countChecker++;
  }
});

betBtnBack.addEventListener("click", function () {
  betCon.classList.add("hidden");
  gameContainer.classList.remove("hidden");
});

//getting dice color w/ animation

function rollDices() {
  dices.forEach(function (dice) {
    dice.classList.add("shake");
  });
  setTimeout(function () {
    dices.forEach(function (dice) {
      dice.classList.remove("shake");
    });
    let dice1 = Math.floor(Math.random() * 6);
    let dice2 = Math.floor(Math.random() * 6);
    let diceColor1 = dice1;
    if (diceColor1 === 0) {
      diceColor1 = "blue";
    } else if (diceColor1 === 1) {
      diceColor1 = "green";
    } else if (diceColor1 === 2) {
      diceColor1 = "brown";
    } else if (diceColor1 === 3) {
      diceColor1 = "red";
    } else if (diceColor1 === 4) {
      diceColor1 = "yellow";
    } else if (diceColor1 === 5) {
      diceColor1 = "pink";
    }
    let diceColor2 = dice2;
    if (diceColor2 === 0) {
      diceColor2 = "blue";
    } else if (diceColor2 === 1) {
      diceColor2 = "green";
    } else if (diceColor2 === 2) {
      diceColor2 = "brown";
    } else if (diceColor2 === 3) {
      diceColor2 = "red";
    } else if (diceColor2 === 4) {
      diceColor2 = "yellow";
    } else if (diceColor2 === 5) {
      diceColor2 = "pink";
    }

    colorSelected.textContent = diceColor1 + " and " + diceColor2;
    document.querySelector("#diceBlue").setAttribute("src", images[dice1]);
    document.querySelector("#diceGreen").setAttribute("src", images[dice2]);

    //getting results = bet * multplier (0,1,2)

    if (tempCol == (diceColor1 && diceColor2)) {
      tempPoints = amountBet * 2;
      getWinResultPoint();
      winLose.textContent = "You Win !";
    } else if (tempCol == (diceColor1 || diceColor2)) {
      tempPoints = amountBet * 1;
      getWinResultPoint();
      winLose.textContent = " You Win !";
    } else {
      tempPoints = amountBet;
      getLoseResultPoint();
      winLose.textContent = "Try Again";
    }
  }, 1000);
  closeDice.classList.remove("hidden");
  rollDice.classList.add("hidden");
}

newGameBtn.addEventListener("click", function () {
  window.location.reload();
  instCon.classList.add("hidden");
  betCon.classList.add("hidden");
  end.classList.add("hidden");
  end.classList.add("hidden");
  userPlayer.remove("hidden");
});

userBtnOkay.addEventListener("click", function () {
  if (pName.value === "") {
    alert("Please type your Name");
  } else {
    localStorage.setItem("User", pName.value);
    instCon.classList.remove("hidden");
    userPlayer.classList.add("hidden");
    playerName.textContent = pName.value.toUpperCase();
  }
});

newGameBtn.addEventListener("click", function () {
  window.location.reload();
  instCon.classList.add("hidden");
  betCon.classList.add("hidden");
  end.classList.add("hidden");
  end.classList.add("hidden");
  userPlayer.remove("hidden");
});

// reusable functions
function displayTxt() {
  roll.style.visibility = "visible";
}

function showToggle() {
  if (countChecker >= 5) {
    alert("reach 5 rounds, game is over");
    gEndP.textContent =
      "Thank you for playing, you have 0/5 rounds left. The game is over";
    end.classList.remove("hidden");
    gameContainer.classList.add("hidden");
  } else {
    betCon.classList.remove("hidden");
    gameContainer.classList.add("hidden");
  }
}
//validation for negative amount
betAmount.addEventListener("keyup", function () {
  let amountBet = betAmount.value;
  if (amountBet < 0) {
    alert("invalid amount, please enter positive number");
  }
});

function getBetAmount() {
  let tempBetAmount = betAmount;
  bet.textContent = "bet last round: " + tempBetAmount.value;
}

function getWinResultPoint() {
  let newPoints = tempPoints;
  let oldPoints = Number(pointsCont.value);

  newPoints = newPoints + oldPoints;
  labelScore.textContent = "POINTS: " + newPoints;
  pointsCont.value = newPoints;
  betBalance.textContent = pointsCont.value;
}
function getLoseResultPoint() {
  let newPoints = tempPoints;
  let oldPoints = Number(pointsCont.value);

  newPoints = oldPoints - newPoints;
  labelScore.textContent = "POINTS: " + newPoints;
  pointsCont.value = newPoints;
  betBalance.textContent = pointsCont.value;
}

function callInstructionDiv() {
  instCon.classList.remove("hidden");
  gameContainer.classList.add("hidden");
}

function Reset() {
  instCon.classList.remove("hidden");
  betCon.classList.add("hidden");
  end.classList.remove("hidden");
  pointsCont.value = Number(300);
  labelScore.textContent = "POINTS: " + pointsCont.value;
  end.classList.add("hidden");
  betBalance.value = Number(300);
  countChecker = 0;
  betBalance.textContent = "300";
}

function callCloseBtn() {
  closeDice.classList.add("hidden");
  rollDice.classList.remove("hidden");
  modal.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  roll.style.visibility = "hidden";
  instCon.classList.add("hidden");
  winLose.textContent = "";
  colorSelected.textContent = "";
}
// event listener
roll.addEventListener("click", showToggle);
rollDice.addEventListener("click", rollDices);
closeDice.addEventListener("click", callCloseBtn);
i.addEventListener("click", callInstructionDiv);
insBtn.addEventListener("click", callCloseBtn);
restart.addEventListener("click", Reset);

window.addEventListener("load", (event) => {
  modal.classList.add("hidden");
  gameContainer.classList.add("hidden");
  instCon.classList.add("hidden");
  userPlayer.classList.remove("hidden");
  betCon.classList.add("hidden");
  end.classList.add("hidden");
});
