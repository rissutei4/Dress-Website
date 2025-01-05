"use strict"
// ====================================================
// Main Constants and DOM Elements
// ====================================================
//Imports
import {allProducts} from './product-arrays.js';
import {translations} from "./translations-arrays.js";
import {addLanguagePrefixToLinks, searchChecker} from "./translation-manager.js";

// Main DOM elements
const colors = document.querySelector('.colors');
const colorGroup = document.querySelector('.color-group');
const primaryImageContainer = document.querySelector('.product-image');
const additionalImagesContainer = document.querySelector('.block-of-images');
const carouselDotsContainer = document.querySelector('.carousel-mobile-dots');
const chevronButton = document.querySelector('.mobile-chevron');
const orderProductButton = document.querySelector('.orderProductButton');
const secondaryInfoBlock = document.querySelector('.secondary-information-block');
const prodDescr = document.querySelector('.product-description');
const tabLinks = document.querySelectorAll('.three-tabs .nav-link');
const tabContent = document.querySelectorAll('.three-tabs .tab-content .tab-pane');
const mobChevronButton = document.querySelector('.mob-chevron-button');
const secondaryBlock = document.querySelector('.secondary-information-block');
const orderProdBtn = document.querySelector('.order-btn');
const isMobile = window.innerWidth <= 432;

// Variables
let colorDivs = []; // Array to hold color divs
let currentImageIndex = 0; // Index to track current image in carousel
let allImages = []; // Array to hold all images including primary and additional images
let initialPrimaryImageSrc = '';
// ====================================================
// Filling the page with info from array
// ====================================================
async function loadProductPage() {
    return new Promise((resolve, reject) => {
        try {
            // Your logic to load the product page
            const {languageId} = searchChecker(); // Get the current language
            const clothTranslations = translations.productsTranslations[languageId];
            const productColorTranslations = clothTranslations.colors;

            const urlParams = new URLSearchParams(window.location.search);
            const productId = parseInt(urlParams.get('id'));

            if (!productId) {
                console.error("No product ID found in URL.");
                reject("No product ID found.");
                return;
            }

            const product = allProducts.find(p => p.id === productId);

            if (!product) {
                console.error(`Product with ID ${productId} not found.`);
                reject("Product not found.");
                return;
            }

            //Labels
            const translatedDressType = clothTranslations[product.dressType];
            const translatedAvailableSizes = clothTranslations["available-sizes"];
            const translatedAvailableColors = clothTranslations["available-colors"];
            const translatedDescriptionLabel = clothTranslations["description"];
            const translatedDetailsLabel = clothTranslations["details"];
            const translatedExtraLabel = clothTranslations["extra"];
            const translatedOrderBtn = clothTranslations["order-btn"];

            // 3. Dynamically update the page content

            orderProdBtn.textContent = translatedOrderBtn.toUpperCase();

            document.querySelector("[href='#popis']").textContent = translatedDescriptionLabel.toUpperCase();
            document.querySelector("[href='#podrobnosti']").textContent = translatedDetailsLabel.toUpperCase();
            document.querySelector("[href='#dodanie']").textContent = translatedExtraLabel.toUpperCase();
            // Update product name
            document.querySelector('.product-name p').textContent = translatedDressType;
            document.querySelector('.product-name h4').textContent = product.name;

            // Update product price
            document.querySelector('.price p').textContent = `${product.price} €`;

            // Update product description
            console.log(languageId)
            document.querySelector('#popis').innerHTML = `<p>${product.description[languageId]}</p>`;

            // Update product details
            const detailsList = document.querySelector('#podrobnosti ul');
            detailsList.innerHTML = product.details
                .split('!')
                .map(detail => `<li>${detail}</li>`)
                .join('');

            document.querySelector('#dodanie p').textContent = product.extra;

            // Update colors
            document.querySelector(".color-name-mobile p").textContent = translatedAvailableColors;

            const colorsList = document.querySelector('.color-group');
            colorsList.innerHTML = product.colors
                .map(color => {
                    const translatedColor = productColorTranslations[color]
                    return `<div class="color">
                    <div class="color-name">
                        <span>${translatedColor}</span>
                    </div>
                    <div class="color-circle">
                        <span class="color-${color}"></span>
                    </div>
                </div>`;
                }).join('');
            colorsList.firstChild.classList.add("active");

            // Update primary image
            const primaryImage = `<img src="${product.primaryImage}" class="img-fluid active" alt="">`;
            primaryImageContainer.innerHTML = primaryImage;
            initialPrimaryImageSrc = product.primaryImage;

            // Update additional images
            document.querySelector(".container-sizes h4").textContent = translatedAvailableSizes;
            additionalImagesContainer.innerHTML = product.secondaryImages
                .map(img => `<div class="additional-image"><img src="${img}" loading="lazy" class="img-fluid secondary" alt=""></div>`)
                .join('');

            // Update available sizes
            const sizesList = document.querySelector('.container-sizes ul');
            sizesList.innerHTML = product.sizes
                .map(size => `<li><p>${size}</p></li>`)
                .join('');
            resolve();

            moveImagesToContainer();
        } catch (error) {
            reject(error); // Handle unexpected errors
        }
    })
}

