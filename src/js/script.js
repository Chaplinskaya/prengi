window.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger'),
          menu = document.querySelector('.promo-section__menu_block'),
          menuItem = document.querySelectorAll('.promo-section__menu_block-item');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('promo-section__menu_block_active');
    });
    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('promo-section__menu_block_active');
        });
    });

});