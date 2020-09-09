import SliderHelper from '../slider/slider_helper';

$(window).on('load', function() {
    let
        sliderHelper = new SliderHelper('.js-slider-goods-month'),
        sliderOptions = {
            slidesPerView: 3,
            slidesPerColumn: 2,

            breakpoints: {
                200: {
                    slidesPerView: 2,
                    slidesPerColumn: 3
                },
                550: {
                    slidesPerView: 3,
                    slidesPerColumn: 2
                },
                1024: {
                    slidesPerView: 4,
                    slidesPerColumn: 2
                }
            },

            navigation: sliderHelper.getSliderNav()
        };

    sliderHelper.multiRowInit(sliderOptions);
});