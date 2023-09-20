import {
  removeClasses,
  bodyLock,
  bodyUnlock,
  addActiveClass,
} from './functions.js'
import { formValidate } from './forms/forms.js'
import { modules } from './modules.js'

document.addEventListener('DOMContentLoaded', function () {
  const md = window.matchMedia('(max-width: 768px)')

  // change about text content
  const aboutText = document.querySelector(
    '.about-mainpage__text-block .text-block__text'
  )
  if (aboutText && md.matches) {
    aboutText.innerHTML = `Союз Каменных Мастерских – это объединение предприятий камнеобрабатывающей промышленности. 
    На протяжении 20 лет мы успешно работаем в этой сфере и отлично зарекомендовали себя.`
  }

  // chapters
  const chapters = document.querySelectorAll('.cooperation-optovikam__chapter')
  if (chapters.length && !md.matches) {
    chapters[0].classList.add('_active')
    document
      .querySelectorAll('.description-cooperation-optovikam__item')[0]
      .classList.add('_active')
  }

  // ===========================================================================

  // handler functions
  const onClickHandler = e => {
    const target = e.target

    if (target.closest('.catalog-tabs__item')) {
      removeClasses(document.querySelectorAll('.catalog-tabs__item'), '_active')
      target.closest('.catalog-tabs__item').classList.add('_active')
    }
    if (target.closest('.cooperation-optovikam__chapter') && !md.matches) {
      const chapterBtn = e.target.closest('.cooperation-optovikam__chapter')
      const chapterBtnIndex = chapterBtn.dataset.chapter
      removeClasses(
        document.querySelectorAll('.cooperation-optovikam__chapter'),
        '_active'
      )
      chapterBtn.classList.add('_active')
      removeClasses(
        document.querySelectorAll('.description-cooperation-optovikam__item'),
        '_active'
      )
      document
        .querySelector(`[data-chapter-desc="${chapterBtnIndex}"]`)
        .classList.add('_active')
    }
    if (target.closest('.catalog .select__option')) {
      removeClasses(
        document.querySelectorAll('.catalog .select__option'),
        '_select-selected'
      )
      target
        .closest('.catalog .select__option')
        .classList.add('_select-selected')
    }
    if (
      target.closest('#filtersExpand') &&
      !document.body.classList.contains('_filters-open')
    ) {
      if (
        !document.querySelector('.catalog_socles') ||
        (document.querySelector('.catalog_socles') && md.matches)
      ) {
        document.body.classList.add('_filters-open')
        bodyLock()
      }
    }
    if (target.closest('.filters__close-btn')) {
      document.body.classList.remove('_filters-open')
      bodyUnlock()
    }
    if (target.closest('#cleanFormBtn')) {
      formValidate.formClean(target.closest('form'))
    }
    if (target.closest('.page-pagination__item')) {
      const pagePaginationItems = document.querySelectorAll(
        '.page-pagination__item'
      )
      removeClasses(pagePaginationItems, '_active')
      target.closest('.page-pagination__item').classList.add('_active')
    }
  }

  // document events
  document.addEventListener('click', onClickHandler)
})
