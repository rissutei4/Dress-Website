 function activateColor() {
        const colors = document.querySelector('.colors');

        colors.addEventListener('click', (event) => {
            const colorCircle = event.target.closest('.color-circle');
            if (colorCircle) {
                const color = colorCircle.parentNode;
                const activeColor = colors.querySelector('.color.active');
                activeColor.classList.remove('active');
                color.classList.add('active');
            }
        });
    }

    activateColor();

    const productImage = document.querySelector('.product-image img');
    const additionalImages = document.querySelectorAll('.additional-images img');

// Store the initial product image source
    const initialProductImageSrc = productImage.src;

// Create a new function to reset the product image source to the initial value
    function resetProductImage() {
        productImage.src = initialProductImageSrc;
    }

    const carouselDotsContainer = document.querySelector('.carousel-mobile-dots');
    let dotsHTML = '';
    for (let i = 0; i < additionalImages.length + 1; i++) {
        dotsHTML += '<span></span>';
    }
    carouselDotsContainer.innerHTML = dotsHTML;

    const carouselDots = document.querySelectorAll('.carousel-mobile-dots span');

    let currentImageIndex = 0;

    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentImageIndex = index;
            if (index === 0) {
                resetProductImage(); // Reset the product image to the initial source
            } else {
                productImage.src = additionalImages[index - 1].src;
            }
            carouselDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentImageIndex);
            });
        });
    });

    additionalImages.forEach(img => {
        img.addEventListener('click', (event) => {
            const clickedImageSrc = event.target.getAttribute('src');
            const mainImage = document.querySelector('.product-image img');
            const mainImageSrc = mainImage.getAttribute('src');
            mainImage.setAttribute('src', clickedImageSrc);
            event.target.setAttribute('src', mainImageSrc);

            window.scrollTo({
                top: 0, behavior: 'smooth'
            });
        });
    });

    carouselDots[currentImageIndex].classList.add('active');

// Get references to the necessary elements
    window.onload = function () {
        // Get references to the necessary elements
        const chevronButton = document.querySelector('.mobile-chevron');
        const orderProductButton = document.querySelector('.orderProductButton');
        const secondaryInfoBlock = document.querySelector('.secondary-information-block');
        const prodDescr = document.querySelector('.product-description');

        // Add a click event listener to the chevron button
        chevronButton.addEventListener('click', () => {
            if (window.innerWidth <= 440) {
                // Toggle the active class on the orderProduct button and secondary information block
                orderProductButton.classList.toggle('active');
                secondaryInfoBlock.classList.toggle('active');
                prodDescr.classList.toggle('active');

                // Rotate the chevron button 180 degrees
                const chevronImg = chevronButton.querySelector('img');
                chevronImg.style.transform = `rotate(${chevronImg.style.transform === 'rotate(180deg)' ? '0deg' : '180deg'})`;
            }
        });
    };

    const tabLinks = document.querySelectorAll('.nav-link');
    const tabContent = document.querySelectorAll('.tab-pane');

    const isMobile = window.innerWidth <= 426; // Check if screen resolution is 440px or less

    if (isMobile) {
        tabContent.forEach((content) => {
            content.classList.add('active', 'show'); // add active and show classes to all tab-panes
        });
        tabLinks.forEach((link, index) => {
            link.addEventListener('click', () => {
                if (isMobile) {
                    tabContent.forEach((content) => {
                        content.classList.remove('active', 'show'); // remove active and show classes from all tab-panes
                    });
                }

                // show the clicked tab content
                tabContent[index].classList.add('active', 'show');
            });
        });

        // wrap each li and its corresponding content in a container
        const tabContentWrapper = document.createElement('div');
        tabContentWrapper.classList.add('tab-content-wrapper');

        tabLinks.forEach((link, index) => {
            const listItem = link.parentNode;
            const content = tabContent[index];

            // create a container for the list item and content
            const itemWrapper = document.createElement('div');
            itemWrapper.classList.add('item-wrapper');

            // append the list item and content to the container
            itemWrapper.appendChild(listItem);
            itemWrapper.appendChild(content);

            // append the container to the wrapper
            tabContentWrapper.appendChild(itemWrapper);
        });

        // insert the wrapper into the DOM
        const tabContainer = document.querySelector('.three-tabs');
        tabContainer.appendChild(tabContentWrapper);
    }