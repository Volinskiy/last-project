import './menu-sections-mobile.less';

import Scrollbar from 'smooth-scrollbar';
import CallbackTools from '../../modules/callback_tools.js';

export default class MenuSectionsMobile extends CallbackTools
{
    constructor() {
        super();
        this.btnToggleMenu = $('.js-btn-menu-sections-mobile');
        this.menuSectionsMobile = $('.js-menu-sections-mobile');
        this.overlayElem = $('<div>', {
            class: 'overlay-menu-sections js-overlay-menu-sections'
        });

        this.menuScrollbar = Scrollbar.init(
            $('.js-menu-sections-mobile-scroll-box')[0],
            {
                alwaysShowTracks: true,
                continuousScrolling: false
            }
        );

        this.initEventHandlers();
    }

    showOverlay() {
        $('body')
            .append(this.overlayElem)
            .addClass('body-overflow-menu-sections');

    }

    hideOverlay() {
        const $overlayElem = $('.js-overlay-menu-sections');

        if (!$overlayElem.length) {
            return;
        }

        $overlayElem.remove();
        $('body').removeClass('body-overflow-menu-sections');
    }

    openMenu() {
        this.btnToggleMenu.addClass('opened');
        this.menuSectionsMobile.removeClass('hidden');
        this.showOverlay();

        //Пересчитываем меню после отображения
        this.menuScrollbar.update();

        //Прокручиваем меню к началу
        this.menuScrollbar.scrollTop = 0;

        this.executeCallbackList('afterOpen');
    }

    closeMenu() {
        this.btnToggleMenu.removeClass('opened');
        this.menuSectionsMobile.addClass('hidden');

        this.hideOverlay();

        this.executeCallbackList('afterClose');
    }

    toggleMenuSections() {
        if (this.btnToggleMenu.hasClass('opened')) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    initEventHandlers() {
        this.btnToggleMenu.on('click', () => {
            this.toggleMenuSections();
        });

        $(window).on('resize orientationchange', () => {
            this.menuScrollbar.update();
        });

        $(document)
        //при клике по документу сворачиваем меню
            .on('click touchend', () => {
                if(this.btnToggleMenu.hasClass('opened')) {
                    this.toggleMenuSections();
                }
            })
            //при клике на элементы вложенного меню останавливаем всплытие, чтобы меню не сворачивалось
            .on('click touchend', '.js-btn-menu-sections-mobile', function(e) {
                e.stopPropagation();
            })
            .on('click touchend', '.js-menu-sections-mobile', function(e) {
                e.stopPropagation();
            })
            //При клики на overlay останавливаем всплытие, чтобы избежать преключение видимости фиксированной панели на стр product_card.php
            .on('click touchend', '.js-overlay', function(e) {
                e.stopPropagation();
            });
    }
}