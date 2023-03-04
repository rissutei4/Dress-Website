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


//all sticky headers
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

//Mobile Filters
if (window.innerWidth <= 426) {
    const filterBlock = document.querySelector('.filters-mobile');
    const filterButton = document.querySelector('.filtersClick');
    const filterDropdownContent = document.querySelector('.filters-mobile-cont');
    const liItem = document.querySelectorAll('.filters-mobile-cont > li');
    const filterOptions = document.querySelectorAll('.filters-mobile-cont button');

    filterButton.addEventListener('click', () => {
        filterBlock.classList.toggle('show-mobile');
        filterButton.classList.toggle('show-mobile');
        filterDropdownContent.classList.toggle('show-mobile');
    });

    filterOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedFilter = option.dataset.filter;
            filterButton.querySelector('h5').textContent = selectedFilter;
            filterBlock.classList.remove('show-mobile');
            filterButton.classList.remove('show-mobile');
            filterDropdownContent.classList.remove('show-mobile');
            liItem.forEach(item => {
                if (item.querySelector('button').dataset.filter === selectedFilter) {
                    item.classList.add('d-none');
                } else {
                    item.classList.remove('d-none');
                }
            });
        });
    });

    const filterMobileCont = document.querySelector('.filters-mobile-cont');
    filterOptions.forEach(option => {
        option.addEventListener('click', () => {
            filterMobileCont.style.bottom = '-274px';
        });
    });
}

//Remove scroll with mobile
// select the .burger-container-wrapper element
const burgerContainer = document.querySelector('.burger-container-wrapper');

// select the body element
const body = document.querySelector('body');

// add a class to the body to indicate that scrolling is enabled
body.classList.add('scroll-enabled');

// add an event listener to the burgerContainer that listens for changes to the "active" class
burgerContainer.addEventListener('change', () => {
    // if the "active" class is present on the burgerContainer element
    if (burgerContainer.classList.contains('openedMenu')) {
        // disable scrolling on the body element
        body.classList.remove('scroll-enabled');
        body.style.overflow = 'hidden';
    } else {
        // otherwise, enable scrolling on the body element
        body.classList.add('scroll-enabled');
        body.style.overflow = '';
    }
});
