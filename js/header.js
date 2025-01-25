"use strict";
//Language Button
import {languageId, initTranslations, checkPageAndChangeContent, addLanguagePrefixToLinks} from "./translation-manager.js";
//Language Switcher
const langSwitcherbtn = document.querySelector('.langbtn');
const dropdownContent = document.querySelector('.sub-menu');
const dropdownLinks = document.querySelectorAll('.sub-menu li');

//Header show on click
const burgerIcon = document.querySelector('.burgerIcon');
const menuItemsWrapper = document.querySelector('.menu-container-wrapper');
const headerParent = document.querySelector('header');
const headerNavBar = document.querySelector('.header-nav-bar');
const body = document.querySelector('body');
const burgerLines = burgerIcon.querySelectorAll(".line");

export function isMobileResolution() {
    return window.innerWidth < 440; // Dynamically check viewport size
}

if (isMobileResolution()) {
    headerParent.appendChild(menuItemsWrapper);
}
export function toggleMenu() {
    if(isMobileResolution()) {
        body.classList.toggle("open-menu-container");
        headerNavBar.classList.remove('sticky-nav');
    }
    dropdownContent.classList.remove("language-show")
    menuItemsWrapper.classList.toggle("open-menu-container");
    headerParent.classList.toggle("open-menu-container");
    headerNavBar.classList.toggle("bg-opacity-change");
    burgerLines.forEach(line => {
        line.classList.toggle("open-menu-container");
    });
}

burgerIcon.addEventListener('click', toggleMenu);

function handleScroll() {
    if (window.scrollY > 1) {
        headerNavBar.classList.add('sticky-nav');
        if(isMobileResolution()) {
            headerParent.classList.add('sticky-nav');
        }

    } else {
        headerNavBar.classList.remove('sticky-nav');
        headerParent.classList.remove('sticky-nav');
    }
}

// Attach the function to the scroll event
window.addEventListener('scroll', handleScroll);

// Call the function once immediately to set the sticky-nav class correctly
handleScroll();

const languageSwitcher = function () {
    // Set initial button text to the currently active language
    let languageSwitchId = languageId
    if (!languageSwitchId) {
        const setLanguage = Array.from(dropdownLinks).find(li => li.textContent.trim() === "ENG");
        if (setLanguage) {
            setLanguage.classList.add('active');
            langSwitcherbtn.textContent = setLanguage.textContent;
        }
    } else {
        languageSwitchId = languageSwitchId.toUpperCase();
        const currentLanguage = Array.from(dropdownLinks).find(li => li.textContent.trim() === languageSwitchId);
        currentLanguage.classList.add("active");
        langSwitcherbtn.textContent = currentLanguage.textContent;
    }
    // Toggle the dropdown menu when the button is clicked, but the menu on mobile is not opened
    langSwitcherbtn.addEventListener('click', (event) => {
        // Allow toggling only if the menu is not open on mobile
        if (!(isMobileResolution() && menuItemsWrapper.classList.contains('open-menu-container'))) {
            dropdownContent.classList.toggle('language-show');
            event.stopPropagation(); // Prevent click from bubbling
        }
    });
    // Close the dropdown when clicking outside of it
    document.addEventListener('click', () => {
        dropdownContent.classList.remove('show');
    });
}

languageSwitcher();
await initTranslations();
addLanguagePrefixToLinks();
checkPageAndChangeContent();