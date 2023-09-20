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
    (GAP / 2.12) * VISIBLE_SLIDES_AMOUNT
  // one slide width
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
const initCatalogSliderThumbs = swiper => {
  const slides = swiper.slides
  const realIndex = swiper.realIndex
  const prevIndex =
    realIndex - 1 > 0 || realIndex - 1 === 0 ? realIndex - 1 : slides.length - 1
  const thumbsNextContainer = document.querySelector(
    '.hero-catalog__thumbs_next'
  )
  const thumbsPrevContainer = document.querySelector(
    '.hero-catalog__thumbs_prev'
  )
  thumbsNextContainer.innerHTML = ''

  class Thumb {
    constructor(parent, index) {
      this.parent = parent
      this.index = index
      this.item = this.init()
    }
    init() {
      const item = document.createElement('button')
      const imageSrc = this.parent
        .querySelector('.slide-hero-catalog__image')
        .getAttribute('src')
      item.classList.add('hero-catalog__thumb')
      item.setAttribute('data-slide-index', `${this.index}`)
      item.innerHTML = `
        <img src="${imageSrc}" alt="" aria-hidden="true">
        `
      return item
    }
  }

  let thumbPrev
  let thumbNext

  if (prevIndex > 0 || prevIndex === 0) {
    thumbPrev = new Thumb(slides[prevIndex], prevIndex)
    thumbsPrevContainer.innerHTML = ''
    thumbsPrevContainer.appendChild(thumbPrev.item)
  } else {
    prevIndex = slides.length - 1
    thumbPrev = new Thumb(slides[prevIndex], prevIndex)
    thumbsPrevContainer.innerHTML = ''
    thumbsPrevContainer.appendChild(thumbPrev.item)
  }

  slides.forEach(slide => {
    if (
      slides.indexOf(slide) !== realIndex &&
      slides.indexOf(slide) !== prevIndex
    ) {
      thumbNext = new Thumb(slide, slides.indexOf(slide))
      thumbsNextContainer.appendChild(thumbNext.item)
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
  if (document.querySelector('.mainpage__catalog .chapter-section__slider')) {
    new Swiper('.mainpage__catalog .chapter-section__slider', {
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
        prevEl: '.mainpage__catalog .navigation__button_prev',
        nextEl: '.mainpage__catalog .navigation__button_next',
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
  if (document.querySelector('.catalog-tabs')) {
    const initSwiper = () => {
      if (
        window.matchMedia('(max-width: 768px)').matches &&
        !mainpageFiltersSlider
      ) {
        mainpageFiltersSlider = new Swiper('.catalog-tabs', {
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
  if (document.querySelector('.mainpage__materials .chapter-section__slider')) {
    new Swiper('.mainpage__materials .chapter-section__slider', {
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
        prevEl: '.mainpage__materials .navigation__button_prev',
        nextEl: '.mainpage__materials .navigation__button_next',
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
  if (document.querySelector('.mainpage__articles .chapter-section__slider')) {
    new Swiper('.mainpage__articles .chapter-section__slider', {
      modules: [Navigation],
      observer: true,
      observeParents: true,
      slidesPerView: 2,
      spaceBetween: 8,
      speed: 1000,

      // navigation
      navigation: {
        prevEl: '.mainpage__articles .navigation__button_prev',
        nextEl: '.mainpage__articles .navigation__button_next',
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
      slideToClickedSlide: true,

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
  if (document.querySelector('.hero-catalog__slider')) {
    if (!window.matchMedia('(max-width: 768px)').matches) {
      new Swiper('.hero-catalog__slider', {
        modules: [Navigation, EffectFade],
        speed: 500,
        slidesPerView: 1,
        spaceBetween: 10,
        autoHeight: false,

        // effects
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },

        // navigation
        navigation: {
          prevEl: '.hero-catalog .navigation__button_prev',
          nextEl: '.hero-catalog .navigation__button_next',
        },

        // events
        on: {
          init: swiper => {
            initCatalogSliderThumbs(swiper, swiper.realIndex)
            if (document.querySelectorAll('.hero-catalog__thumb').length) {
              document.addEventListener('click', function (e) {
                if (e.target.closest('.hero-catalog__thumb')) {
                  const thumbIndex = e.target.closest('.hero-catalog__thumb')
                    .dataset.slideIndex
                  swiper.slideTo(thumbIndex, 500)
                }
              })
            }
            if (document.querySelector('.catalog_stone')) {
              swiper.slideTo(swiper.slides.length - 1, 0)
            } else if (document.querySelector('.catalog_fences')) {
              swiper.slideTo(2, 0)
            } else if (document.querySelector('.catalog_socles')) {
              swiper.slideTo(1, 0)
            }
          },
          activeIndexChange: swiper => {
            initCatalogSliderThumbs(swiper, swiper.realIndex)
          },
        },
      })
    } else {
      new Swiper('.hero-catalog__slider', {
        modules: [Navigation, EffectFade],
        speed: 1000,
        slidesPerView: 1,
        spaceBetween: 10,
        autoHeight: true,

        // navigation
        navigation: {
          prevEl: '.hero-catalog .navigation__button_prev',
          nextEl: '.hero-catalog .navigation__button_next',
        },

        // events
        on: {
          init: swiper => {
            initCatalogSliderThumbs(swiper, swiper.realIndex)
            if (document.querySelectorAll('.hero-catalog__thumb').length) {
              document.addEventListener('click', function (e) {
                if (e.target.closest('.hero-catalog__thumb')) {
                  const thumbIndex = e.target.closest('.hero-catalog__thumb')
                    .dataset.slideIndex
                  swiper.slideTo(thumbIndex, 1000)
                }
              })
            }
            if (document.querySelector('.catalog_stone')) {
              swiper.slideTo(swiper.slides.length - 1, 0)
            } else if (document.querySelector('.catalog_fences')) {
              swiper.slideTo(2, 0)
            } else if (document.querySelector('.catalog_socles')) {
              swiper.slideTo(1, 0)
            }
          },
          activeIndexChange: swiper => {
            initCatalogSliderThumbs(swiper, swiper.realIndex)
          },
        },
      })
    }
  }
  if (document.querySelector('.hero-articles__slider')) {
    new Swiper('.hero-articles__slider', {
      modules: [Navigation, EffectFade],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 16,
      speed: 800,
      autoHeight: true,

      // effects
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },

      // navigation
      navigation: {
        prevEl: '.hero-articles .navigation__button_prev',
        nextEl: '.hero-articles .navigation__button_next',
      },

      // breakpoints
      breakpoints: {
        768: {
          autoHeight: false,
        },
      },
    })
  }
  if (document.querySelector('.article__chapter .chapter-section__slider')) {
    new Swiper('.article__chapter .chapter-section__slider', {
      modules: [Navigation],
      observer: true,
      observeParents: true,
      slidesPerView: 2,
      spaceBetween: 8,
      speed: 800,
      autoHeight: true,

      // navigation
      navigation: {
        prevEl: '.article__chapter .navigation__button_prev',
        nextEl: '.article__chapter .navigation__button_next',
      },

      // breakpoints
      breakpoints: {
        768: {
          slidesPerView: 4,
          spaceBetween: 30,
          autoHeight: false,
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
