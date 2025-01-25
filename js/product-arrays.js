"use strict"
import {languageId, translations} from "./translation-manager.js";

let allProducts = [];

//File to include all the necessary information related to different products
class Product {
    constructor(name, price, sizes, colors, description, details, extra, id, primaryImage, secondaryImages) {
        this.name = name;
        this.price = price;
        this.sizes = sizes;
        this.colors = colors;
        this.description = description;
        this.details = details;
        this.extra = extra;
        this.id = id;
        this.primaryImage = primaryImage;
        this.secondaryImages = secondaryImages;
    }
}

class Dress extends Product {
    constructor(name, price, sizes, colors, description, details, extra, id, primaryImage, secondaryImages, dressType) {
        super(name, price, sizes, colors, description, details, extra, id, primaryImage, secondaryImages);
        this.dressType = dressType;
    }

    placeCardInCategory(product) {
        const categoryContainer = document.querySelector(`#${product.dressType} .product-cards-cont .row`);
        if (categoryContainer) {
            const productCard = createProductCard(product);
            categoryContainer.appendChild(productCard);
        } else {
            console.error(`Category container for ${product.dressType} not found.`);
        }
    }
}

function createProductCard(product) {
    const clothesTranslations = translations.productsTranslations[languageId];

    const translatedDressType = clothesTranslations[product.dressType];
    const translatedAvailableSizes = clothesTranslations["available-sizes"];

    const card = document.createElement('div');
    card.classList.add('col-lg-4', 'col-md-6', 'col-6', 'less-col-pd');
    card.innerHTML = `
            <a data-lang-link href="product-page.html?id=${product.id}">
                <div class="product-card">
                    <div class="product-image">
                        <img src="${product.primaryImage}" class="img-fluid" alt="${product.name}">
                    </div>
                    <div class="product-overlay">
                        <div class="product-heading">
                            <p>${translatedDressType}</p>
                            <h4>${product.name}</h4>
                        </div>
                        <div class="price-sizes-container container">
                            <div class="row flex-md-row flex-row align-items-md-center align-items-flex-start">
                                <div class="col-xl-4 col-md-5 col-6 d-flex less-col-pd">
                                    <div class="right-side">
                                        <div class="price">
                                            <p>${product.price} €</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-8 col-md-7 col-6 divider less-col-pd">
                                    <div class="sizes">
                                        <h4>${translatedAvailableSizes}</h4>
                                        <ul>
                                            ${product.sizes.map(size => `<li><p>${size}</p></li>`).join('')}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
    `;
    return card;
}

async function fetchProducts() {
    const response = await fetch("./data/products.json");
    const data = await response.json();
    return data;
}

// ======== 3) Convert a JSON item to a Dress instance ======== //
function convertJsonItemToDress(item) {
    return new Dress(item.name, item.price, item.sizes, item.colors, item.description, item.details, item.extra, item.id, item.mainImage, item.otherImages, item.dressType);
}

/**
 * 4) initAllProducts(): Load data from products.json once,
 *    convert to Dress instances, store in the allProducts array.
 *
 *    We export both "allProducts" (the array) and this function,
 *    so other scripts can call it and use the data.
 */
async function initAllProducts() {
    try {
        if (allProducts.length > 0) {
            return; // allProducts is already populated
        }

        const data = await fetchProducts();

        // Convert each category array
        const eveningDresses = data["evening"].map(convertJsonItemToDress);
        const weddingDresses = data["wedding"].map(convertJsonItemToDress);
        const childrenDresses = data["childrens-dress"].map(convertJsonItemToDress);
        const womenSuits = data["women-suits"].map(convertJsonItemToDress);
        const accessories = data["accessories"].map(convertJsonItemToDress);

        // Combine them
        allProducts = [...eveningDresses, ...weddingDresses, ...childrenDresses, ...womenSuits, ...accessories,];
    } catch (err) {
        console.error("Failed to load products.json:", err);
        // You can decide how to handle or re-throw
    }
}

export {initAllProducts, Product, Dress, allProducts};