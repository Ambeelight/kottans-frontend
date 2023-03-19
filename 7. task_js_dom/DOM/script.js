import data from "./data.js"

const itemList = document.querySelector(".menu__list"),
intro = document.querySelector(".intro"),
carItem = document.createElement("div");

carItem.classList.add(".car__content");
intro.parentElement.append(carItem);
carItem.style.display = "none";

function chosenCar ({title, content, image}) {
    return `
    <h2 style="text-transform:uppercase;">${title}</h2>
    <p>${content}</p>
    <img src=${image} class="car__content-image" alt="${title}">
     `;
}

const menuItem = Array.from(document.querySelectorAll(".menu__item"));
const removeActiveLink = () => menuItem.forEach((item) => item.classList.remove("active"));

itemList.addEventListener("click", ({target}) => {
    const itemId = target.parentElement.id;
    
    if (target.parentElement.closest(".menu__item")) {
        removeActiveLink();
    
        if (target.parentElement.classList.contains("active")) {
            target.parentElement.classList.remove("active");
        } else {
            intro.style.display = "none";
            carItem.style.display = "block";
            target.parentElement.classList.add("active");
            carItem.innerHTML = chosenCar(data.find((item) => item.title === itemId));
        }
    }
})
