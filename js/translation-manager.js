"use strict"
import {translations} from "./translations-arrays.js";
//--------------------------
//INDEX PAGE FIELDS
//--------------------------
function checkPageAndChangeContent() {
    const {pageName, languageId} = searchChecker();
    const matchingPageKey = Object.keys(translations).find(key => key === pageName);
    const matchingPage = translations[matchingPageKey] || translations['index'];
    const currentLanguage = matchingPage[languageId];

    if (matchingPage && currentLanguage) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const attributeOfTheElement = element.getAttribute("data-translate");
            if (currentLanguage[attributeOfTheElement]) {
                if (element.tagName.toLowerCase() === 'input' && element.hasAttribute('placeholder')) {
                    // Change the placeholder for input elements
                    element.setAttribute('placeholder', currentLanguage[attributeOfTheElement]);
                } else {
                    // Change the text content for other elements
                    element.textContent = currentLanguage[attributeOfTheElement];
                }
            }
        });
        if (pageName === "index") {
            const listContainer = document.querySelector(".extra-text"); // Target the container
            if (listContainer) {
                listContainer.innerHTML = ""; // Clear any previous content

                // Access the localized description list
                const descriptionLists = currentLanguage.extra?.descriptionLists;

                if (descriptionLists && Array.isArray(descriptionLists)) {
                    descriptionLists.forEach(item => {
                        const listItem = document.createElement("li");
                        listItem.innerHTML = item; // Preserve HTML tags like <span>
                        listContainer.appendChild(listItem);
                    });
                }
            }
        }
        const headerTranslations = translations.header?.[languageId];
        if (headerTranslations) {
            document.querySelectorAll('.header-nav-bar [data-translate]').forEach(element => {
                const attributeOfTheElement = element.getAttribute("data-translate");
                if (headerTranslations[attributeOfTheElement]) {
                    if (element.tagName.toLowerCase() === 'input' && element.hasAttribute('placeholder')) {
                        element.setAttribute('placeholder', headerTranslations[attributeOfTheElement]);
                    } else {
                        element.textContent = headerTranslations[attributeOfTheElement];
                    }
                }
            });
        }
    }
}

function searchChecker() {
    const urlParams = new URLSearchParams(window.location.search);
    let languageId = urlParams.get('lang');

    if (!languageId) {
        console.log("No language ID found in URL.");
        languageId = "eng";
    }
    const path = window.location.pathname; // Get the file path, e.g., /Dress-website/index.html
    const fileName = path.split('/').pop(); // Extract the file name, e.g., index.html
    const pageName = fileName.split('.').slice(0, -1).join('.'); // Remove .html

    return {pageName, languageId};
}

function addLanguagePrefixToLinks() {
    const {languageId} = searchChecker();
    const linksToPrefix = document.querySelectorAll("[data-lang-link]");
    linksToPrefix.forEach(link => {
        const currentHref = link.href;
        if (!currentHref.includes("lang=")) {
            link.href = currentHref + (currentHref.includes('?') ? '&' : '?') + "lang=" + languageId;
        }
    });
}

export {checkPageAndChangeContent, searchChecker, addLanguagePrefixToLinks};
