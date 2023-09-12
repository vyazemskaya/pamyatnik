import Swiper from 'swiper'
import {
  Navigation,
  Pagination,
  EffectFade,
  Grid,
  Autoplay,
} from 'swiper/modules'

// styles ======================================================================

// base styles
import '../../scss/base/swiper.scss'

// all styles
// import "../../scss/libs/swiper.scss";

// all styles from node_modules
// import 'swiper/css';

// launch ======================================================================
let mainpageServicesSlider = null
let mainpageFiltersSlider = null

function initSliders() {
  if (document.querySelector('.hero-mainpage__slider')) {
    new Swiper('.hero-mainpage__slider', {
      modules: [Navigation, Pagination, EffectFade],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      autoHeight: true,
      speed: 1000,
      loop: true,

      // effects
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },

      // pagination
      pagination: {
        el: '.hero-mainpage__pagination',
        clickable: true,
      },

      // navigation
      navigation: {
        prevEl: '.hero-mainpage__nav-button_prev',
        nextEl: '.hero-mainpage__nav-button_next',
      },

      // breakpoints
      breakpoints: {
        768: {
          autoHeight: false,
        },
      },

      // events
      on: {},
    })
  }
  if (document.querySelector('.catalog-mainpage__slider')) {
    new Swiper('.catalog-mainpage__slider', {
      modules: [Navigation, Grid],
      observer: true,
      observeParents: true,
      slidesPerView: 2,
      spaceBetween: 0,
      speed: 1000,
      grid: {
        rows: 2,
        fill: 'row',
      },

      // navigation
      navigation: {
        prevEl: '.catalog-mainpage .navigation__button_prev',
        nextEl: '.catalog-mainpage .navigation__button_next',
      },

      // breakpoints
      breakpoints: {
        768: {
          slidesPerView: 4,
          grid: {
            rows: 1,
          },
        },
      },
    })
  }
  if (document.querySelector('.catalog-mainpage__filters')) {
    const initSwiper = () => {
      if (
        window.matchMedia('(max-width: 768px)').matches &&
        !mainpageFiltersSlider
      ) {
        mainpageFiltersSlider = new Swiper('.catalog-mainpage__filters', {
          modules: [],
          observer: true,
          observeParents: true,
          slidesPerView: 'auto',
          centeredSlides: true,
          centeredSlidesBounds: true,
          slideToClickedSlide: true,
          spaceBetween: 10,
          speed: 1000,

          // breakpoints
          breakpoints: {},
        })
      } else if (
        !window.matchMedia('(max-width: 768px)').matches &&
        mainpageFiltersSlider
      ) {
        mainpageFiltersSlider.destroy()
        mainpageFiltersSlider = null
      }
    }
    initSwiper()
    window.addEventListener('resize', initSwiper)
  }
  if (document.querySelector('.materials-mainpage__slider')) {
    new Swiper('.materials-mainpage__slider', {
      modules: [Navigation, Grid],
      observer: true,
      observeParents: true,
      slidesPerView: 2,
      spaceBetween: 0,
      speed: 1000,
      grid: {
        rows: 2,
        fill: 'row',
      },

      // navigation
      navigation: {
        prevEl: '.materials-mainpage .navigation__button_prev',
        nextEl: '.materials-mainpage .navigation__button_next',
      },

      // breakpoints
      breakpoints: {
        768: {
          slidesPerView: 4,
          grid: {
            rows: 1,
          },
        },
      },
    })
  }
  if (document.querySelector('.services-mainpage__slider')) {
    const initSwiper = () => {
      if (
        window.matchMedia('(max-width: 768px)').matches &&
        !mainpageServicesSlider
      ) {
        mainpageServicesSlider = new Swiper('.services-mainpage__slider', {
          modules: [Autoplay],
          observer: true,
          observeParents: true,
          slidesPerView: 1.2,
          spaceBetween: 16,
          speed: 1500,
          autoplay: {
            delay: 6000,
          },
        })
      } else if (
        !window.matchMedia('(max-width: 768px)').matches &&
        mainpageServicesSlider
      ) {
        mainpageServicesSlider.destroy()
        mainpageServicesSlider = null
      }
    }
    initSwiper()
    window.addEventListener('resize', initSwiper)
  }
  if (document.querySelector('.articles-mainpage__slider')) {
    new Swiper('.articles-mainpage__slider', {
      modules: [Navigation],
      observer: true,
      observeParents: true,
      slidesPerView: 2,
      spaceBetween: 8,
      speed: 1000,

      // navigation
      navigation: {
        prevEl: '.articles-mainpage .navigation__button_prev',
        nextEl: '.articles-mainpage .navigation__button_next',
      },

      // breakpoints
      breakpoints: {
        768: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    })
  }
}

// slider scroll ===============================================================
function initSlidersScroll() {
  let sliderScrollItems = document.querySelectorAll('.swiper_scroll')
  if (sliderScrollItems.length > 0) {
    for (let index = 0; index < sliderScrollItems.length; index++) {
      const sliderScrollItem = sliderScrollItems[index]
      const sliderScrollBar =
        sliderScrollItem.querySelector('.swiper-scrollbar')
      const sliderScroll = new Swiper(sliderScrollItem, {
        observer: true,
        observeParents: true,
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: {
          enabled: true,
        },
        scrollbar: {
          el: sliderScrollBar,
          draggable: true,
          snapOnRelease: false,
        },
        mousewheel: {
          releaseOnEdges: true,
        },
      })
      sliderScroll.scrollbar.updateSize()
    }
  }
}

//=================================================================================================================

window.addEventListener('load', function (e) {
  initSliders()
  //initSlidersScroll();
})
