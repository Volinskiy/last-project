import MenuCatalog from '../menu-catalog/menu-catalog';
import MenuCategories from '../menu-categories/menu-categories';
import MenuSections from '../sections-nav/sections-nav';
import MenuSectionsMenuMobile from '../menu-sections-mobile/menu-sections-mobile';
import HMiddleRow from '../h-middle-row/h-middle-row';
import HeaderHelper from './header_helper';
import { isPhone } from '../../modules/user_agent_detect.js';

$(window).on('load', function() {

    let menuCatalog = new MenuCatalog(),
        menuCategories = new MenuCategories(),
        menuSections = new MenuSections(),
        menuSectionsMobile = new MenuSectionsMenuMobile(),
        hMiddleRow = new HMiddleRow(),
        headerManager = new HeaderHelper();

    /** Фиксированная панель с ценой товара на странице карточки товара */
    const productCardDescriptionFixed = $('.js-product-card-description-fixed');

    /** Фиксированная панель сценой товара на странице корзина */
    const cartDescriptionFixed = $('.js-cart-bar');

    /**
     * Обновляем слайдеры на стр. product_card.php на мобильных размерах
     * чтобы учесть пропадающий скроллбар страницы
     */
    function updateSliders() {
        let productCardThumbsSlider = document.querySelector('.js-product-info-slider-thumbs'),
            productCardSlider = document.querySelector('.js-product-info-slider-top');

        if (isPhone() && productCardThumbsSlider && productCardSlider) {
            document.querySelector('.js-product-info-slider-thumbs').swiper.update();
            document.querySelector('.js-product-info-slider-top').swiper.update();
        }
    }

    /**
     * Скрытие/показ фиксированной панели с ценой товара на страницах
     * product_card.php и cart.php на мобильных разменрах
     * @param $panel
     * @param action
     */
    function toggleFixedPanel($panel, action) {
        if (!$panel.length || !isPhone()) {
            return;
        }

        switch (action) {
            case 'show':
                $panel.removeClass('hidden');
                break;

            case 'hide':
                $panel.addClass('hidden');
                break;
        }
    }

    /**
     * callbackList для header_helper
     */
    headerManager.addCallback('afterUnFixPanel', () => {
        menuSections.updateNav();
    });

    /**
     * callbackList для меню каталога
     */
    menuCatalog.addCallback('afterOpen', () => {
        menuSections.closeMenu();
        menuSectionsMobile.closeMenu();
        menuCategories.closeMenu();
        toggleFixedPanel(productCardDescriptionFixed, 'hide');
        toggleFixedPanel(cartDescriptionFixed, 'hide');
        updateSliders();
    });

    menuCatalog.addCallback('afterClose', () => {
        toggleFixedPanel(productCardDescriptionFixed, 'show');
        toggleFixedPanel(cartDescriptionFixed, 'show');
        updateSliders();
    });

    /**
     * callbackList для меню категорий
     */
    menuCategories.addCallback('afterOpen', () => {
        menuSections.closeMenu();
        menuCatalog.closeMenu();
    });

    /**
     * callbackList для меню секций
     */
    menuSections.addCallback('afterOpen', () => {
        menuCatalog.closeMenu();
        menuCategories.closeMenu();
        hMiddleRow.closeFormSearch();
    });

    /**
     * callbackList мобильного меню секций
     */
    menuSectionsMobile.addCallback('afterOpen', () => {
        menuCatalog.closeMenu();
        hMiddleRow.closeFormSearch();
        toggleFixedPanel(productCardDescriptionFixed, 'hide');
        toggleFixedPanel(cartDescriptionFixed, 'hide');
        updateSliders();
    });

    menuSectionsMobile.addCallback('afterClose', () => {
        toggleFixedPanel(productCardDescriptionFixed, 'show');
        toggleFixedPanel(cartDescriptionFixed, 'show');
        updateSliders();
    });

    /**
     * callbackList для блока с формой поиска в header
     */
    hMiddleRow.addCallback('afterSearchOpen', () => {
        menuSections.closeMenu();
        menuSectionsMobile.closeMenu();
        menuCatalog.closeMenu();
    });

    hMiddleRow.addCallback('afterCursorInSearchString', () => {
        menuCategories.closeMenu();
    });
});