document.addEventListener('DOMContentLoaded', () => {
    loadProductPage()
        .then(() => {
            // Actions that depend on the loaded product page
            setupAdditionalImagesClick();
            initializeCarousel();
            activateColor();
            adjustCarouselDotsPosition();
            adjustTabsForMobile();
            updateColorsVisibility();
        })
        .catch(error => {
            console.error("Error loading product page:", error);
        });
});

// ====================================================
// Carousel Functionality
// ====================================================
function initializeCarousel() {
    // Dynamically fetch primary and additional images
    const additionalImages = Array.from(document.querySelectorAll('img.secondary'));
    const additionalImageSources = additionalImages.map(img => img.src);

    // Preload all images (primary + additional)
    allImages = [initialPrimaryImageSrc, ...additionalImageSources].map(src => {
        if (src) { // Ensure src is valid
            const img = new Image();
            img.src = src;
            return img; // Preloaded Image object
        }
        return null; // Fallback for invalid sources
    }).filter(Boolean); // Remove null values

    if (allImages.length === 0) {
        console.error("No images available for the carousel.");
        return;
    }

    // Create carousel dots
    createCarouselDots();

    // Setup dot click events
    setupCarouselDots();

    // Adjust dots position
    adjustCarouselDotsPosition();
}

/**
 * Creates carousel dots based on the number of images.
 */

function moveImagesToContainer() {
    if (isMobile) {
        additionalImagesContainer.querySelectorAll("img").forEach((img) => {
            primaryImageContainer.appendChild(img);
        })
        primaryImageContainer.querySelectorAll(".secondary").forEach((secondaryImage) => {
            secondaryImage.classList.add('hidden');
        })
    }
}

function createCarouselDots() {
    // Clear existing dots
    carouselDotsContainer.innerHTML = '';

    // Create dot for each image
    allImages.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.dataset.index = index;
        carouselDotsContainer.appendChild(dot);
    });

    // Set first dot as active
    carouselDotsContainer.firstChild.classList.add('active');

    console.log(allImages)
}

/**
 * Sets up event listeners for carousel dots to update images.
 */
function setupCarouselDots() {
    const carouselDots = carouselDotsContainer.querySelectorAll('span');
    const productImages = Array.from(primaryImageContainer.querySelectorAll('img'));

    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (!productImages[index]) {
                console.error(`Image at index ${index} is not found.`);
                return;
            }

            // Update active dot
            carouselDots.forEach(d => d.classList.remove('active'))
            dot.classList.add('active');

            // Update active image
            productImages.forEach(img => {
                img.classList.remove('active');
                img.classList.add('hidden')
            })
            productImages[index].classList.remove('hidden');
        });
    });
}

