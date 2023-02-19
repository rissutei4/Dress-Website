$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        items: 1,
        nav:true,
        navText: [" ", " "],
    });
});
//Open Burger Menu/Close Menu
const burgCont = document.querySelector(".burger-container-wrapper");
const burgIcon = document.querySelector(".burgerIcon");
const topLine = document.querySelector(".TopLine");
const botLine = document.querySelector(".BotLine");
const midLine = document.querySelector(".MidLine");
const logoIcon = document.querySelector(".logoIcon");

function toggleMenu() {
    if (burgCont.classList.contains("openedMenu")) {
        burgIcon.classList.remove("openedMenu");
        burgCont.classList.remove("openedMenu");
        topLine.classList.remove("openedMenu");
        botLine.classList.remove("openedMenu");
        midLine.classList.remove("openedMenu");
        logoIcon.classList.remove("openedMenu");

    } else {
        burgIcon.classList.add("openedMenu");
        burgCont.classList.add("openedMenu");
        topLine.classList.add("openedMenu");
        botLine.classList.add("openedMenu");
        midLine.classList.add("openedMenu");
        logoIcon.classList.add("openedMenu");
    }
}

burgIcon.addEventListener("click", toggleMenu);


langToggler = document.querySelector(".sub-menu").querySelectorAll("li");
console.log(langToggler);
langToggler.forEach(element => {
    element.addEventListener("click", function () {
        langToggler.forEach(ul => ul.classList.remove("active"))
        this.classList.add("active");
    })
});


window.onscroll = function () {
    let stickyheader = document.querySelector('.header');
    if (window.pageYOffset > 1) {
//sticky header
        stickyheader.classList.add("sticky-nav");
    } else {
//normal header
        stickyheader.classList.remove("sticky-nav");
    }
}

