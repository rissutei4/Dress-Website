'use strict'
//Mobile Filters
const filterBlock = document.querySelector('.filters-mobile');
const filterButton = document.querySelector('.filtersClick');
const filterDropdownContent = document.querySelector('.filters-mobile-cont');
const liItem = document.querySelectorAll('.filters-mobile-cont > li');


if (window.innerWidth <= 426) {
    filterButton.addEventListener('click', () => {
        filterBlock.classList.toggle('show-mobile');
        filterButton.classList.toggle('show-mobile');
        filterDropdownContent.classList.toggle('show-mobile');
    });

    const filterOptions = document.querySelectorAll('.filters-mobile-cont button');
    filterOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedFilter = option;
            filterButton.querySelector('span').textContent = option.textContent.trim();

            filterBlock.classList.remove('show-mobile');
            filterButton.classList.remove('show-mobile');
            filterDropdownContent.classList.remove('show-mobile');
            liItem.forEach(item => {
                if (item.querySelector('button').dataset.filter === selectedFilter) {
                    item.classList.add('d-none');
                } else {
                    item.classList.remove('d-none');
                }
            });
        });
    });
}