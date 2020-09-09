import './menu-catalog.less';

import PerfectScrollbar from "perfect-scrollbar";
import { isPhone, isTablet, isDesktop } from '../../modules/user_agent_detect.js';
import CallbackTools from '../../modules/callback_tools.js';


export default class MenuCatalog extends CallbackTools
{
    constructor() {
        super();
        this.container = $('.js-btn-catalog');
        this.btnToggleMenu = this.container;
        this.menuContainer = $('.js-menu-catalog', this.container);
        this.menuItems = $('.js-menu-catalog-item', this.container);
        this.menuLinks = $('.js-link', this.menuContainer);
        this.submenuLists = $('.js-submenu-catalog-list', this.container);
        this.menuWrapper = $('.js-menu__scroll', this.container);
        this.btnCloseSubmenu = $('.js-btn-close-submenu', this.container);
        this.overlayElem = $('<div>', {
            class: 'overlay-menu-catalog js-overlay-menu-catalog'
        });

        /**
         * Инициализация скроллбара
         * eslint-disable-next-line
         */
        this.ps = new PerfectScrollbar('.js-menu__scroll', {
            wheelSpeed: 0.5,
            wheelPropagation: false,
            suppressScrollX: true
        });

        /** Для планшетов меняем вид подменю */
        if (isTablet()) {
            this.setViewSubmenusToTablet(this.container);
        }

        this.initEventHandlers();
    }

    //TODO При интеграции, функционал функции реализовать на backend
    /**
     * Функция меняет отображение подменю для планшетов
     * @param $menuContainer
     */
    setViewSubmenusToTablet($menuContainer) {
        let $submenus = $menuContainer.find('.js-submenu-catalog-list'),
            $arrowsCloseSubmenu = $menuContainer.find('.js-btn-close-submenu');

        $submenus.addClass('tablet');
        $arrowsCloseSubmenu.addClass('tablet');
    }

    showOverlay() {
        $('body')
            .append(this.overlayElem)
            .addClass('body-overflow-menu-catalog');
    }

    hideOverlay() {
        const $overlayElem = $('.js-overlay-menu-catalog');

        if (!$overlayElem.length) {
            return;
        }

        $overlayElem.remove();
        $('body').removeClass('body-overflow-menu-catalog');
    }

    openMenu() {
        this.btnToggleMenu.addClass('opened');
        this.menuContainer.removeClass('hidden');

        //Пересчитываем меню после отображения
        this.ps.update();

        //Прокручиваем меню к началу
        this.menuWrapper.scrollTop(0);

        if (isPhone()) {
            this.showOverlay();
        }

        this.executeCallbackList('afterOpen');
    }

    closeMenu() {
        this.btnToggleMenu.removeClass('opened');
        this.menuContainer.addClass('hidden');
        this.hideOverlay();

        this.executeCallbackList('afterClose');
    }

    /** Открытие/закрытие меню */
    toggleMenuCatalog() {
        if (this.btnToggleMenu.hasClass('opened')) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    /**
     * Закрытие всех подменю и снятие всех ховеров с пунктов меню
     */
    closeAllItems() {
        this.submenuLists.addClass('hidden');
        if (this.menuLinks.hasClass('hovered')) {
            this.menuLinks.removeClass('hovered');
        }
        if (this.menuLinks.hasClass('js-opened')) {
            this.menuLinks.removeClass('js-opened');
        }
        this.menuWrapper.removeClass('full');
    }

    /**
     * Проверяем наличие подменю, если есть, то возвращаем его, если нет, то false
     * @param $currentItem
     * @returns {boolean}
     */
    getSubMenu($currentItem ) {
        let $submenu = $currentItem.find('.js-submenu-catalog-list');

        return !($submenu.length === 0) ? $submenu : false;
    }

    initEventHandlers() {
        // Убираем прокрутку страницы при свайпе меню для iPhone
        this.container.on('touchmove', function(e) {
            e.preventDefault();
            e.stopPropagation();
        });

        // Останавливаем всплытие, чтобы click не поднимался до кнопки js-btn-catalog
        this.menuContainer.on('click', function(e) {
            e.stopPropagation();
        });

        this.btnToggleMenu
            .on('mouseenter', () => {
                if (isDesktop()) {
                    this.openMenu();
                }
            })
            .on('mouseleave', () => {
                if (isDesktop()) {
                    this.closeMenu();
                    this.closeAllItems();
                }
            })
            .on('click', (e) => {
                if (!isDesktop()) {
                    e.stopPropagation();
                    this.closeAllItems();
                    this.toggleMenuCatalog();
                }
            });

        this.menuItems
            .on('mouseenter', (event) => {
                if (isDesktop()) {
                    $(event.currentTarget).children('.js-link').addClass('hovered');

                    let $submenu = this.getSubMenu($(event.currentTarget));

                    if (!$submenu) return;

                    this.menuWrapper.addClass('full');
                    $submenu.removeClass('hidden');
                }
            })
            .on('mouseleave', (event) => {
                if (isDesktop()) {
                    $(event.currentTarget).children('.js-link').removeClass('hovered');

                    let $submenu = this.getSubMenu($(event.currentTarget));

                    if (!$submenu) return;

                    this.menuWrapper.removeClass('full');
                    $submenu.addClass('hidden');
                }
            })
            .on('click', (event) => {
                if (!isDesktop()) {
                    event.stopPropagation();

                    let $submenu = this.getSubMenu($(event.currentTarget));

                    // Превентим переход по ссылке если пункт не открыт
                    if ($submenu && $submenu.hasClass('hidden')) {
                        event.preventDefault();
                    }

                    let $curLink = $(event.currentTarget).children('.js-link'),
                        $curBtnClose = $(event.currentTarget).find('.js-btn-close-submenu');

                    this.closeAllItems();

                    $curBtnClose.removeClass('hidden');
                    $submenu.removeClass('hidden');
                    $curLink
                        .addClass('js-opened')
                        .addClass('hovered');
                }
            });

        this.btnCloseSubmenu
            .on('click', (event) => {
                event.stopPropagation();
                event.preventDefault();

                let $curSubMenu = this.getSubMenu($(event.currentTarget).closest('.js-menu-catalog-item')),
                    $cunLink = $(event.currentTarget).closest('.js-link');

                if (!$curSubMenu.hasClass('hidden')) {
                    $curSubMenu.addClass('hidden');
                }

                $cunLink.removeClass('js-opened');
                $(event.currentTarget).addClass('hidden');
            });

        $(window).on('resize orientationchange', () => {
            this.ps.update();
            if (isDesktop()) {
                this.hideOverlay();
            }
        });

        $(document)
            //при клике по документу сворачиваем меню
            .on('click touchend', () => {
                if(this.btnToggleMenu.hasClass('opened')) {
                    this.toggleMenuCatalog();
                }
            })
            //при клике на элементы вложенного меню останавливаем всплытие, чтобы меню не сворачивалось
            .on('click touchend', '.js-btn-catalog', function(e) {
                e.stopPropagation();
            });
    }
}