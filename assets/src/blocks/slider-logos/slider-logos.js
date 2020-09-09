import './slider-logos.less';
import SliderHelper from '../slider/slider_helper';
import Swiper from 'swiper';

$(function()
{
    let
        selector = '.js-slider-logos',
        sliderHelper = new SliderHelper(selector);

    new Swiper(selector, {
        slidesPerView: 4.7,
        // spaceBetween: 15,
        loop: true,

        breakpoints: {
            768: {
                slidesPerView: 5
            },
            1024: {
                slidesPerView: 6
            },
            1600: {
                slidesPerView: 10
            }
        },

        navigation: sliderHelper.getSliderNav()
    });

});