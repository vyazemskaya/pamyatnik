import { removeClasses, addActiveClass } from './functions.js'
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

  // filters
  const filters = document.querySelectorAll('.filters-catalog-mainpage__item')
  filters.length ? addActiveClass(filters) : null

  // chapters
  const chapters = document.querySelectorAll('.cooperation-optovikam__chapter')
  if (chapters.length && !md.matches) {
    chapters[0].classList.add('_active')
    document
      .querySelectorAll('.description-cooperation-optovikam__item')[0]
      .classList.add('_active')
  }

  // handler functions
  const onClickHandler = e => {
    if (e.target.closest('.cooperation-optovikam__chapter') && !md.matches) {
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
  }

  // document events
  document.addEventListener('click', onClickHandler)
})
