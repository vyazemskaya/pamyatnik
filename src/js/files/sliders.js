import Swiper, {
  Navigation,
  Pagination,
  EffectFade,
  Grid,
  Autoplay,
  Thumbs,
  EffectCoverflow,
  EffectCreative,
} from 'swiper';

// styles ======================================================================

// base styles
import '../../scss/base/swiper.scss';

// all styles
// import "../../scss/libs/swiper.scss";

// all styles from node_modules
// import 'swiper/css';

// launch ======================================================================
let mainpageServicesSlider = null;
let mainpageFiltersSlider = null;
let optovikamPrivilegesSlider = null;
let optovikamChaptersSlider = null;

const initGallerySlider = swiper => {
  const params = {
    gap: 15,
    sc1: 1.1,
    sc2: 0.8,
    sc3: 1.5,
    amount: 5,
  };

  const slides = swiper.slides;
  const prevSlides = [];
  const nextSlides = [];
  const w1 = swiper.el.offsetWidth / params.amount;
  const w2 = w1 * params.sc2;
  const w3 = w1 * params.sc3;
  const tr1 = (w3 - w1) / 2 + 30;
  const tr2 = (w3 - w1) / 2 + 80;

  slides[swiper.activeIndex].querySelector(
    '.slide-gallery__image'
  ).style.transform = `scale(${params.sc3})`;

  slides.forEach(slide => {
    const img = slide.querySelector('.slide-gallery__image');
    if (slides.indexOf(slide) < swiper.activeIndex) {
      prevSlides.push(img);
    } else if (slides.indexOf(slide) > swiper.activeIndex) {
      nextSlides.push(img);
    }
  });

  const setTransform = (arr, isNext) => {
    if (arr.length) {
      for (let i = 0; i < arr.length; i++) {
        const e = arr[i];
        if (i === 0) {
          e.style.opacity = 1;
          e.style.transform = `scale(${params.sc1}) translateX(${
            isNext ? tr1 : -tr1
          }px)`;
        } else if (i === 1) {
          e.style.opacity = 1;
          e.style.transform = `scale(${params.sc2}) translateX(${
            isNext ? tr2 : -tr2
          }px)`;
        } else {
          e.style.opacity = 0;
          e.style.transform = `scale(${params.sc2}) translateX(${
            isNext ? 100 : -100
          }%)`;
        }
      }
    }
  };

  // const emptySpace = slideWidth - slideWidth * params.scale;

  // const additionalSpace =
  //   params.activeScale !== 1
  //     ? Math.abs(
  //         (slideWidth * params.activeScale - slideWidth * params.scale) / 2 -
  //           emptySpace
  //       )
  //     : Math.abs(slideWidth - slideWidth * params.scale - emptySpace / 2);

  // const setTransform = (arr, isNext) => {
  //   if (arr.length) {
  //     for (let i = 0; i < arr.length; i++) {
  //       const el = arr[i];
  //       const x0 =
  //         params.activeScale !== 1
  //           ? additionalSpace + params.gap
  //           : additionalSpace - params.gap;
  //       const x1 =
  //         params.activeScale !== 1
  //           ? emptySpace - x0 - params.gap
  //           : x0 + emptySpace - params.gap;
  //       const x2 = emptySpace + x1 - params.gap;
  //       arr[1].style.transform = `translateX(${isNext ? -x1 : x1}px) scale(${
  //         params.scale
  //       })`;
  //       arr[2].style.transform = `translateX(${isNext ? -x2 : x2}px) scale(${
  //         params.scale
  //       })`;
  //       if (params.activeScale !== 1) {
  //         arr[0].style.transform = `translateX(${isNext ? x0 : -x0}px) scale(${
  //           params.scale
  //         })`;
  //       } else {
  //         arr[0].style.transform = `translateX(${isNext ? -x0 : x0}px) scale(${
  //           params.scale
  //         })`;
  //       }
  //       if (i > 1) {
  //         const prevGap = arr[i - 1].style.transform
  //           .split(' ')[0]
  //           .match(/\d+/g)
  //           .join('.');
  //         if (!isNext) {
  //           const x3 = x2 > 0 ? Number(prevGap) : Number(prevGap) * -1;
  //           el.style.transform = `translateX(${
  //             x3 + emptySpace - params.gap
  //           }px) scale(${params.scale})`;
  //         } else {
  //           const x3 = x2 > 0 ? Number(prevGap) * -1 : Number(prevGap);
  //           el.style.transform = `translateX(${
  //             x3 - emptySpace + params.gap
  //           }px) scale(${params.scale})`;
  //         }
  //       }
  //     }
  //   }
  // };

  prevSlides.reverse();
  setTransform(prevSlides, 0);
  setTransform(nextSlides, 1);
};
// const initCatalogSliderThumbs = swiper => {
//   const realLength = swiper.slides.length - swiper.loopedSlides*2
//   const slides = swiper.slides
//   const realIndex = swiper.realIndex
//   let prevIndex = realIndex === 0 ? realLength - 2 : realIndex - 1
//   const thumbsNextContainer = document.querySelector(
//     '.hero-catalog__thumbs_next'
//   )
//   const thumbsPrevContainer = document.querySelector(
//     '.hero-catalog__thumbs_prev'
//   )
//   thumbsNextContainer.innerHTML = ''

