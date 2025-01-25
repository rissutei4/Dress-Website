"use strict";
import {initAllProducts, allProducts} from "./product-arrays.js";
import {initTranslations, checkPageAndChangeContent, addLanguagePrefixToLinks} from "./translation-manager.js";
import {toggleMenu, isMobileResolution} from "./header.js";

const MAX_VISIBLE_CARDS = 6;
const categoriesSection = document.querySelector(".ItemsInStock");
const filterButton = document.querySelector('.filtersClick span');
const liItemCategoriesFilter = document.querySelectorAll('.filters-mobile-cont > li');
const categoriesIds = ["wedding-dress", "evening-dress", "childrens-dress", "women-suit", "accessories"];
const loadMoreProductsBtn = `
<div class="loadMoreButton d-flex justify-content-center">
   <button class="load-more" data-translate="load-more-button"></button>
</div>`;

/*-- LOADING OF THE PAGE*/
//Load the product cards to corresponding dress categories.
(async function main() {
    await initAllProducts();
    allProducts.forEach(product => {
        product.placeCardInCategory(product);
    });
    createLoadBtn();
    await initTranslations();
    addLanguagePrefixToLinks();
    checkPageAndChangeContent();
})();

/* -- LOAD MORE BTN -- */

//Create load more btn
function createLoadBtn() {
    categoriesIds.forEach(id => {
        const currentCategory = document.getElementById(id);
        const currentCategoryRow = currentCategory.querySelector(".row");
        const productCards = currentCategoryRow.querySelectorAll(".product-card");

        //If there's more than the specified number add a load more btn
        if (productCards.length > MAX_VISIBLE_CARDS) {
            productCards.forEach((card, index) => {
                if (index >= MAX_VISIBLE_CARDS) card.classList.add("hide-card");
            });
            currentCategoryRow.insertAdjacentHTML("afterend", loadMoreProductsBtn);
        }
    })
}

// Function to handle "Load More" button clicks
function handleLoadMoreClick(event) {
    const button = event.target;
    const productContainer = button.closest('.product-cards-cont') || button.previousElementSibling;
    const hiddenCards = productContainer.querySelectorAll(".hide-card");

    // Show a maximum of 3 hidden cards
    hiddenCards.forEach((card, index) => {
        if (index < 3) {
            card.classList.remove("hide-card");
            card.classList.add("shownCards");
        }
    });

    // Hide the button if no more hidden cards are left
    if (productContainer.querySelectorAll(".hide-card").length === 0) {
        button.style.display = "none";
    }
}

// Attach event listeners to all "Load More" buttons
document.addEventListener("click", event => {
    if (event.target.classList.contains("load-more")) {
        handleLoadMoreClick(event);
    }
});

/*HEADER CLICK*/
// Event listener for clicks on nav links
document.querySelectorAll('.nav-list-container a').forEach(navLink => {
    navLink.addEventListener('click', event => {
        const href = navLink.getAttribute('href');
        const match = href.match(/.*(#.*-tab).*/);
        const targetIdWithTab = match ? match[1] : null;

        if (!targetIdWithTab) {
            // Redirect if no valid tab ID is found
            console.error(`Invalid tab ID in href: ${href}`);
            return (window.location.href = href);
        }

        event.preventDefault();

        const targetId = targetIdWithTab.replace('-tab', '');
        const targetElement = document.querySelector(targetId);

        if (!targetElement) {
            console.error(`Element not found for ID: ${targetId}`);
            return;
        }

        // Update active state for mobile nav links
        document.querySelectorAll('.filters-mobile-cont .nav-link')
            .forEach(link => link.classList.remove('active'));
        const categoryTab = document.querySelector(`[data-target="${targetId}"]`);
        if (categoryTab) {
            categoryTab.classList.add('active');
            if (isMobileResolution()) {
                filterButton.textContent = categoryTab.textContent;
                liItemCategoriesFilter.forEach(li => li.classList.remove('d-none'));
                categoryTab.closest('li')?.classList.add('d-none');
            }
        }

        // Update active state for tab contents
        document.querySelectorAll('.tab-content .tab-pane')
            .forEach(content => content.classList.remove('active', 'show'));
        targetElement.classList.add('active', 'show');

        // Scroll to categories section
        const offset = isMobileResolution() ? 970 : 320;
        const targetPosition = categoriesSection.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({top: targetPosition, behavior: 'smooth'});

        toggleMenu();
    });
});
