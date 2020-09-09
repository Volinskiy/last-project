import Swiper from 'swiper';
import { throttle } from 'throttle-debounce';
import '../../modules/closest_polifill.js';

export default class sliderHelper
{
    constructor(selector)
    {
        this.selector = selector;
        this.slider = document.querySelector(this.selector).closest('.js-slider-container');
    }

    getSliderNav()
    {
        return {
            prevEl: this.slider.querySelector('.js-slider-arrow-prev'),
            nextEl: this.slider.querySelector('.js-slider-arrow-next')
        };
    }

    multiRowInit(sliderOptions)
    {
        this.slideWrapper = document.querySelector(this.selector);
        this.sliderItemList = this.slideWrapper.querySelectorAll('.js-two-rows-slide');

        sliderOptions.on = {
            init: () => {
                this.addHeight();
            },

            resize: throttle(300, () => {
                this.sliderItemList.forEach((item) => {
                    item.style.height = 'auto';
                });

                this.addHeight();
            })
        };

        new Swiper(this.slideWrapper, sliderOptions);
        this.setSliderOrder();
    }

    setSliderOrder()
    {
        this.sliderItemList.forEach((item, i) => {
            if (item.classList.contains('js-banner')) {
                return;
            }
            item.style.order = i;
        });
    }

    addHeight()
    {
        let maxHeight = 0;

        this.sliderItemList.forEach((item) => {
            maxHeight = maxHeight < item.offsetHeight ? item.offsetHeight : maxHeight;
        });

        if (!maxHeight) {
            return;
        }

        this.sliderItemList.forEach((item) => {
            item.style.height = maxHeight + 'px';
        });

        this.slideWrapper.style.height = 2 * maxHeight + 'px';
    }
}