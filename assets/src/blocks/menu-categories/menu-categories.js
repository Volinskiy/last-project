import './menu-categories.less';

import { isDesktop } from '../../modules/user_agent_detect.js';
import Scrollbar from "smooth-scrollbar";
import CallbackTools from '../../modules/callback_tools.js';

export default class MenuCategories extends CallbackTools
{
    constructor() {
        super();
        this.menuCategories = $('.js-menu-categories');
        this.menuContainer = $('.js-menu-categories-nav', this.menuCategories);
        this.menuCategoriesHeader = $('.js-menu-categories-header', this.menuCategories);
        this.menuLinks = $('.js-menu-categories-link', this.menuCategories);

        //Инициализация скроллбара
        this.menuScrollbar = Scrollbar.init(
            $('.js-menu-categories-list')[0],
            {
                alwaysShowTracks: true,
                continuousScrolling: false
            }
        );

        this.initEventHandlers();
    }

    openMenu() {
        this.menuCategories.addClass('opened');
        this.menuContainer.removeClass('hidden');

        //Пересчитываем меню после отображения
        this.menuScrollbar.update();

        //Прокручиваем меню к началу
        this.menuScrollbar.scrollTop = 0;

        this.executeCallbackList('afterOpen')
    }

    closeMenu() {
        console.log('hy');
        this.menuCategories.removeClass('opened');
        this.menuContainer.addClass('hidden');
    }

    toggleMenu() {
        if (this.menuCategories.hasClass('opened')) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    /**
     * @param $newCurrentItem jqObject
     */
    changeMenuItemCurrent($newCurrentItem) {
        let currentItemClass = 'current-item',
            $currentItem = $(`.${currentItemClass}`, this.menuContainer),
            newCurrentItemText = $newCurrentItem.text();

        //Подставляем текст выбранного пункта в кнопку меню
        this.menuCategoriesHeader.text(newCurrentItemText);

        $currentItem.removeClass(currentItemClass);
        $newCurrentItem.addClass(currentItemClass);
    }

    initEventHandlers() {
        this.menuCategories
            .on('click', () => {
                this.toggleMenu();
            });

        this.menuLinks
            .on('mouseenter', (event) => {
                $(event.currentTarget).addClass('hovered');
            })
            .on('mouseleave', (event) => {
                $(event.currentTarget).removeClass('hovered');
            })
            .on('click touchend', (event) => {
                event.preventDefault();
                event.stopPropagation();

                this.changeMenuItemCurrent($(event.currentTarget));
                this.closeMenu();
            });

        $(document)
        //при клике по документу сворачиваем меню
            .on('click touchend', () => {
                this.closeMenu();
            });
    }
}