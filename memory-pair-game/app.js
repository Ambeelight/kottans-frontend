import {iconCards} from './data.js';

const wrapper = document.querySelector(".wrapper"),
 timerElement = document.querySelector(".timer"),
 moveCounter = document.querySelector(".move-counter"),
 shuffledCards = shuffle(iconCards);

let flippedCards = [],
  matchedCards = [],
  moveCount = 0,
  timer = null,
  seconds = 0;

function createStartMenu() {
    const startGameBtn = document.createElement("button"),
     startMenu = document.createElement("div");

    startMenu.classList.add("start-menu");
    startGameBtn.classList.add("start-game");
    startGameBtn.innerHTML = "Start Game";
    document.body.appendChild(startMenu);
    startMenu.appendChild(startGameBtn);

    startGameBtn.addEventListener("click", () => {
      createGameCards();
      setupCardMatching();
      startTimer();
      startMenu.classList.add("hidden");
      wrapper.classList.remove("hidden");
  });
};

function createGame(name, item) {
  const cardContainer = document.querySelector(".game-field"),
   cardElement = document.createElement("div"),
   cardFrontElement = document.createElement("img"),
   cardBackElement = document.createElement("div");

  cardElement.classList.add("card");
  cardElement.dataset.cardIcon = `${name}`;

  cardFrontElement.classList.add("card-front");
  cardFrontElement.src = `./icons/${item}`;
  cardFrontElement.alt = `${name}`;
  cardFrontElement.draggable = false;
  
  cardBackElement.classList.add("card-back");
  cardBackElement.textContent = "?";

  cardElement.appendChild(cardFrontElement);
  cardElement.appendChild(cardBackElement);
  cardContainer.appendChild(cardElement);
}

function shuffle(array) {
  const clonedArray = [...array, ...array];

  for (let i = clonedArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const original = clonedArray[i];

      clonedArray[i] = clonedArray[randomIndex];
      clonedArray[randomIndex] = original;
  }

  return clonedArray;
}

function createGameCards() {
  shuffledCards.forEach((item) => createGame(item[0].slice(0, -4), item[0]));
}

function setupCardMatching() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    cardMatching(card);
  });
}

function cardMatching(card) {
  card.addEventListener("click", () => {
    if (
      card.classList.contains("card-flipped") ||
      flippedCards.length === 2 ||
      matchedCards.includes(card)
    ) return;

    card.classList.add("card-flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      const card1 = flippedCards[0],
       card2 = flippedCards[1];
       
       // Increment move count and update move counter
       updateMoveCounter();

      // Compare cards by data-attributes
      if (card1.dataset.cardIcon === card2.dataset.cardIcon) {
        matchedCards.push(card1, card2);
        flippedCards = [];

        // Check if all cards are matched
        if (matchedCards.length === iconCards.length * 2) {
          showResult();
        }
      } else {
        // Cards are unmatched
        setTimeout(() => {
          flippedCards.forEach((card) => {
            card.classList.add("shake");
          })
        }, 500);

        setTimeout(() => {
          flippedCards.forEach((card) => {
            card.classList.remove("shake", "card-flipped");
          })
          flippedCards = [];
        }, 1000);
      };
    };
  });
}

function startTimer() {
   timer = setInterval(() => {
    seconds++;
    timerElement.textContent = `Time: ${formatTime(seconds)}`;
  }, 1000);
}

function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  return `${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(num) {
  return num.toString().padStart(2, '0');
}

function updateMoveCounter() {
  moveCount++;
  moveCounter.textContent = `Moves: ${moveCount}`;
}

function showResult() {
  clearInterval(timer);
  // const resultContainer = document.createElement("div");
  // const resultText = document.createElement("p");
  // const timeText = `Time: ${formatTime(seconds)}`;
  // const matchText = `Matches: ${matchedCards.length}`;
  
  // resultContainer.classList.add(".result-container");
  // resultText.textContent = `Your time: ${timeText} | ${matchText} | You WON`;
  
  // resultContainer.appendChild(resultText);
  // resultContainer.classList.remove("hidden");
  console.log("YOU WON");
}

createStartMenu();
 