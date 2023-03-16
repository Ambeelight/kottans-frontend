import data from "./data.js"

const itemList = document.querySelector(".menu__list"),
intro = document.querySelector(".intro"),
carItem = document.createElement("div"),
menuItem = document.querySelectorAll(".menu__item");

carItem.classList.add(".car__content");
intro.parentElement.append(carItem);
carItem.style.display = "none";

itemList.addEventListener("click", ({target}) => {
    const itemId = target.parentElement.id;
    const carContent = data.filter(({ title }) => title === itemId);
    console.log(carContent);
    const [{ title, content, image }] = carContent;
    intro.style.display = "none"; 
    carItem.style.display = "block";
    carItem.innerHTML = `
    <h2 style="text-transform:uppercase;">${title}</h2>
        <p>${content}</p>
        <img src=${image} class="car__content-image" alt="${title}">
        `;
})

