//Mobile Filters
if (window.innerWidth <= 426) {
    const filterBlock = document.querySelector('.filters-mobile');
    const filterButton = document.querySelector('.filtersClick');
    const filterDropdownContent = document.querySelector('.filters-mobile-cont');
    const liItem = document.querySelectorAll('.filters-mobile-cont > li');
    const filterOptions = document.querySelectorAll('.filters-mobile-cont button');

    filterButton.addEventListener('click', () => {
        filterBlock.classList.toggle('show-mobile');
        filterButton.classList.toggle('show-mobile');
        filterDropdownContent.classList.toggle('show-mobile');
    });

    filterOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedFilter = option.dataset.filter;
            filterButton.querySelector('span').textContent = selectedFilter;
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

    const filterMobileCont = document.querySelector('.filters-mobile-cont');
    filterOptions.forEach(option => {
        option.addEventListener('click', () => {
            filterMobileCont.style.bottom = '-274px';
        });
    });
}