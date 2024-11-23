"use strict";
//Menu
const burgerContainer = document.querySelector('.burger-container-wrapper');
const burgerIcon = document.querySelector(".burgerIcon");
const burgerIconMobile = document.querySelector(".burgerIconMobile");
const burgerLines = burgerIcon.querySelectorAll(".line");
const logoIcon = document.querySelector(".logoIcon");
const stickyHeader = document.querySelector('.header');
const logoElems = document.querySelector('.burger-logo-elements');

//Scroll
const body = document.querySelector('body');
const screenWidth = window.innerWidth;
//Language Btn
const langSwitcherbtn = document.querySelector('.langbtn');
const dropdownContent = document.querySelector('.sub-menu');
const dropdownLinks = document.querySelectorAll('.sub-menu li');
const activeLanguageElem = document.querySelector('.sub-menu li.active');
//Load More
const loadMoreButtons = document.querySelectorAll('.load-more');
function toggleMenu() {
    const isMenuOpen = burgerContainer.classList.contains("openedMenu");
    // Toggle menu state
    burgerContainer.classList.toggle("openedMenu", !isMenuOpen);
    burgerIcon.classList.toggle("openedMenu", !isMenuOpen);
    burgerIconMobile.classList.toggle("openedMenu", !isMenuOpen);
    burgerLines.forEach(line => {
        line.classList.toggle("openedMenu", !isMenuOpen);
    });
    logoIcon.classList.toggle("openedMenu", !isMenuOpen);
    logoElems.classList.toggle("openedMenu", !isMenuOpen);

    if (isMenuOpen) {
        // Menu closing
        if (window.scrollY > 1) {
            stickyHeader.classList.add('sticky-nav');
        }
        if (window.innerWidth <= 432) {
            logoElems.style.display = 'flex';
        }
    } else {
        // Menu opening
        if (window.scrollY <= 1) {
            stickyHeader.classList.remove('sticky-nav');
        }
        if (window.innerWidth <= 433) {
            logoElems.style.display = 'none';
        }
    }
}

// Event listeners for both desktop and mobile burger icons
burgerIcon.addEventListener("click", toggleMenu);
burgerIconMobile.addEventListener("click", toggleMenu);

const languageSwitcher = function () {
    // Set initial button text to the currently active language
    langSwitcherbtn.textContent = activeLanguageElem.textContent;

    // Toggle the dropdown menu when the button is clicked
    langSwitcherbtn.addEventListener('click', (event) => {
        dropdownContent.classList.toggle('show');
        event.stopPropagation(); // Prevent the click from bubbling up to the document
    });

    // Add click event listeners to each language option
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Close the dropdown menu
            dropdownContent.classList.remove('show');

            // Remove 'active' from the previously active element
            const currentActiveElem = document.querySelector('.sub-menu li.active');
            if (currentActiveElem) {
                currentActiveElem.classList.remove('active');
            }

            // Add 'active' to the clicked element
            link.classList.add('active');

            // Update button text with the newly active language
            langSwitcherbtn.textContent = link.textContent;

            event.stopPropagation(); // Prevent the click from bubbling up to the document
        });
    });

    // Close the dropdown when clicking outside of it
    document.addEventListener('click', () => {
        dropdownContent.classList.remove('show');
    });
}

languageSwitcher()
// Define a function to handle scroll events
function handleScroll() {
    if (window.scrollY > 1 && screenWidth <= 425) {
        body.classList.remove('scroll-enabled');
        if (burgerContainer.classList.value.includes('openedMenu')) {
            stickyHeader.classList.remove('sticky-nav');
        } else {
            stickyHeader.classList.add('sticky-nav');
        }
    } else if (window.scrollY > 1 && screenWidth > 425) {
        stickyHeader.classList.add('sticky-nav');
    } else {
        stickyHeader.classList.remove('sticky-nav');
    }
}

// Attach the function to the scroll event
window.onscroll = handleScroll;

// Call the function once immediately to set the sticky-nav class correctly
handleScroll();
window.addEventListener('load', function () {
    loadMoreButtons.forEach(button => {
        const productContainer = event.target.closest('.product-cards-cont');
        const hiddenCards = productContainer.querySelectorAll('.hidden-prod');
        if (hiddenCards.length === 0) {
            button.style.display = 'none';
        }
    });
});

function handleLoadMoreClick(event) {
    const productContainer = event.target.closest('.product-cards-cont');
    const hiddenCards = productContainer.querySelectorAll('.hidden-prod');
    for (let i = 0; i < Math.min(hiddenCards.length, 3); i++) {
        hiddenCards[i].classList.add('shownCards');
        hiddenCards[i].classList.remove('hidden-prod');
    }

    if (productContainer.querySelectorAll('.hidden-prod').length === 0) {
        event.target.style.display = 'none';
    }
}

loadMoreButtons.forEach(button => {
    button.addEventListener('click', handleLoadMoreClick);
});
