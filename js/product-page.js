"use strict"
import {initAllProducts, allProducts} from './product-arrays.js';
import {translations} from "./translations-arrays.js";
import {addLanguagePrefixToLinks, searchChecker} from "./translation-manager.js";

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

let colorDivs = [];
let currentImageIndex = 0;
let allImages = [];
let initialPrimaryImageSrc = '';

function loadProductPage() {
    return new Promise((resolve, reject) => {
        try {
            const {languageId} = searchChecker();
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

            const translatedDressType = clothTranslations[product.dressType];
            const translatedAvailableSizes = clothTranslations["available-sizes"];
            const translatedAvailableColors = clothTranslations["available-colors"];
            const translatedDescriptionLabel = clothTranslations["description"];
            const translatedDetailsLabel = clothTranslations["details"];
            const translatedExtraLabel = clothTranslations["extra"];
            const translatedOrderBtn = clothTranslations["order-btn"];

            orderProdBtn.textContent = translatedOrderBtn.toUpperCase();

            document.querySelector("[href='#popis']").textContent = translatedDescriptionLabel.toUpperCase();
            document.querySelector("[href='#podrobnosti']").textContent = translatedDetailsLabel.toUpperCase();
            document.querySelector("[href='#dodanie']").textContent = translatedExtraLabel.toUpperCase();
            document.querySelector('.product-name p').textContent = translatedDressType;
            document.querySelector('.product-name h4').textContent = product.name;
            document.querySelector('.price p').textContent = `${product.price} €`;
            document.querySelector('#popis').innerHTML = `<p>${product.description[languageId]}</p>`;

            const detailsList = document.querySelector('#podrobnosti ul');
            detailsList.innerHTML = product.details[languageId]
                .split('!')
                .map(detail => `<li>${detail}</li>`)
                .join('');

            document.querySelector('#dodanie p').textContent = product.extra[languageId];

            document.querySelector(".color-name-mobile p").textContent = translatedAvailableColors;

            const colorsList = document.querySelector('.color-group');
            colorsList.innerHTML = product.colors
                .map(color => {
                    const translatedColor = productColorTranslations[color] || color;
                    return `<div class="color">
                    <div class="color-name">
                      <span>${translatedColor}</span>
                    </div>
                    <div class="color-circle">
                      <span class="color-${color}"></span>
                    </div>
                  </div>`;
                })
                .join('');
            colorsList.firstChild.classList.add("active");

            const primaryImage = `<img src="${product.primaryImage}" class="img-fluid active" alt="">`;
            primaryImageContainer.innerHTML = primaryImage;
            initialPrimaryImageSrc = product.primaryImage;

            document.querySelector(".container-sizes h4").textContent = translatedAvailableSizes;
            additionalImagesContainer.innerHTML = product.secondaryImages
                .map(img => `<div class="additional-image"><img src="${img}" loading="lazy" class="img-fluid secondary" alt=""></div>`)
                .join('');

            const sizesList = document.querySelector('.container-sizes ul');
            sizesList.innerHTML = product.sizes
                .map(size => `<li><p>${size}</p></li>`)
                .join('');

            resolve();
            moveImagesToContainer();
        } catch (error) {
            reject(error);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initAllProducts()
        .then(() => {
            loadProductPage()
                .then(() => {
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
        })
        .catch(err => {
            console.error(err);
        });
});

function initializeCarousel() {
    const additionalImages = Array.from(document.querySelectorAll('img.secondary'));
    const additionalImageSources = additionalImages.map(img => img.src);
    allImages = [initialPrimaryImageSrc, ...additionalImageSources].map(src => {
        if (src) {
            const img = new Image();
            img.src = src;
            return img;
        }
        return null;
    }).filter(Boolean);
    if (allImages.length === 0) {
        console.error("No images available for the carousel.");
        return;
    }
    createCarouselDots();
    setupCarouselDots();
    adjustCarouselDotsPosition();
}

function moveImagesToContainer() {
    if (isMobile) {
        additionalImagesContainer.querySelectorAll("img").forEach((img) => {
            primaryImageContainer.appendChild(img);
        });
        primaryImageContainer.querySelectorAll(".secondary").forEach((secondaryImage) => {
            secondaryImage.classList.add('hidden');
        });
    }
}

function createCarouselDots() {
    carouselDotsContainer.innerHTML = '';
    allImages.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.dataset.index = index;
        carouselDotsContainer.appendChild(dot);
    });
    carouselDotsContainer.firstChild.classList.add('active');
}

function setupCarouselDots() {
    const carouselDots = carouselDotsContainer.querySelectorAll('span');
    const productImages = Array.from(primaryImageContainer.querySelectorAll('img'));
    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (!productImages[index]) {
                console.error(`Image at index ${index} is not found.`);
                return;
            }
            carouselDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            productImages.forEach(img => {
                img.classList.remove('active');
                img.classList.add('hidden');
            });
            productImages[index].classList.remove('hidden');
        });
    });
}

function setupAdditionalImagesClick() {
    additionalImagesContainer.addEventListener('click', event => {
        const productImage = document.querySelector('.product-image img');
        const clickedImage = event.target.closest('img');
        if (clickedImage) {
            const clickedContainer = clickedImage.closest("div");
            clickedContainer.appendChild(productImage);
            primaryImageContainer.appendChild(clickedImage);
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    });
}

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

if (colorGroup) {
    const colorNodes = colorGroup.querySelectorAll('.color');
    if (colorNodes.length > 0) {
        colorDivs = Array.from(colorNodes);
    }
} else {
    console.log('colorGroup is null');
}

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

window.addEventListener('resize', updateColorsVisibility);

function adjustCarouselDotsPosition() {
    if (!primaryImageContainer || !carouselDotsContainer) return;
    const carouselRect = primaryImageContainer.getBoundingClientRect();
    const calculatedRight = Math.max(-carouselRect.width * 0.18, -50);
    carouselDotsContainer.style.right = `${calculatedRight}px`;
}

window.addEventListener('load', adjustCarouselDotsPosition);
window.addEventListener('resize', adjustCarouselDotsPosition);

function toggleMobileView() {
    if (window.innerWidth <= 440) {
        orderProductButton.classList.toggle('active');
        secondaryInfoBlock.classList.toggle('active');
        prodDescr.classList.toggle('active');
        primaryImageContainer.classList.toggle('kill-margin');
        updateColorsVisibility();
        const chevronImg = chevronButton.querySelector('img');
        const currentRotation = chevronImg.style.transform;
        chevronImg.style.transform = currentRotation === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
    }
}

chevronButton.addEventListener('click', toggleMobileView);

function adjustTabsForMobile() {
    if (isMobile) {
        tabContent.forEach(content => {
            content.classList.add('active', 'show');
        });
        const tabContentWrapper = document.createElement('div');
        tabContentWrapper.classList.add('tab-content-wrapper');
        tabLinks.forEach((link, index) => {
            const listItem = link.parentNode;
            const content = tabContent[index];
            const itemWrapper = document.createElement('div');
            itemWrapper.classList.add('item-wrapper');
            itemWrapper.appendChild(listItem);
            itemWrapper.appendChild(content);
            tabContentWrapper.appendChild(itemWrapper);
        });
        const tabContainer = document.querySelector('.three-tabs');
        tabContainer.appendChild(tabContentWrapper);
        tabLinks.forEach(link => {
            link.href = '';
        });
    }
}

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

mobChevronButton.addEventListener('click', handleMobileChevronClick);
addLanguagePrefixToLinks();
