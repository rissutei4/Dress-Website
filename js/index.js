"use strict";
import {Dress, weddingDresses} from "./product-arrays.js";
import {checkPageAndChangeContent, addLanguagePrefixToLinks} from "./translation-manager.js";

checkPageAndChangeContent()
//Load More
const loadMoreButtons = document.querySelectorAll('.load-more');
//Loading Dress inside the product cards
weddingDresses.forEach(dress => {
    dress.placeCardInCategory(dress);
})

loadMoreButtons.forEach(button => {
    button.addEventListener('click', event => {
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

addLanguagePrefixToLinks()