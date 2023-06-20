import {iconCards} from './data.js';

const startGameMenu = () => {
    const startGameBtn = document.createElement("button"),
     startMenu = document.createElement("div");

    startMenu.classList.add("start-menu");
    startGameBtn.classList.add("start-game");
    startGameBtn.innerHTML = "Start Game";
    document.body.appendChild(startMenu);
    startMenu.appendChild(startGameBtn);

    startGameBtn.addEventListener("click", () => {
      shuffledCards.forEach((item) => createGame(item[0].slice(0, -4), item[0])); 
  });
};

const createGame = (name, item) => {
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

const shuffle = array => {
  const clonedArray = [...array, ...array];

  for (let i = clonedArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const original = clonedArray[i];

      clonedArray[i] = clonedArray[randomIndex];
      clonedArray[randomIndex] = original;
  }

  return clonedArray;
}

const shuffledCards = shuffle(iconCards);

shuffledCards.forEach((item) => createGame(item[0].slice(0, -4), item[0]));

const moveCounter = document.querySelector(".move-counter"); // MC
let moveCount = 0; // MC


//Match the cards
const cards = document.querySelectorAll('.card');
let flippedCards = [],
 matchedCards = [];

cards.forEach((card) => {
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
      // Compare cards by data-attributes
      if (card1.dataset.cardIcon === card2.dataset.cardIcon) {
        matchedCards.push(card1, card2);
        flippedCards = [];

        // Check if all cards are matched
        if (matchedCards.length === cards.length) {
          console.log("You WON");
          // win function
        }
      } else {
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
      moveCount++; // MC
      moveCounter.textContent = `Moves: ${moveCount}`; // MC
    };
  });
});

//Timer type??
const stats = document.querySelector(".stats");

const createTimer = () => {
  const timerElement = document.createElement('div');

  timerElement.classList.add("timer");
  stats.appendChild(timerElement);

  if (time > 0) {
    setInterval(() => {
      time--;
      timerElement.textContent = `Time: ${time}`;
    }, 1000)
  }
  
  return timerElement;
};

// const moveCounterElement = document.createElement('div');
//   moveCounterElement.classList.add("move-counter");
//   stats.appendChild(moveCounterElement);
//   moveCounterElement.textContent = "Moves: 0"
