"use strict";
export let { pageName, languageId } = searchChecker();
export let translations = {};

export async function initTranslations() {
    try {
        const response = await fetch("./data/page-translations.json");
        if (!response.ok) {
            throw new Error("Failed to fetch translations JSON.");
        }
        translations = await response.json();
        return translations;
    } catch (err) {
        console.error(err);
    }
}

export function checkPageAndChangeContent() {
    const matchingPageKey = Object.keys(translations).find(key => key === pageName);
    const matchingPage = matchingPageKey ? translations[matchingPageKey] : translations["index"];
    const currentLanguage = matchingPage?.[languageId];

    if (!matchingPage) {
        console.error(`No page data found for "${pageName}". Using "index" as fallback.`);
        return;
    }

    if (!currentLanguage) {
        console.error(`No "${languageId}" translations found for page "${pageName}".`);
        return;
    }

    document.querySelectorAll("[data-translate]").forEach(element => {
        const attributeOfTheElement = element.getAttribute("data-translate");
        const textValue = currentLanguage[attributeOfTheElement];
        if (textValue) {
            if (element.tagName.toLowerCase() === "input" && element.hasAttribute("placeholder")) {
                element.setAttribute("placeholder", textValue);
            } else {
                element.textContent = textValue;
            }
        }
    });

    if (pageName === "index") {
        const listContainer = document.querySelector(".extra-text");
        if (listContainer) {
            listContainer.innerHTML = "";
            const descriptionLists = currentLanguage.extra?.descriptionLists;
            if (descriptionLists && Array.isArray(descriptionLists)) {
                descriptionLists.forEach(item => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = item;
                    listContainer.appendChild(listItem);
                });
            }
        }
    }

    const headerTranslations = translations.header?.[languageId];
    if (headerTranslations) {
        document.querySelectorAll(".header-nav-bar [data-translate]").forEach(element => {
            const attr = element.getAttribute("data-translate");
            const headerValue = headerTranslations[attr];
            if (headerValue) {
                if (element.tagName.toLowerCase() === "input" && element.hasAttribute("placeholder")) {
                    element.setAttribute("placeholder", headerValue);
                } else {
                    element.textContent = headerValue;
                }
            }
        });
    }
}

export function searchChecker() {
    let urlParams = new URLSearchParams(window.location.search);
    let languageId = urlParams.get("lang");

    if (!languageId && window.location.hash.includes("?lang=")) {
        const hashParams = new URLSearchParams(window.location.hash.split("?")[1]);
        languageId = hashParams.get("lang");
    }
    if (!languageId) {
        console.log("No language ID found in URL, defaulting to 'eng'.");
        languageId = "eng";
    }

    const path = window.location.pathname;
    const fileName = path.split("/").pop();
    const pageName = fileName.split(".").slice(0, -1).join(".");

    return { pageName, languageId };
}


export function addLanguagePrefixToLinks() {
    const linksToPrefix = document.querySelectorAll("[data-lang-link]");
    linksToPrefix.forEach(link => {
        const currentHref = link.href;
        if (!currentHref.includes("lang=")) {
            link.href = currentHref + (currentHref.includes("?") ? "&" : "?") + "lang=" + languageId;
        }
    });
}