"use strict"
import {translations} from "./translations-arrays.js";
import {searchChecker} from "./translation-manager.js";

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

//JUST INDEX, probably should move it to index.js
function createProductCard(product) {
    const {languageId} = searchChecker(); // Get the current language
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

//Wedding
const wedding1 = new Dress('Dress #1', 1500, [6, 8, 12, 14], ["gold"], {
    ukr: `Сукня для справжньої королеви. Саме таке перше враження спрявляє сукня «Miss Ukraine», і ми впевнені, що на вашому особливому святі ви не залишитесь без уваги. Вишуканий корсет, неймовірний блиск та красивий шлейф підкреслять всі ваші переваги.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new dress from scratch: 1 month", 43, "./images/products/wedding/dress1/photo_2025-01-03_02-17-23.jpg", ["./images/products/wedding/dress1/photo_2025-01-03_02-17-24.jpg"], "wedding-dress");

const wedding2 = new Dress('Dress #2', 470, [6, 8, 12, 14], ["white"], {
    ukr: `Сукня для справжньої королеви. Саме таке перше враження спрявляє сукня «Miss Ukraine», і ми впевнені, що на вашому особливому святі ви не залишитесь без уваги. Вишуканий корсет, неймовірний блиск та красивий шлейф підкреслять всі ваші переваги.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new dress from scratch: 1 month", 78, "./images/products/wedding/dress2/photo_2025-01-03_02-18-01.jpg", ["./images/products/wedding/dress2/photo_2025-01-03_02-18-03.jpg"], "wedding-dress");

const wedding3 = new Dress('Dress #3', 550, [6, 8, 12, 14], ["pink"], {
    ukr: `Сукня для справжньої королеви. Саме таке перше враження спрявляє сукня «Miss Ukraine», і ми впевнені, що на вашому особливому святі ви не залишитесь без уваги. Вишуканий корсет, неймовірний блиск та красивий шлейф підкреслять всі ваші переваги.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new dress from scratch: 1 month", 121, "./images/products/wedding/dress3/photo_2025-01-03_02-18-10.jpg", ["./images/products/wedding/dress3/photo_2025-01-03_02-18-11.jpg"], "wedding-dress");

const wedding4 = new Dress('Dress #4', 700, [6, 8, 12, 14], ["red"], {
    ukr: `Сукня для справжньої королеви. Саме таке перше враження спрявляє сукня «Miss Ukraine», і ми впевнені, що на вашому особливому святі ви не залишитесь без уваги. Вишуканий корсет, неймовірний блиск та красивий шлейф підкреслять всі ваші переваги.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new dress from scratch: 1 month", 342, "./images/products/wedding/dress4/photo_2025-01-03_02-18-14.jpg", ["./images/products/wedding/dress4/photo_2025-01-03_02-18-15.jpg", "./images/products/wedding/dress4/photo_2025-01-03_02-18-17.jpg"], "wedding-dress");

const wedding5 = new Dress('Dress #5', 430, [6, 8, 12, 14], ["blue"], {
    ukr: `Сукня для справжньої королеви. Саме таке перше враження спрявляє сукня «Miss Ukraine», і ми впевнені, що на вашому особливому святі ви не залишитесь без уваги. Вишуканий корсет, неймовірний блиск та красивий шлейф підкреслять всі ваші переваги.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new dress from scratch: 1 month", 567, "./images/products/wedding/dress5/photo_2025-01-03_02-18-20.jpg", [], "wedding-dress");

const wedding6 = new Dress('Dress #6', 890, [6, 8, 12, 14], ["green"], {
    ukr: `Сукня для справжньої королеви. Саме таке перше враження спрявляє сукня «Miss Ukraine», і ми впевнені, що на вашому особливому святі ви не залишитесь без уваги. Вишуканий корсет, неймовірний блиск та красивий шлейф підкреслять всі ваші переваги.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new dress from scratch: 1 month", 231, "./images/products/wedding/dress6/photo_2025-01-03_02-18-22.jpg", ["./images/products/wedding/dress6/photo_2025-01-03_02-18-24.jpg"], "wedding-dress");

const wedding7 = new Dress('Dress #7', 600, [6, 8, 12, 14], ["purple"], {
    ukr: `Сукня для справжньої королеви. Саме таке перше враження спрявляє сукня «Miss Ukraine», і ми впевнені, що на вашому особливому святі ви не залишитесь без уваги. Вишуканий корсет, неймовірний блиск та красивий шлейф підкреслять всі ваші переваги.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new dress from scratch: 1 month", 899, "./images/products/wedding/dress7/photo_2025-01-03_02-18-26.jpg", ["./images/products/wedding/dress7/photo_2025-01-03_02-18-28.jpg"], "wedding-dress");

const wedding8 = new Dress('Dress #8', 750, [6, 8, 12, 14], ["gold"], {
    ukr: `Сукня для справжньої королеви. Саме таке перше враження спрявляє сукня «Miss Ukraine», і ми впевнені, що на вашому особливому святі ви не залишитесь без уваги. Вишуканий корсет, неймовірний блиск та красивий шлейф підкреслять всі ваші переваги.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new dress from scratch: 1 month", 432, "./images/products/wedding/dress8/photo_2025-01-03_02-18-31.jpg", ["./images/products/wedding/dress8/photo_2025-01-03_02-18-32.jpg"], "wedding-dress");

const wedding9 = new Dress('Dress #9', 920, [6, 8, 12, 14], ["silver"], {
    ukr: `Сукня для справжньої королеви. Саме таке перше враження спрявляє сукня «Miss Ukraine», і ми впевнені, що на вашому особливому святі ви не залишитесь без уваги. Вишуканий корсет, неймовірний блиск та красивий шлейф підкреслять всі ваші переваги.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new dress from scratch: 1 month", 301, "./images/products/wedding/dress9/photo_2025-01-03_02-18-35.jpg", ["./images/products/wedding/dress9/photo_2025-01-03_02-18-36.jpg"], "wedding-dress");

const wedding10 = new Dress('Dress #10', 650, [6, 8, 12, 14], ["black"], {
    ukr: `Сукня для справжньої королеви. Саме таке перше враження спрявляє сукня «Miss Ukraine», і ми впевнені, що на вашому особливому святі ви не залишитесь без уваги. Вишуканий корсет, неймовірний блиск та красивий шлейф підкреслять всі ваші переваги.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new dress from scratch: 1 month", 762, "./images/products/wedding/dress10/photo_2025-01-03_02-18-39.jpg", ["./images/products/wedding/dress10/photo_2025-01-03_02-18-40.jpg"], "wedding-dress");

const wedding11 = new Dress('Dress #11', 870, [6, 8, 12, 14], ["white"], {
    ukr: `Сукня для справжньої королеви. Саме таке перше враження спрявляє сукня «Miss Ukraine», і ми впевнені, що на вашому особливому святі ви не залишитесь без уваги. Вишуканий корсет, неймовірний блиск та красивий шлейф підкреслять всі ваші переваги.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new dress from scratch: 1 month", 580, "./images/products/wedding/dress11/photo_2025-01-03_02-18-43.jpg", ["./images/products/wedding/dress11/photo_2025-01-03_02-18-44.jpg"], "wedding-dress");

//Evening
const evening1 = new Dress('Evening Dress #1', 400, [36, 38, 40, 42, 44, 46, 50], ["red", "white", "blue"], {
    ukr: `Сукня для справжньої королеви. Саме таке перше враження спрявляє сукня «Miss Ukraine», і ми впевнені, що на вашому особливому святі ви не залишитесь без уваги. Вишуканий корсет, неймовірний блиск та красивий шлейф підкреслять всі ваші переваги.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new dress from scratch: 1 month", 584, "./images/products/evening/dress1/photo_2025-01-03_23-16-39.jpg", ["./images/products/evening/dress1/photo_2025-01-03_23-16-40.jpg"], "evening-dress");

const evening2 = new Dress('Evening Dress #2', 400, [36, 38, 40, 42, 44, 46, 50], ["red", "white", "blue"], {
    ukr: `Сукня для справжньої королеви. Саме таке перше враження спрявляє сукня «Miss Ukraine», і ми впевнені, що на вашому особливому святі ви не залишитесь без уваги. Вишуканий корсет, неймовірний блиск та красивий шлейф підкреслять всі ваші переваги.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new dress from scratch: 1 month", 234, "./images/products/evening/dress2/photo_2025-01-03_23-16-42.jpg", ["./images/products/evening/dress2/photo_2025-01-03_23-16-43.jpg"], "evening-dress");

const evening3 = new Dress('Evening Dress #3', 400, [36, 38, 40, 42, 44, 46, 50], ["red", "white", "blue"], {
    ukr: `Сукня для справжньої королеви. Саме таке перше враження спрявляє сукня «Miss Ukraine», і ми впевнені, що на вашому особливому святі ви не залишитесь без уваги. Вишуканий корсет, неймовірний блиск та красивий шлейф підкреслять всі ваші переваги.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new dress from scratch: 1 month", 345, "./images/products/evening/dress3/photo_2025-01-03_23-16-45.jpg", ["./images/products/evening/dress3/photo_2025-01-03_23-16-46.jpg"], "evening-dress");

const evening4 = new Dress('Evening Dress #4', 400, [36, 38, 40, 42, 44, 46, 50], ["red", "white", "blue"], {
    ukr: `Сукня для справжньої королеви. Саме таке перше враження спрявляє сукня «Miss Ukraine», і ми впевнені, що на вашому особливому святі ви не залишитесь без уваги. Вишуканий корсет, неймовірний блиск та красивий шлейф підкреслять всі ваші переваги.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new dress from scratch: 1 month", 456, "./images/products/evening/dress4/photo_2025-01-03_23-16-48.jpg", ["./images/products/evening/dress4/photo_2025-01-03_23-16-49.jpg"], "evening-dress");

const evening5 = new Dress('Evening Dress #5', 400, [36, 38, 40, 42, 44, 46, 50], ["red", "white", "blue"], {
    ukr: `Сукня для справжньої королеви. Саме таке перше враження спрявляє сукня «Miss Ukraine», і ми впевнені, що на вашому особливому святі ви не залишитесь без уваги. Вишуканий корсет, неймовірний блиск та красивий шлейф підкреслять всі ваші переваги.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new dress from scratch: 1 month", 564, "./images/products/evening/dress5/photo_2025-01-03_23-16-50.jpg", ["./images/products/evening/dress5/photo_2025-01-03_23-16-51.jpg"], "evening-dress");

const evening6 = new Dress('Evening Dress #6', 400, [36, 38, 40, 42, 44, 46, 50], ["red", "white", "blue"], {
    ukr: `Сукня для справжньої королеви. Саме таке перше враження спрявляє сукня «Miss Ukraine», і ми впевнені, що на вашому особливому святі ви не залишитесь без уваги. Вишуканий корсет, неймовірний блиск та красивий шлейф підкреслять всі ваші переваги.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new dress from scratch: 1 month", 678, "./images/products/evening/dress6/photo_2025-01-03_23-16-51.jpg", ["./images/products/evening/dress6/photo_2025-01-03_23-16-54.jpg"], "evening-dress");

//Kid
const kDress1 = new Dress('Girl Dress #1', 320, [36, 38, 40, 42, 44, 46, 50], ["white", "blue"], {
    ukr: `Сукня для справжньої королеви. Саме таке перше враження спрявляє сукня «Miss Ukraine», і ми впевнені, що на вашому особливому святі ви не залишитесь без уваги. Вишуканий корсет, неймовірний блиск та красивий шлейф підкреслять всі ваші переваги.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new dress from scratch: 1 month", 19384, "./images/products/children-dress/dress1/photo_2025-01-03_02-28-56.jpg", ["./images/products/children-dress/dress1/photo_2025-01-03_02-28-58.jpg"], "childrens-dress");

const kDress2 = new Dress('Girl Dress #2', 320, [36, 38, 40, 42, 44, 46, 50], ["white", "blue"], {
    ukr: `Сукня для справжньої королеви. Саме таке перше враження спрявляє сукня «Miss Ukraine», і ми впевнені, що на вашому особливому святі ви не залишитесь без уваги. Вишуканий корсет, неймовірний блиск та красивий шлейф підкреслять всі ваші переваги.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new dress from scratch: 1 month", 78412, "./images/products/children-dress/dress2/photo_2025-01-03_02-29-00.jpg", ["./images/products/children-dress/dress2/photo_2025-01-03_02-29-02.jpg"], "childrens-dress");

const kDress3 = new Dress('Girl Dress #3', 320, [36, 38, 40, 42, 44, 46, 50], ["white", "blue"], {
    ukr: `Сукня для справжньої королеви. Саме таке перше враження спрявляє сукня «Miss Ukraine», і ми впевнені, що на вашому особливому святі ви не залишитесь без уваги. Вишуканий корсет, неймовірний блиск та красивий шлейф підкреслять всі ваші переваги.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new dress from scratch: 1 month", 42967, "./images/products/children-dress/dress3/photo_2025-01-03_02-29-04.jpg", [], "childrens-dress");

const kDress4 = new Dress('Girl Dress #4', 320, [36, 38, 40, 42, 44, 46, 50], ["white", "blue"], {
    ukr: `Сукня для справжньої королеви. Саме таке перше враження спрявляє сукня «Miss Ukraine», і ми впевнені, що на вашому особливому святі ви не залишитесь без уваги. Вишуканий корсет, неймовірний блиск та красивий шлейф підкреслять всі ваші переваги.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new dress from scratch: 1 month", 98234, "./images/products/children-dress/dress4/photo_2025-01-03_02-29-05.jpg", [], "childrens-dress");

//Suits
const suit1 = new Dress('Women Suit #1', 500, [36, 38, 40, 42, 44, 46, 50], ["black", "white"], {
    ukr: `Жіночий костюм для справжньої леді. Стильний та вишуканий, він створить незабутнє враження.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new suit from scratch: 1 month", 87234, "./images/products/women-suit/dress1/photo_2025-01-03_02-35-52.jpg", ["./images/products/women-suit/dress1/photo_2025-01-03_02-35-54.jpg"], "women-suit");

const suit2 = new Dress('Women Suit #2', 520, [36, 38, 40, 42, 44, 46, 50], ["blue", "white"], {
    ukr: `Жіночий костюм для справжньої леді. Стильний та вишуканий, він створить незабутнє враження.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new suit from scratch: 1 month", 39214, "./images/products/women-suit/dress2/photo_2025-01-03_02-35-56.jpg", ["./images/products/women-suit/dress2/photo_2025-01-03_02-35-57.jpg"], "women-suit");

const suit3 = new Dress('Women Suit #3', 480, [36, 38, 40, 42, 44, 46, 50], ["grey", "black"], {
    ukr: `Жіночий костюм для справжньої леді. Стильний та вишуканий, він створить незабутнє враження.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new suit from scratch: 1 month", 72818, "./images/products/women-suit/dress3/photo_2025-01-03_02-36-00.jpg", [], "women-suit");

const suit4 = new Dress('Women Suit #4', 550, [36, 38, 40, 42, 44, 46, 50], ["red", "black"], {
    ukr: `Жіночий костюм для справжньої леді. Стильний та вишуканий, він створить незабутнє враження.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new suit from scratch: 1 month", 23498, "./images/products/women-suit/dress4/photo_2025-01-03_02-36-02.jpg", [], "women-suit");

const suit5 = new Dress('Women Suit #5', 600, [36, 38, 40, 42, 44, 46, 50], ["blue", "white"], {
    ukr: `Жіночий костюм для справжньої леді. Стильний та вишуканий, він створить незабутнє враження.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new suit from scratch: 1 month", 98147, "./images/products/women-suit/dress5/photo_2025-01-03_02-36-04.jpg", [], "women-suit");

const suit6 = new Dress('Women Suit #6', 580, [36, 38, 40, 42, 44, 46, 50], ["green", "white"], {
    ukr: `Жіночий костюм для справжньої леді. Стильний та вишуканий, він створить незабутнє враження.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new suit from scratch: 1 month", 39475, "./images/products/women-suit/dress6/photo_2025-01-03_02-36-05.jpg", ["./images/products/women-suit/dress6/photo_2025-01-03_02-36-06.jpg"], "women-suit");

const suit7 = new Dress('Women Suit #7', 620, [36, 38, 40, 42, 44, 46, 50], ["pink", "white"], {
    ukr: `Жіночий костюм для справжньої леді. Стильний та вишуканий, він створить незабутнє враження.`,
}, "Materials used:!cotton 100%", "Estimated waiting time, if making this new suit from scratch: 1 month", 84719, "./images/products/women-suit/dress7/photo_2025-01-03_02-36-08.jpg", ["./images/products/women-suit/dress7/photo_2025-01-03_02-36-09.jpg"], "women-suit");

//Accessories
const accessory1 = new Dress('Accessory #1', 150, [], ["gold"], {
    ukr: `Аксесуар, що додасть вашому образу неповторного шарму та вишуканості. Ідеально підходить для будь-якого особливого випадку.`,
}, "Materials used:!metal 100%", "Estimated waiting time, if making this new accessory from scratch: 2 weeks", 91823, "./images/products/accessories/accessory1/photo12.png", [], "accessories");


const weddingDresses = [wedding1, wedding2, wedding3, wedding4, wedding5, wedding6, wedding7, wedding8, wedding9, wedding10, wedding11];

const eveningDresses = [evening1, evening2, evening3, evening4, evening5, evening6];
const kidDresses = [kDress1, kDress2, kDress3, kDress4];
const womenSuits = [suit1, suit2, suit3, suit4, suit5, suit6, suit7];
const accessories = [accessory1];

const allProducts = [...weddingDresses, ...eveningDresses, ...kidDresses, ...womenSuits, ...accessories];

export {Dress, allProducts}