//   class Thumb {
//     constructor(parent, index) {
//       this.parent = parent
//       this.index = index
//       this.item = this.init()
//     }
//     init() {
//       const item = document.createElement('button')
//       const imageSrc = this.parent
//         .querySelector('.slide-hero-catalog__image')
//         .getAttribute('src')
//       item.classList.add('hero-catalog__thumb')
//       item.setAttribute('data-slide-index', `${this.index}`)
//       item.innerHTML = `
//         <img src="${imageSrc}" alt="" aria-hidden="true">
//         `
//       return item
//     }
//   }

//   let thumbPrev
//   let thumbNext

//   console.log(slides[prevIndex])

//   // console.log(realLength, slides.length)

//   // slides.forEach(slide => console.log(slides.indexOf(slide)))

//   if (prevIndex > 0 || prevIndex === 0) {
//     thumbPrev = new Thumb(slides[prevIndex], prevIndex)
//     thumbsPrevContainer.innerHTML = ''
//     thumbsPrevContainer.appendChild(thumbPrev.item)
//   } else {
//     prevIndex = slides.length - 1
//     thumbPrev = new Thumb(slides[prevIndex], prevIndex)
//     thumbsPrevContainer.innerHTML = ''
//     thumbsPrevContainer.appendChild(thumbPrev.item)
//   }

