import './sections-nav.less';

import CallbackTools from '../../modules/callback_tools.js';
import {isDesktop} from "../../modules/user_agent_detect";

export default class MenuSections extends CallbackTools
{

    constructor() {
        super();
        this.sectionsNavPanel = $('.js-sections-nav');
        this.sectionsNavListHidden = $('.js-sections-nav-list-hidden', this.sectionsNavPanel);
        this.btnShowElse = $('.js-sections-nav-else', this.sectionsNavPanel);
        this.sectionsNavList = $('.js-sections-nav-list', this.sectionsNavPanel);

        this.updateNav();
        this.initEventHandlers();
    }

    closeMenu() {
        this.sectionsNavListHidden.removeClass('hidden');
        this.btnShowElse.removeClass('opened');
    }

    openMenu() {
        this.sectionsNavListHidden.addClass('hidden');
        this.btnShowElse.addClass('opened');

        this.executeCallbackList('afterOpen');
    }

    toggleMenu() {
        if(this.btnShowElse.hasClass('opened')){
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    //Код формирование/расформирования выпадающего меню кнопик Ещё

    /**
     * Возвращает ширину строки меню
     */
    getNavWidth() {
        let sectionsNavListWidth = 0;

        this.sectionsNavList.children('.js-nav-item').each((index, element) => {
            sectionsNavListWidth += $(element).outerWidth();
        });

        return sectionsNavListWidth;
    }

    /**
     * Скрывает последний элемент меню
     */
    hideLastMenuItem() {
        /* Переносим последний элемент в скрытый блок 'Еще' */
        this.sectionsNavList
            .children(':not(.js-sections-nav-else)')
            .last()
            .prependTo(this.sectionsNavListHidden);
    }

    /**
     * Показывает последний элемент меню
     */
    unHideLastMenuItem() {
        /* Переносим первый пункт меню из скрытого блока 'Еще' в конец строки */
        this.sectionsNavListHidden
            .children()
            .first()
            .appendTo(this.sectionsNavList);
    }

    getHiddenNavItem() {
        return this.sectionsNavListHidden.find('.js-nav-item').length;
    }

    showElseButton() {
        this.btnShowElse.removeClass('hidden');
        this.sectionsNavListHidden.removeClass('hidden');
    }

    hideElseButton() {
        if(this.getHiddenNavItem() > 0) {
            return
        }
        this.btnShowElse.addClass('hidden');
        this.sectionsNavListHidden.addClass('hidden');
    }

    updateNav(stop = false) {
        let sectionsNavListWidth = this.getNavWidth(),
            availableSpace = this.sectionsNavPanel.outerWidth();

        if (parseInt(sectionsNavListWidth) > parseInt(availableSpace)) {
            this.hideLastMenuItem(sectionsNavListWidth);
            this.showElseButton();
            sectionsNavListWidth = this.getNavWidth();

            /* При необходимости скрываем следующий элемент */
            if (parseInt(sectionsNavListWidth) > parseInt(availableSpace)) {
                return this.updateNav();
            }
        } else {
            this.unHideLastMenuItem();
            this.hideElseButton();
            sectionsNavListWidth = this.getNavWidth();

            if ((parseInt(sectionsNavListWidth) > parseInt(availableSpace)) && !stop) {
                return this.updateNav(true);
            } else if (this.getHiddenNavItem() > 0)  {
                return this.updateNav();
            }
        }
    }

    initEventHandlers() {
        this.btnShowElse
            .on('mouseenter', () => {
                if (isDesktop()) {
                    this.openMenu();
                }
            })
            .on('mouseleave', () => {
                if (isDesktop()) {
                    this.closeMenu();
                }
            })
            .on('click', () => {
                this.toggleMenu();
            });

        $(window).on('resize orientationchange', () => {
            this.updateNav();
        });

        $(document)
            .on('click touchend', () => {
                this.closeMenu();
            })
            .on('click touchend', '.js-sections-nav-else', function(e) {
                e.stopPropagation();
            })
            .on('keydown', (e) => {
                if(e.key === 'Escape') {
                    this.closeMenu();
                }
            });
    }

}