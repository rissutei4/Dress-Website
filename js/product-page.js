// ====================================================
// Main Constants and DOM Elements
// ====================================================

// Main DOM elements
const colors = document.querySelector('.colors');
const colorGroup = document.querySelector('.color-group');
const productImage = document.querySelector('.product-image img');
const additionalImages = document.querySelectorAll('.additional-images img');
const carouselDotsContainer = document.querySelector('.carousel-mobile-dots');
const chevronButton = document.querySelector('.mobile-chevron');
const orderProductButton = document.querySelector('.orderProductButton');
const secondaryInfoBlock = document.querySelector('.secondary-information-block');
const prodDescr = document.querySelector('.product-description');
const tabLinks = document.querySelectorAll('.three-tabs .nav-link');
const tabContent = document.querySelectorAll('.three-tabs .tab-content .tab-pane');
const mobChevronButton = document.querySelector('.mob-chevron-button');
const secondaryBlock = document.querySelector('.secondary-information-block');
const productImgReal = document.querySelector('.product-image');
const imageContainer = document.querySelector('.product-image');

// Variables
let colorDivs = []; // Array to hold color divs
const initialProductImageSrc = productImage ? productImage.src : ''; // Store initial product image source
let currentImageIndex = 0; // Index to track current image in carousel

// ====================================================
// Color Selection Functionality
// ====================================================

/**
 * Activates the selected color and updates the UI.
 */
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

// Initialize color activation
activateColor();

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

// Run once on page load
updateColorsVisibility();

// Update on window resize
window.addEventListener('resize', updateColorsVisibility);

// ====================================================
// Image Carousel Functionality
// ====================================================

/**
 * Preloads additional images for smoother transitions.
 */
function preloadImages() {
    additionalImages.forEach(img => {
        const newImage = new Image();
        newImage.src = img.src;
    });
}

// Preload images
preloadImages();

/**
 * Resets the main product image to its initial source.
 */
function resetProductImage() {
    productImage.src = initialProductImageSrc;
}

/**
 * Creates carousel dots based on the number of images.
 */
function createCarouselDots() {
    let dotsHTML = '';
    const totalDots = additionalImages.length + 1; // Include initial product image
    for (let i = 0; i < totalDots; i++) {
        dotsHTML += '<span></span>';
    }
    carouselDotsContainer.innerHTML = dotsHTML;
}

// Initialize carousel dots
createCarouselDots();

// Select the carousel dots
const carouselDots = document.querySelectorAll('.carousel-mobile-dots span');

/**
 * Updates the active dot in the carousel.
 */
function updateActiveDot() {
    carouselDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentImageIndex);
    });
}

/**
 * Sets up event listeners for carousel dots to update images.
 */
function setupCarouselDots() {
    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentImageIndex = index;
            if (index === 0) {
                resetProductImage();
            } else {
                productImage.src = additionalImages[index - 1].src;
            }
            updateActiveDot();
        });
    });
}

// Initialize carousel functionality
setupCarouselDots();
updateActiveDot(); // Set initial active dot

/**
 * Handles click events on additional images to swap with the main image.
 */
function setupAdditionalImagesClick() {
    additionalImages.forEach(img => {
        img.addEventListener('click', event => {
            const clickedImageSrc = event.target.getAttribute('src');
            const mainImageSrc = productImage.getAttribute('src');
            productImage.setAttribute('src', clickedImageSrc);
            event.target.setAttribute('src', mainImageSrc);

            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// Setup click events on additional images
setupAdditionalImagesClick();

/**
 * Adjusts the position of carousel dots based on the carousel size.
 */
function adjustCarouselDotsPosition() {
    if (!imageContainer || !carouselDotsContainer) return;

    const carouselRect = imageContainer.getBoundingClientRect();
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

/**
 * Toggles the visibility of product details and adjusts UI elements for mobile view.
 */
function toggleMobileView() {
    if (window.innerWidth <= 440) {
        // Toggle active classes
        orderProductButton.classList.toggle('active');
        secondaryInfoBlock.classList.toggle('active');
        prodDescr.classList.toggle('active');
        imageContainer.classList.toggle('kill-margin');

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
    const isMobile = window.innerWidth <= 432;
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

// Run adjustTabsForMobile on page load
adjustTabsForMobile();

/**
 * Adjusts the product image size and visibility when the mobile chevron button is clicked.
 */
function handleMobileChevronClick() {
    if (secondaryBlock.classList.contains('active')) {
        productImgReal.style.overflow = 'hidden';
        productImgReal.style.height = '470px';
    } else {
        productImgReal.style.marginBottom = '94px';
        productImgReal.style.overflow = 'auto';
        productImgReal.style.height = 'auto';
    }
}

// Event listener for mobile chevron button
mobChevronButton.addEventListener('click', handleMobileChevronClick);
