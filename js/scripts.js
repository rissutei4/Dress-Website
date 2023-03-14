$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        items: 1,
        nav: false,
        navText: [" ", " "],
        animateOut: 'fadeOutUp',
        animateIn: 'fadeInDown',
        smartSpeed: 100,
    });
});
//Open Burger Menu/Close Menu
const burgCont = document.querySelector(".burger-container-wrapper");
const burgIcon = document.querySelector(".burgerIcon");
const topLine = document.querySelector(".TopLine");
const botLine = document.querySelector(".BotLine");
const midLine = document.querySelector(".MidLine");
const logoIcon = document.querySelector(".logoIcon");
const stickyheader = document.querySelector('.header');
const logoElems = document.querySelector('.burger-logo-elements');

function toggleMenu() {
    if (burgCont.classList.contains("openedMenu")) {
        burgIcon.classList.remove("openedMenu");
        burgCont.classList.remove("openedMenu");
        topLine.classList.remove("openedMenu");
        botLine.classList.remove("openedMenu");
        midLine.classList.remove("openedMenu");
        logoIcon.classList.remove("openedMenu");
        stickyheader.classList.add('sticky-nav');
        if (window.innerWidth <= 425 && !burgCont.classList.value.includes('openedMenu')) {
            logoElems.style.display = 'block'
        }
    } else {
        burgIcon.classList.add("openedMenu");
        burgCont.classList.add("openedMenu");
        topLine.classList.add("openedMenu");
        botLine.classList.add("openedMenu");
        midLine.classList.add("openedMenu");
        logoIcon.classList.add("openedMenu");
        stickyheader.classList.remove('sticky-nav');
        if (window.innerWidth <= 426 && burgCont.classList.value.includes('openedMenu')) {
            logoElems.style.display = 'none'
        }
    }
}

burgIcon.addEventListener("click", toggleMenu);

const burgContMobile = document.querySelector(".burger-container-wrapper");
const burgIconMobile = document.querySelector(".burgerIconMobile");

function toggleMenuMobile() {
    if (burgContMobile.classList.contains("openedMenu")) {
        burgIcon.classList.remove("openedMenu");
        burgContMobile.classList.remove("openedMenu");
        burgIcon.classList.remove("openedMenu");
        burgCont.classList.remove("openedMenu");
        topLine.classList.remove("openedMenu");
        botLine.classList.remove("openedMenu");
        midLine.classList.remove("openedMenu");
        logoIcon.classList.remove("openedMenu");
        logoElems.style.display = 'flex'
        if (window.innerWidth <= 425 && !burgCont.classList.value.includes('openedMenu')) {
            logoElems.style.display = 'flex'
        }
    }
}

burgIconMobile.addEventListener("click", toggleMenuMobile);

//Language button shows languages
const button = document.querySelector('.langbtn');
const dropdownContent = document.querySelector('.sub-menu');
const dropdownLinks = document.querySelectorAll('.sub-menu li');

button.addEventListener('click', () => {
    dropdownContent.classList.toggle('show');
});

dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
        dropdownContent.classList.remove('show');
    });
});

function updateLanguageSwitcher() {
    // Get the active language element
    const activeLanguageElem = document.querySelector('.languageElem.active');

    // Get the language switcher button
    const langSwitcherButton = document.querySelector('.langbtn');

    // Set the text content of the button to the active language
    langSwitcherButton.textContent = activeLanguageElem.textContent;
}

// Call the function initially to set the initial active language
updateLanguageSwitcher();

// Get all the language elements
const languageElems = document.querySelectorAll('.languageElem');

// Add a click event listener to each language element
languageElems.forEach((languageElem) => {
    languageElem.addEventListener('click', () => {
        // Remove the active class from all language elements
        languageElems.forEach((elem) => {
            elem.classList.remove('active');
        });

        // Add the active class to the clicked language element
        languageElem.classList.add('active');

        // Update the language switcher button
        updateLanguageSwitcher();
    });
});

window.onscroll = () => {
    const stickyheaderY = document.querySelector('.header');
    const burgerContainer = document.querySelector('.burger-container-wrapper');
    const body = document.querySelector('body');
    const screenWidth = window.innerWidth;
    if (window.scrollY > 1 && screenWidth <= 425) {
        body.classList.remove('scroll-enabled');
        if (burgerContainer.classList.value.includes('openedMenu')) {
            stickyheaderY.classList.remove('sticky-nav');
        } else {
            stickyheaderY.classList.add('sticky-nav');
        }
    } else if (window.scrollY > 1 && screenWidth > 425) {
        stickyheaderY.classList.add('sticky-nav');
    } else {
        stickyheaderY.classList.remove('sticky-nav');
    }
}


//Load More button
function handleLoadMoreClick(event) {
    const container = event.target.closest('.product-cards-cont');
    const loadMoreButton = container.querySelector('.load-more');
    const hiddenCards = container.querySelectorAll('.hidden-prod');

    for (let i = 0; i < Math.min(hiddenCards.length, 3); i++) {
        hiddenCards[i].classList.add('shownCards');
        hiddenCards[i].classList.remove('hidden-prod');
    }

    if (container.querySelectorAll('.hidden-prod').length === 0) {
        loadMoreButton.style.display = 'none';
    }
}

const loadMoreButtons = document.querySelectorAll('.load-more');

loadMoreButtons.forEach(button => {
    button.addEventListener('click', handleLoadMoreClick);
});


//Mobile Language button shows languages
const LangBtnMobile = document.querySelector('.language-switcher-mobile .langbtnMobile');
const dropdownContentMobile = document.querySelector('.language-switcher-mobile .sub-menu');
const dropdownLinksMobile = document.querySelectorAll('.language-switcher-mobile .sub-menu li');

LangBtnMobile.addEventListener('click', () => {
    dropdownContentMobile.classList.toggle('show');
});

dropdownLinksMobile.forEach(link => {
    link.addEventListener('click', () => {
        dropdownContentMobile.classList.remove('show');
    });
});

function updateLanguageSwitcherMobile() {
    // Get the active language element
    const activeLanguageElemMob = document.querySelector('.language-switcher-mobile .sub-menu .languageElem.active');

    // Get the language switcher button
    const langSwitcherButtonMobile = document.querySelector('.language-switcher-mobile .langbtnMobile');

    // Set the text content of the button to the active language
    langSwitcherButtonMobile.textContent = activeLanguageElemMob.textContent;
}

// Call the function initially to set the initial active language
updateLanguageSwitcherMobile();

// Get all the language elements
const languageElemsMobile = document.querySelectorAll('.language-switcher-mobile .sub-menu .languageElem');

// Add a click event listener to each language element
languageElemsMobile.forEach((languageElem) => {
    languageElem.addEventListener('click', () => {
        // Remove the active class from all language elements
        languageElemsMobile.forEach((elem) => {
            elem.classList.remove('active');
        });

        // Add the active class to the clicked language element
        languageElem.classList.add('active');

        // Update the language switcher button
        updateLanguageSwitcher();
    });
});



