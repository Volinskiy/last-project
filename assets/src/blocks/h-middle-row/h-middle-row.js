import './h-middle-row.less';

import CallbackTools from '../../modules/callback_tools.js';

export default class HMiddleRow extends CallbackTools
{
    constructor() {
        super();
        this.btnShowSearch = $('.js-btn-show-search');
        this.headerMiddleRow = $('.js-h-middle-row');
        this.btnHideFormSearch = $('.js-hide-form-search');
        this.searchQueryString = $('.js-search-query-string');

        this.initEventHandlers();
    }

    closeFormSearch() {
        if(this.headerMiddleRow.hasClass('h-middle-row--form-opened')) {
            //Замедляем скрытие, чтобы не происходило touchend по логотипу
            setTimeout(() => {
                this.headerMiddleRow.removeClass('h-middle-row--form-opened')
            }, 100);
        }
    }

    openFormSearch() {
        this.headerMiddleRow.addClass('h-middle-row--form-opened');
        //Передаём фокус строке поиска
        $('.js-search-query-string').focus();

        this.executeCallbackList('afterSearchOpen');
    }

    initEventHandlers() {
        this.btnShowSearch.on('click', (e) => {
            e.stopPropagation();
            this.openFormSearch();
        });

        this.btnHideFormSearch.on('click', (e) => {
            e.stopPropagation();
            this.closeFormSearch();
            return false;
        });

        this.searchQueryString.on('click touchend', () => {
            this.executeCallbackList('afterCursorInSearchString');
        });

        $(document)
            .on('click touchend', () => {
                this.closeFormSearch();
            })
            .on('click touchend', '.js-form-search', function(e) {
                e.stopPropagation();
            });
    }
}