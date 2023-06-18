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
  cardFrontElement.classList.add("card-front", name);
  cardFrontElement.src = `./icons/${item}`;
  cardFrontElement.alt = "";
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