import './slider-pop-categories.less';
import SliderHelper from '../slider/slider_helper';
import Swiper from 'swiper';

$(function() {
    let
        selector = '.js-slider-pop-categories',
        sliderHelper = new SliderHelper(selector);

    new Swiper(selector, {
        spaceBetween: 0,
        loopFillGroupWithBlank: true,

        breakpoints: {
            200: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            550: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
            768: {
                slidesPerView: 4,
                slidesPerGroup: 4,
            },
            1024: {
                slidesPerView: 5,
                slidesPerGroup: 5,
            },
            1600: {
                slidesPerView: 6,
                slidesPerGroup: 6,
            },
        },

        navigation: sliderHelper.getSliderNav()
    });
});