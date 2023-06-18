import {iconCards} from './data.js';

const startGameMenu = () => {
    const startGameBtn = document.createElement("button")
    const startMenu = document.createElement("div");

    startMenu.classList.add("start-menu");
    startGameBtn.classList.add("start-game");
    startGameBtn.innerHTML = "Start Game";
    document.body.appendChild(startMenu);
    startMenu.appendChild(startGameBtn);

    startGameBtn.addEventListener("click", () => createGame()); 
}

const timer = document.querySelector(".timer");
const movesCount = document.querySelector(".moves");
const stopBtn = document.querySelector(".stop-button");



const createGame = (name, item) => {
  const cardContainer = document.querySelector(".game-field");
  const cardElement = document.createElement("div");
  const cardFrontElement = document.createElement("img");
  const cardBackElement = document.createElement("div");

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


//Match the cards
const cards = document.querySelectorAll('.card');
let flippedCards = [];
let matchedCards = [];

cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (
      card.classList.contains("card-flipped") ||
      flippedCards.length === 2 ||
      matchedCards.includes(card)
    ) {
      return;
    }

    card.classList.add("card-flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      const card1 = flippedCards[0];
      const card2 = flippedCards[1];

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
          card1.classList.remove("card-flipped");
          card2.classList.remove("card-flipped");
          flippedCards = [];
        }, 1000);
      }
    }
  });
});