import Swiper, {
  Navigation,
  Pagination,
  EffectFade,
  Grid,
  Autoplay,
} from 'swiper'

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
let optovikamPrivilegesSlider = null
let optovikamChaptersSlider = null

const initGallerySlider = swiper => {
  // params
  const GAP = 30 // gap between the slides, multiplied by 2 (15 * 2 = 30)
  const SCALE_SLIDE = 0.8 // scale for regular slides
  const SCALE_ACTIVE_SLIDE = 1.7 // scale for active slide
  const VISIBLE_SLIDES_AMOUNT = 5 // slides per view
  const CONTAINER_WIDTH = 1760 // swiper container width

  // main variables
  const slides = swiper.slides // array with slides
  const slideWidth =
    CONTAINER_WIDTH / VISIBLE_SLIDES_AMOUNT -
    (GAP / 2.12) * VISIBLE_SLIDES_AMOUNT // one slide width
  const gapPercent = (GAP / slideWidth) * 100 // gap between the slides (in %)
  const activeSlideGap =
    (SCALE_SLIDE / 2) * (SCALE_ACTIVE_SLIDE / 2) * 100 + gapPercent / 2 // gap for next & prev slide
  const slideGap =
    (SCALE_SLIDE / 2) * (SCALE_SLIDE / 2) * 100 + gapPercent / 1.8 // gap for regular slides

  if (slides.length) {
    let arrPrev = [] // array with slides that before active slide
    let arrNext = [] // array with slides that after active slide

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i]

      // set scale to regular slides
      slide.style.transform = `scale(${SCALE_SLIDE}, 1) `

      // check if slides are previous / next
      if (i < swiper.activeIndex) {
        arrPrev.push(slide)
        slide.style.transform = `scale(${SCALE_SLIDE}, 1) translateX(12%)`
      } else if (i > swiper.activeIndex) {
        arrNext.push(slide)
        slide.style.transform = `scale(${SCALE_SLIDE}, 1) translateX(-12%)`
      }

      // scale active slide
      slides[
        swiper.activeIndex
      ].style.transform = `scale(${SCALE_ACTIVE_SLIDE}, 2.1)`
    }

    arrPrev.reverse()
    if (arrPrev.length) {
      for (let i = 2; i < arrPrev.length; i += 2) {
        const el = arrPrev[i]
        el.style.transform = `scale(${SCALE_SLIDE}, 1) translateX(-${
          (SCALE_SLIDE / 2) * 10
        }%)`
      }
      arrPrev[0].style.transform = `scale(${SCALE_SLIDE}, 1) translateX(-${activeSlideGap}%)`
      arrPrev[1].style.transform = `scale(${SCALE_SLIDE}, 1) translateX(-${slideGap}%)`
    }
    if (arrNext.length) {
      for (let i = 2; i < arrNext.length; i += 2) {
        const el = arrNext[i]
        el.style.transform = `scale(${SCALE_SLIDE}, 1) translateX(${
          (SCALE_SLIDE / 2) * 10
        }%`
      }
      arrNext[0].style.transform = `scale(${SCALE_SLIDE}, 1) translateX(${activeSlideGap}%)`
      arrNext[1].style.transform = `scale(${SCALE_SLIDE}, 1) translateX(${slideGap}%)`
    }
  }
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
            disableOnInteraction: false,
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
  if (document.querySelector('.hero-optovikam__slider')) {
    new Swiper('.hero-optovikam__slider', {
      modules: [Pagination, EffectFade, Autoplay],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 1000,
      loop: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },

      // effects
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },

      // pagination
      pagination: {
        el: '.hero-optovikam__pagination',
        clickable: true,
        type: 'bullets',
      },
    })
  }
  if (document.querySelector('.privileges-optovikam__slider')) {
    if (
      window.matchMedia('(max-width: 768px)').matches &&
      !optovikamPrivilegesSlider
    ) {
      optovikamPrivilegesSlider = new Swiper('.privileges-optovikam__slider', {
        modules: [Navigation],
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 1000,
        autoHeight: true,

        // navigation
        navigation: {
          prevEl: '.privileges-optovikam .navigation__button_prev',
          nextEl: '.privileges-optovikam .navigation__button_next',
        },

        // breakpoints
        breakpoints: {
          768: {
            autoHeight: false,
          },
        },
      })
    } else if (
      !window.matchMedia('(max-width: 768px)').matches &&
      optovikamPrivilegesSlider
    ) {
      optovikamPrivilegesSlider.destroy()
      optovikamPrivilegesSlider = null
    }
  }
  if (document.querySelector('.cooperation-optovikam__chapters')) {
    if (
      window.matchMedia('(max-width: 768px)').matches &&
      !optovikamChaptersSlider
    ) {
      optovikamChaptersSlider = new Swiper('.cooperation-optovikam__chapters', {
        modules: [Pagination, Autoplay],
        observer: true,
        observeParents: true,
        slidesPerView: 1.1,
        spaceBetween: 16,
        speed: 1000,
        autoplay: {
          delay: 7000,
          disableOnInteraction: false,
        },

        // pagination
        pagination: {
          el: '.cooperation-optovikam__pagination',
          clickable: true,
          type: 'bullets',
        },

        // breakpoints
        // breakpoints: {
        //   768: {
        //     autoHeight: false,
        //   }
        // }

        // events
        on: {},
      })
    } else if (
      !window.matchMedia('(max-width: 768px)').matches &&
      optovikamChaptersSlider
    ) {
      optovikamChaptersSlider.destroy()
      optovikamChaptersSlider.pagination.destroy()
    }
  }
  if (document.querySelector('.gallery-optovikam__slider')) {
    new Swiper('.gallery-optovikam__slider', {
      modules: [Navigation],
      loop: true,
      speed: 1000,
      slidesPerView: 1,
      spaceBetween: 10,

      // navigation
      navigation: {
        prevEl: '.gallery-optovikam .navigation__button_prev',
        nextEl: '.gallery-optovikam .navigation__button_next',
      },

      // breakpoints
      breakpoints: {
        768: {
          spaceBetween: 0,
          slidesPerView: 5,
          centeredSlides: true,
          watchSlidesProgress: true,
          watchSlidesVisibility: true,
        },
      },

      // events
      on: {
        afterInit: swiper => {
          if (!window.matchMedia('(max-width: 768px)').matches) {
            initGallerySlider(swiper)
            swiper.update()
          }
        },
        slideChange: swiper => {
          if (!window.matchMedia('(max-width: 768px)').matches) {
            initGallerySlider(swiper)
            swiper.update()
          }
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
