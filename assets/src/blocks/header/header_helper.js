import "./header.less";

import CallbackTools from '../../modules/callback_tools.js';

export default class HeaderHelper extends CallbackTools
{
    constructor() {
        super();
        this.header = $('.js-header');
        this.headerMiddleRow = $('.js-h-middle-row', this.header);

        this.initEventHandlers();

        document.querySelector('.js-header').__proto__.getInstance = () => {
          return this;
        };
    }

    toggleStickingMenu() {
        let isWindowSize = $(window).width() >= 768,
            headerHeight = isWindowSize ? this.header.outerHeight() : 0,
            windowScrollPosition = $(window).scrollTop();

        if (isWindowSize && windowScrollPosition > headerHeight) {
            this.fixHeaderPanel();
        } else if (isWindowSize && windowScrollPosition <= headerHeight) {
            this.unFixHeaderPanel();
        } else if (!isWindowSize) {
            //При ресайзе окна до мобильных разменров снимаем, навешенные при фиксации классы fixed
            this.unFixHeaderPanel();
        }
    }

    fixHeaderPanel() {
        if (!this.header.hasClass('fixed')) {
            this.header.addClass('fixed');
            this.headerMiddleRow.addClass('fixed');
        }
    }

    unFixHeaderPanel() {
        if (this.header.hasClass('fixed')) {
            this.header.removeClass('fixed');
            this.headerMiddleRow.removeClass('fixed');

            this.executeCallbackList('afterUnFixPanel');
        }
    }

    initEventHandlers() {
        $(window)
            .on('scroll', () => {
                this.toggleStickingMenu()
            })
            .on('resize orientationchange', () => {
                this.toggleStickingMenu()
            });
    }
}