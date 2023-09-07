import Swiper from 'swiper'
import { Navigation, Pagination, EffectFade, Grid } from 'swiper/modules'

// styles ======================================================================

// base styles
import '../../scss/base/swiper.scss'

// all styles
// import "../../scss/libs/swiper.scss";

// all styles from node_modules
// import 'swiper/css';

// launch ======================================================================
const slideToStart = swiper => {
  document.addEventListener('click', function (e) {
    if (e.target.closest('.catalog-mainpage__title')) {
      swiper.slideTo(0, 0)
    }
  })
}

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

      //touchRatio: 0,
      //simulateTouch: false,
      //loop: true,
      //preloadImages: false,
      //lazy: true,

      // effects
      effect: 'fade',
      // fadeEffect: {
      //   crossFade: true,
      // },
      /*
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

      // pagination
      pagination: {
        el: '.hero-mainpage__pagination',
        clickable: true,
      },

      // scrollbar
      /*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

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
  if (document.querySelector('.catalog-mainpage__slider_stone')) {
    new Swiper('.catalog-mainpage__slider_stone', {
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
      // events
      on: {
        afterInit: swiper => {
          slideToStart(swiper)
        },
      },
    })
  }
  if (document.querySelector('.catalog-mainpage__slider_monuments')) {
    new Swiper('.catalog-mainpage__slider_monuments', {
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
      // events
      on: {
        afterInit: swiper => {
          slideToStart(swiper)
        },
      },
    })
  }
  if (document.querySelector('.catalog-mainpage__slider_complexes')) {
    new Swiper('.catalog-mainpage__slider_complexes', {
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
      // events
      on: {
        afterInit: swiper => {
          slideToStart(swiper)
        },
      },
    })
  }
  if (document.querySelector('.catalog-mainpage__slider_fences')) {
    new Swiper('.catalog-mainpage__slider_fences', {
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
      // events
      on: {
        afterInit: swiper => {
          slideToStart(swiper)
        },
      },
    })
  }
  if (document.querySelector('.catalog-mainpage__slider_socles')) {
    new Swiper('.catalog-mainpage__slider_socles', {
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
      // events
      on: {
        afterInit: swiper => {
          slideToStart(swiper)
        },
      },
    })
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
