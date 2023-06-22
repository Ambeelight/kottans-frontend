import {iconCards} from './data.js';

const wrapper = document.querySelector(".wrapper"),
 timerElement = document.querySelector(".timer"),
 moveCounter = document.querySelector(".move-counter"),
 cardPairs = [...iconCards, ...iconCards],
 shuffledCards = shuffle(cardPairs),
 cards = document.querySelectorAll('.card'),
 cardContainer = document.querySelector(".game-field");
 

let flippedCards = [],
  matchedCards = [],
  moveCount = 0,
  timer = null,
  seconds = 0;

function createStartMenu(shuffledCards, cards) {
    const startGameBtn = document.createElement("button"),
     startMenu = document.createElement("div");

    startMenu.classList.add("start-menu");
    startGameBtn.classList.add("start-game");
    startGameBtn.innerHTML = "Start Game";
    document.body.appendChild(startMenu);
    startMenu.appendChild(startGameBtn);

    startGameBtn.addEventListener("click", () => {
      createGameCards(shuffledCards);
      setupCardMatching(cards);
      startTimer();
      startMenu.classList.add("hidden");
      wrapper.classList.remove("hidden");
  });
};

function createGameCard(name, item) {
  const cardElement = createCardElement(name);
  const cardFrontElement = createCardFrontElement(name, item);
  const cardBackElement = createCardBackElement();

  cardElement.appendChild(cardFrontElement);
  cardElement.appendChild(cardBackElement);
  cardContainer.appendChild(cardElement);

  return cardElement;
}

function createCardElement(name) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.dataset.cardIcon = name;
  return cardElement;
}

function createCardFrontElement(name, item) {
  const cardFrontElement = document.createElement("img");
  cardFrontElement.classList.add("card-front");
  cardFrontElement.src = `./icons/${item}`;
  cardFrontElement.alt = name;
  cardFrontElement.draggable = false;
  return cardFrontElement;
}

function createCardBackElement() {
  const cardBackElement = document.createElement("div");
  cardBackElement.classList.add("card-back");
  cardBackElement.textContent = "?";
  return cardBackElement;
}


function shuffle(array) {
  const clonedArray = [...array]; //

  for (let i = clonedArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const original = clonedArray[i];

      clonedArray[i] = clonedArray[randomIndex];
      clonedArray[randomIndex] = original;
  }

  return clonedArray;
}

function createGameCards(items) {
   items.forEach((item) => {
    const card = createGameCard(item[0].slice(0, -4), item[0]);
    cardMatching(card);
  });
}

function setupCardMatching(cards) {
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
       updateMoveCounter(++moveCount);

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
  return num.toString().padStart(2, "0");
}

function updateMoveCounter(moves) {
  moveCounter.textContent = `Moves: ${moves}`;
}

function restartGame(cards) {
  matchedCards = [];
  flippedCards = [];
  moveCount = 0;
  updateMoveCounter(moveCount);

  clearInterval(timer);
  seconds = 0;
  timerElement.textContent = `Time: ${formatTime(seconds)}`;

   // Flip all cards back
   cards.forEach((card) => {
    card.classList.remove("card-flipped");
  });

  // Reshuffle the cards
  const newShuffledCards = shuffle(shuffledCards);

  // Remove existing cards from the DOM
  cardContainer.innerHTML = "";

  // Create and append new cards
  newShuffledCards.forEach((item) => {
    const name = item[0].slice(0, -4);
    const card = createGameCard(name, item[0]);
    cardContainer.appendChild(card);
  });

  cards = document.querySelectorAll('.card');
  setupCardMatching(cards);
  
  startTimer();
}

// const restart = document.querySelector(".restart");
// restart.addEventListener("click", () => restartGame(cards));

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

createStartMenu(shuffledCards, cards);
 