//=========================
// Handles click events on additional images to swap with the main image.
//=========================
function setupAdditionalImagesClick() {
    additionalImagesContainer.addEventListener('click', event => {
        const productImage = document.querySelector('.product-image img');
        const clickedImage = event.target.closest('img');
        if (clickedImage) {
            console.log(clickedImage.closest("div"));
            const clickedContainer = clickedImage.closest("div");
            clickedContainer.appendChild(productImage);
            primaryImageContainer.appendChild(clickedImage);
            // Scroll to top smoothly
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    });
}


// ====================================================
// Color Selection Functionality
// ====================================================
function activateColor() {
    if (colors) {
        colors.addEventListener('click', event => {
            const colorCircle = event.target.closest('.color-circle');
            if (colorCircle) {
                const color = colorCircle.parentNode;
                const activeColor = colors.querySelector('.color.active');
                if (activeColor) {
                    activeColor.classList.remove('active');
                }
                color.classList.add('active');
            }
        });
    }
}

// Initialize colorDivs from colorGroup
if (colorGroup) {
    const colorNodes = colorGroup.querySelectorAll('.color');
    if (colorNodes.length > 0) {
        colorDivs = Array.from(colorNodes);
    } else {
        console.log('No color nodes found.');
    }
} else {
    console.log('colorGroup is null');
}

/**
 * Updates the visibility of color options based on screen width.
 */
function updateColorsVisibility() {
    if (window.innerWidth <= 432) {
        colorDivs.forEach((div, index) => {
            if (index >= 6) {
                div.style.display = secondaryInfoBlock.classList.contains('active') ? 'block' : 'none';
            }
        });
    } else {
        colorDivs.forEach(div => {
            div.style.display = 'block';
        });
    }
}

// Update on window resize
window.addEventListener('resize', updateColorsVisibility);

/**
 * Adjusts the position of carousel dots based on the carousel size.
 */
function adjustCarouselDotsPosition() {
    if (!primaryImageContainer || !carouselDotsContainer) return;

    const carouselRect = primaryImageContainer.getBoundingClientRect();
    // Adjust right position of dots based on carousel width
    const calculatedRight = Math.max(-carouselRect.width * 0.18, -50); // Adjust multiplier or set a min value

    carouselDotsContainer.style.right = `${calculatedRight}px`;
}

// Run adjustment on load and resize
window.addEventListener('load', adjustCarouselDotsPosition);
window.addEventListener('resize', adjustCarouselDotsPosition);

// ====================================================
// Mobile View Functionality
// ====================================================
function toggleMobileView() {
    if (window.innerWidth <= 440) {
        // Toggle active classes
        orderProductButton.classList.toggle('active');
        secondaryInfoBlock.classList.toggle('active');
        prodDescr.classList.toggle('active');
        primaryImageContainer.classList.toggle('kill-margin');

        // Update colors visibility
        updateColorsVisibility();

        // Rotate chevron image
        const chevronImg = chevronButton.querySelector('img');
        const currentRotation = chevronImg.style.transform;
        chevronImg.style.transform = currentRotation === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
    }
}

// Event listener for chevron button click
chevronButton.addEventListener('click', toggleMobileView);

/**
 * Adjusts tabs for mobile devices by stacking content and removing unnecessary links.
 */
function adjustTabsForMobile() {
    if (isMobile) {
        tabContent.forEach(content => {
            content.classList.add('active', 'show');
        });

        // Create tab content wrapper
        const tabContentWrapper = document.createElement('div');
        tabContentWrapper.classList.add('tab-content-wrapper');

        tabLinks.forEach((link, index) => {
            const listItem = link.parentNode;
            const content = tabContent[index];

            // Create item wrapper
            const itemWrapper = document.createElement('div');
            itemWrapper.classList.add('item-wrapper');

            // Append list item and content to item wrapper
            itemWrapper.appendChild(listItem);
            itemWrapper.appendChild(content);

            // Append item wrapper to tab content wrapper
            tabContentWrapper.appendChild(itemWrapper);
        });

        // Append tab content wrapper to DOM
        const tabContainer = document.querySelector('.three-tabs');
        tabContainer.appendChild(tabContentWrapper);

        // Remove href attribute from tab links
        tabLinks.forEach(link => {
            link.href = '';
        });
    }
}


/**
 * Adjusts the product image size and visibility when the mobile chevron button is clicked.
 */
function handleMobileChevronClick() {
    if (secondaryBlock.classList.contains('active')) {
        primaryImageContainer.style.overflow = 'hidden';
        primaryImageContainer.style.height = '470px';
    } else {
        primaryImageContainer.style.marginBottom = '94px';
        primaryImageContainer.style.overflow = 'auto';
        primaryImageContainer.style.height = 'auto';
    }
}

// Event listener for mobile chevron button
mobChevronButton.addEventListener('click', handleMobileChevronClick);
addLanguagePrefixToLinks()