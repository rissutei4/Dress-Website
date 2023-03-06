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