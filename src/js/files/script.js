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

  // chapters
  const chapters = document.querySelectorAll('.cooperation-optovikam__chapter')
  if (chapters.length && !md.matches) {
    chapters[0].classList.add('_active')
    document
      .querySelectorAll('.description-cooperation-optovikam__item')[0]
      .classList.add('_active')
  }

  // filters
  const filters = document.querySelectorAll('.filters-catalog-mainpage__item')

  if (filters.length) {
    const xhttp = new XMLHttpRequest()
    filters.forEach(filter => {
      filter.addEventListener('click', function () {
        removeClasses(filters, '_active')
        filter.classList.add('_active')
        const activeFilterType = filter.dataset.catalogFilter
        if (activeFilterType === 'monuments') {
          xhttp.open('GET', 'ajax/monuments.html', false)
        } else if (activeFilterType === 'fences') {
          xhttp.open('GET', 'ajax/fences.html', false)
        } else if (activeFilterType === 'stone') {
          xhttp.open('GET', 'ajax/stone.html', false)
        } else if (activeFilterType === 'socles') {
          xhttp.open('GET', 'ajax/socles.html', false)
        } else if (activeFilterType === 'complexes') {
          xhttp.open('GET', 'ajax/complexes.html', false)
        }
        xhttp.send()
        document.querySelector('.catalog-mainpage__wrapper').innerHTML =
          xhttp.responseText
      })
    })
  }

  // ===========================================================================

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
