import './slider-banners.less';

import SliderHelper from '../slider/slider_helper';

import Swiper from 'swiper';

$(function() {

    let selector = '.js-slider-banners',
        sliderHelper = new SliderHelper(selector);

    // Ниже комментарий для .eslintta, чтобы не ругался на неисползуемую переменную
    // eslint-disable-next-line
    new Swiper(selector, {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        preloadImages: true,
        updateOnImagesReady: true,

        navigation: sliderHelper.getSliderNav(),

        autoplay: {
            delay: 5000,
        },

        pagination: {
            el: '.js-slider-banners-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + ' pagination__bullet' + '">' + (index + 1) + '</span>';
            },
        },
    });
});
