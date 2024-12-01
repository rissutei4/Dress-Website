"use strict"

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
    const card = document.createElement('div');
    card.classList.add('col-lg-4', 'col-md-6', 'col-6');
    card.innerHTML = `
            <a href="product-page.html?id=${product.id}">
                <div class="product-card">
                    <div class="product-image">
                        <img src="${product.primaryImage}" class="img-fluid" alt="${product.name}">
                    </div>
                    <div class="product-overlay">
                        <div class="product-heading">
                            <p>Svadobné šaty</p>
                            <h4>${product.name}</h4>
                        </div>
                        <div class="price-sizes-container container">
                            <div class="row flex-md-row flex-row align-items-md-center align-items-flex-start">
                                <div class="col-xl-4 col-md-5 col-6 d-flex">
                                    <div class="right-side">
                                        <div class="price">
                                            <p>${product.price} €</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-8 col-md-7 col-6 divider">
                                    <div class="sizes">
                                        <h4>Dostupné veľkosti:</h4>
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

//Wedding
const wedding1 = new Dress('Shitknows What', 950, [36, 38, 40, 42, 44, 43, 49], ["gold", "yellow", "white", "blue"], "some realllllllllllllllllllllllllllly looong yaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaapp session", "Even bigger yapp sessiossssssssssssssssssssn!Big Big", "yap yap", 43, "../images/products/prod-pic-1.png", ["../images/products/productCard2.png", "../images/products/productCard3.png"], "wedding-dress");
const wedding2 = new Dress('Shitknows What2', 90, [36, 38, 40, 42, 44, 43, 49], ["gold", "yellow", "white", "blue"], "some realllllllllllllllllllllllllllly looong yaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaapp session", "Even bigger yapp session!Big Big!", "yap yap", 43, "../images/products/prod-pic-1.png", ["../images/products/prod-pic-2.png", "../images/products/prod-pic-3.png"], "wedding-dress");
const wedding3 = new Dress('My Bride', 190, [36, 38, 40, 42, 44, 43, 49], ["gold", "yellow", "white", "blue"], "some" +
    " realllllllllllllllllllllllllllly looong yaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaapp session", "Even bigger" +
    " yapp session!Big Big!", "yap yap", 409, "../images/products/prod-pic-1.png", ["../images/products/prod-pic-2.png", "../images/products/prod-pic-3.png"], "wedding-dress");

//Evening

//Kid

//Suits

//Accessories


const weddingDresses = [wedding1, wedding2, wedding3];
const eveningDresses = [];
const kidDresses = [];
const womenSuits = [];
const accessories = [];

export {Dress, weddingDresses}