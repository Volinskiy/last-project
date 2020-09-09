import Swiper from 'swiper';
import SliderHelper from '../slider/slider_helper';

$(function()
{
    let selector = '.js-slider-stock-discounts',
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
            1024: {
                slidesPerView: 4,
                slidesPerGroup: 4,
            }
        },

        navigation: sliderHelper.getSliderNav()
    });
});