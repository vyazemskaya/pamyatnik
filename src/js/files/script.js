import { isMobile } from './functions.js'
import { modules } from './modules.js'

document.addEventListener('DOMContentLoaded', function () {
  const md = window.matchMedia('(max-width: 768px)')
  const aboutText = document.querySelector(
    '.about-mainpage__text-block .text-block__text'
  )
  if (aboutText && md.matches) {
    aboutText.innerHTML = `Союз Каменных Мастерских – это объединение предприятий камнеобрабатывающей промышленности. 
    На протяжении 20 лет мы успешно работаем в этой сфере и отлично зарекомендовали себя.`
  }
})
