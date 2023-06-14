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

//Create the game board and the game logic
const createGame = () => {
    const gameBoard = document.querySelector(".game");
    const fragment = new DocumentFragment();
    const items = shuffle([...iconCards, ...iconCards]);

    items.forEach(item => {
        function createCard(cardClass) {
            const card = document.createElement('div');
            card.classList.add(cardClass);

            return card;
        }
        
        const cardNode = createCard("card");
        const cardItemFront = createCard("card-front");
        const cardItemBack = createCard("card-back");
        
        cardItemFront.innerHTML = item;
        cardItemBack.innerHTML = "?";

        cardNode.appendChild(cardItemFront);
        cardNode.appendChild(cardItemBack);
        fragment.appendChild(cardNode);
        
    });
    
    gameBoard.appendChild(fragment);
};

const shuffle = array => {
    const clonedArray = [...array]

    for (let i = clonedArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const original = clonedArray[i];

        clonedArray[i] = clonedArray[randomIndex];
        clonedArray[randomIndex] = original;
    }

    return clonedArray;
}

createGame();