import data from "./data.js"

const itemList = document.querySelector(".menu__list"),
intro = document.querySelector(".intro"),
carItem = document.createElement("div");

carItem.classList.add(".car__content");
carItem.classList.add("disabled");
intro.parentElement.append(carItem);

function chosenCar ({title, content, image}) {
    return `
    <h2 class="car__header">${title}</h2>
    <p>${content}</p>
    <img src=${image} class="car__content-image" alt="${title}">
     `;
}

const menuItem = Array.from(document.querySelectorAll(".menu__item"));
const removeActiveLink = () => menuItem.forEach((item) => item.classList.remove("active"));

itemList.addEventListener("click", ({target}) => {
    const itemId = target.parentElement.id;
    if (target.parentElement.closest(".menu__item")) {
        if (target.parentElement.classList.contains("active")) {
            target.parentElement.classList.remove("active");
            intro.classList.remove("disabled");
            carItem.classList.add("disabled");
        }
        else {
            removeActiveLink();

            intro.classList.add("disabled");
            carItem.classList.remove("disabled");
            target.parentElement.classList.add("active");
            carItem.innerHTML = chosenCar(data.find((item) => item.title === itemId));
            }
        }

})

const goTopBtn = document.querySelector(".go-top-btn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 600) {
        goTopBtn.classList.add("arrow-up--active")
    } else {
        goTopBtn.classList.remove("arrow-up--active");
    }
})

goTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})