//   slides.forEach(slide => {
//     if (
//       slides.indexOf(slide) !== realIndex &&
//       slides.indexOf(slide) !== prevIndex
//     ) {
//       thumbNext = new Thumb(slide, slides.indexOf(slide))
//       thumbsNextContainer.appendChild(thumbNext.item)
//     }
//   })
// }

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
      updateOnWindowResize: true,
      // loop: true,

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
    });
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
    });
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
        });
      } else if (
        !window.matchMedia('(max-width: 768px)').matches &&
        mainpageFiltersSlider
      ) {
        mainpageFiltersSlider.destroy();
        mainpageFiltersSlider = null;
      }
    };
    initSwiper();
    window.addEventListener('resize', initSwiper);
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
    });
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
        });
      } else if (
        !window.matchMedia('(max-width: 768px)').matches &&
        mainpageServicesSlider
      ) {
        mainpageServicesSlider.destroy();
        mainpageServicesSlider = null;
      }
    };
    initSwiper();
    window.addEventListener('resize', initSwiper);
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
    });
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
    });
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
      });
    } else if (
      !window.matchMedia('(max-width: 768px)').matches &&
      optovikamPrivilegesSlider
    ) {
      optovikamPrivilegesSlider.destroy();
      optovikamPrivilegesSlider = null;
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
      });
    } else if (
      !window.matchMedia('(max-width: 768px)').matches &&
      optovikamChaptersSlider
    ) {
      optovikamChaptersSlider.destroy();
      optovikamChaptersSlider.pagination.destroy();
    }
  }
  if (document.querySelector('.gallery__slider')) {
    new Swiper('.gallery__slider', {
      modules: [Navigation, EffectCreative, EffectCoverflow],
      loop: true,
      speed: 1000,
      spaceBetween: 15,
      slidesPerView: 5,
      speed: 600,
      centeredSlides: true,
      slideToClickedSlide: true,

      // navigation
      navigation: {
        prevEl: '.gallery .navigation__button_prev',
        nextEl: '.gallery .navigation__button_next',
      },

      // effect: 'coverflow',
      // coverflowEffect: {
      //   rotate: 0,
      //   stretch: 10,
      //   depth: 100,
      //   modifier: 1,
      //   scale: 0.88,
      //   slideShadows: false,
      //   centeredSlides: true,
      // },

      // effect: 'creative',
      // creativeEffect: {
      //   limitProgress: 10,
      //   prev: {
      //     scale: 0.7,
      //     translate: ['-100%', 0, 0],
      //   },
      //   next: {
      //     scale: 0.7,
      //     translate: ['100%', 0, 0],
      //   },
      // },
    });
  }
  if (document.querySelector('.gallery__slider-v2')) {
    new Swiper('.gallery__slider-v2', {
      modules: [Navigation, EffectCreative, EffectCoverflow],
      loop: true,
      speed: 1000,
      spaceBetween: 30,
      slidesPerView: 5,
      speed: 600,
      centeredSlides: true,

      // navigation
      navigation: {
        prevEl: '.gallery .navigation__button_prev',
        nextEl: '.gallery .navigation__button_next',
      },
      effect: 'creative',
      creativeEffect: {
        limitProgress: 10,
        prev: {
          scale: 0.8,
          translate: ['-100%', 0, 0],
        },
        next: {
          scale: 0.8,
          translate: ['100%', 0, 0],
        },
      },
    });
  }
  if (document.querySelector('.gallery__slider-v3')) {
    new Swiper('.gallery__slider-v3', {
      modules: [Navigation, EffectCoverflow],
      loop: true,
      speed: 1000,
      spaceBetween: 0,
      slidesPerView: 'auto',
      speed: 600,
      centeredSlides: true,
      centeredSlidesBounds: true,
      slideToClickedSlide: true,
      watchSlidesProgress: true,
      freeMode: true,

      // navigation
      navigation: {
        prevEl: '.gallery .navigation__button_prev',
        nextEl: '.gallery .navigation__button_next',
      },
      // effect: 'coverflow',
      // // coverflowEffect: {
      // //   rotate: 0,
      // //   stretch: 10,
      // //   depth: 100,
      // //   modifier: 1,
      // //   slideShadows: false,
      // //   centeredSlides: true,
      // // },
    });
  }
  var previousIndex;
  function getPreviousIndex(swiper) {
    const thumbs = document.querySelectorAll('.hero-catalog__thumbs-slide');
    previousIndex = swiper.realIndex;
    document.getElementById('s').src =
      swiper.slides[previousIndex].querySelector('img').src;

    thumbs.forEach(thumb => {
      thumb.classList.remove('_hidden');
      if (thumb.querySelector('img').src === document.getElementById('s').src) {
        thumb.classList.add('_hidden');
      }
    });
  }
  var galleryThumbs = new Swiper('.hero-catalog__thumbs-slider', {
    observeParents: true,
    observer: true,
    observeSlideChildren: true,
    modules: [Thumbs],
    spaceBetween: 10,
    slidesPerView: 4,
    watchSlidesProgress: true,
  });
  var galleryTop = new Swiper('.hero-catalog__slider', {
    modules: [Navigation, EffectFade, Thumbs],
    observeParents: true,
    observer: true,
    observeSlideChildren: true,
    speed: 500,
    slidesPerView: 1,
    spaceBetween: 10,
    autoHeight: false,
    loop: true,
    thumbs: {
      swiper: galleryThumbs,
    },

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
    on: {
      init: swiper => {
        getPreviousIndex(swiper);
      },
      slideChange: swiper => {
        getPreviousIndex(swiper);
      },
    },
  });
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
    });
  }
  if (document.querySelector('.article__chapter .chapter-section__slider')) {
    new Swiper('.article__chapter .chapter-section__slider', {
      modules: [Navigation],
      observer: true,
      observeParents: true,
      slidesPerView: 2,
      spaceBetween: 8,
      speed: 800,

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
        },
      },
    });
  }
  if (document.querySelector('.about__activities .chapter-section__slider')) {
    new Swiper('.about__activities .chapter-section__slider', {
      modules: [Navigation],
      observer: true,
      observeParents: true,
      speed: 800,
      spaceBetween: 30,
      slidesPerView: 1,
      autoHeight: true,

      // navigation
      navigation: {
        prevEl: '.about__activities .navigation__button_prev',
        nextEl: '.about__activities .navigation__button_next',
      },

      // breakpoints
      breakpoints: {
        768: {
          slidesPerView: 3,
          spaceBetween: 60,
          autoHeight: false,
        },
      },
    });
  }
  if (document.querySelector('.product-other .chapter-section__slider')) {
    new Swiper('.product-other .chapter-section__slider', {
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
        prevEl: '.product-other .navigation__button_prev',
        nextEl: '.product-other .navigation__button_next',
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
    });
  }
  if (document.querySelector('.product-main__slider-main')) {
    const slides = document.querySelectorAll(
      '.product-main__slider-main-slide'
    );
    const slider = document.querySelector('.product-main__slider');

    if (slides.length <= 1) {
      slider.classList.remove('three-slides');
      slider.classList.remove('two-slides');
      slider.classList.add('one-slides');
    } else {
      const productThumbs = new Swiper('.product-main__slider-thumbs', {
        modules: [Thumbs],
        slidesPerView: 1,
        freeMode: true,
        watchSlidesProgress: true,
      });
      const productMain = new Swiper('.product-main__slider-main', {
        modules: [Thumbs, EffectFade],
        thumbs: {
          swiper: productThumbs,
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
      });

      if (slides.length === 2) {
        slider.classList.remove('one-slides');
        slider.classList.remove('three-slides');
        slider.classList.add('two-slides');
      }

      if (slides.length === 3) {
        slider.classList.remove('one-slides');
        slider.classList.remove('two-slides');
        slider.classList.add('three-slides');
      }
    }
  }
}

// slider scroll ===============================================================
function initSlidersScroll() {
  let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
  if (sliderScrollItems.length > 0) {
    for (let index = 0; index < sliderScrollItems.length; index++) {
      const sliderScrollItem = sliderScrollItems[index];
      const sliderScrollBar =
        sliderScrollItem.querySelector('.swiper-scrollbar');
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
      });
      sliderScroll.scrollbar.updateSize();
    }
  }
}

//=================================================================================================================

window.addEventListener('load', function (e) {
  initSliders();
  //initSlidersScroll();
});
