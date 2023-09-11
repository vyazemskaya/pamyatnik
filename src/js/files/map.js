const md = window.matchMedia('(max-width: 48em)')

const rem = function (rem) {
  if (!md.matches) {
    return rem * ((10 / window.innerWidth) * 100)
  } else {
    return rem * ((5 / window.innerWidth) * 100)
  }
}

ymaps.modules.define(
  'Panel',
  ['util.augment', 'collection.Item'],
  function (provide, augment, item) {
    var Panel = function (options) {
      Panel.superclass.constructor.call(this, options)
    }

    augment(Panel, item, {
      onAddToMap: function (map) {
        Panel.superclass.onAddToMap.call(this, map)
        this.getParent()
          .getChildElement(this)
          .then(this._onGetChildElement, this)
      },

      onRemoveFromMap: function (oldMap) {
        if (this._$control) {
          this._$control.remove()
        }
        Panel.superclass.onRemoveFromMap.call(this, oldMap)
      },

      _onGetChildElement: function (parentDomContainer) {
        this._$control = $(
          '<div class="customControl"><div class="content"></div><div class="closeButton"></div></div>'
        ).appendTo(parentDomContainer)
        this._$content = $('.content')
        $('.closeButton').on('click', this._onClose)
      },
      _onClose: function () {
        $('.customControl').css('display', 'none')
      },
      setContent: function (text) {
        this._$control.css('display', 'flex')
        this._$content.html(text)
      },
    })

    provide(Panel)
  }
)

ymaps.ready(['Panel']).then(function () {
  var map = new ymaps.Map('map', {
    center: [55.60147339237478, 37.42967467822445],
    zoom: 12,
    controls: [],
  })
  class panelContent {
    constructor(heading, tel, email, adress, hours, img) {
      this.heading = heading
      this.tel = tel
      this.email = email
      this.adress = adress
      this.hours = hours
      this.img = img
      this.content = this.init()
    }
    init() {
      const phoneNumber = this.tel.replace(/[()-\s]/g, '')
      const content = `
      <div class="map-panel">
      <span class="map-panel__heading">${this.heading}</span>
      <ul class="map-panel__list">
        <li class="map-panel__list-item">
          <span class="map-panel__list-heading">телефон:</span>
          <a href="tel:${phoneNumber}" class="map-panel__list-txt">${this.tel}</a>
        </li>
        <li class="map-panel__list-item">
          <span class="map-panel__list-heading">e-mail:</span>
          <a href="mailto:${this.email}" class="map-panel__list-txt">${this.email}</a>
        </li>
        <li class="map-panel__list-item">
          <span class="map-panel__list-heading">адрес:</span>
          <span class="map-panel__list-txt">${this.adress}</span>
        </li>
        <li class="map-panel__list-item">
          <span class="map-panel__list-heading">часы работы:</span>
          <span class="map-panel__list-txt">${this.hours}</span>
        </li>
      </ul>
      <div class="map-panel__image-wrap"><img class="map-panel__image" src="../../img/map/${this.img}" alt="" aria-hidden="true"></div>
      <div class="map-panel__icon-wrap"><img class="map-panel__icon" src="../../img/icons/map/main-mark.svg" alt="" aria-hidden="true"></div>
    </div>
      `
      return content
    }
  }
  var mainOffice = new panelContent(
    'ЦЕНТРАЛЬНЫЙ ОФИС',
    '+7 (495) 155-05-35',
    'info@pamyatnik.ru',
    'Москва, ул. Адмирала Корнилова, 50, стр. 1',
    'ежедневно, с 9:00 до 19:00',
    'main-office.jpg'
  ).content
  var office = new panelContent(
    'ОФИС',
    '+7 (495) 155-05-35',
    'info@pamyatnik.ru',
    'Москва, ул. Адмирала Корнилова, 50, стр. 1',
    'ежедневно, с 9:00 до 19:00',
    'main-office.jpg'
  ).content

  var panel = new ymaps.Panel()
  map.controls.add(panel, {
    float: md.matches ? 'bottom' : 'right',
  })

  window.myObjects = ymaps
    .geoQuery({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [55.61592356912356, 37.44884149999992],
          },
          options: {
            iconLayout: 'default#image',
            iconImageHref: 'img/icons/map/ellipse-mark.svg',
            iconImageSize: [
              md.matches ? rem(40) : rem(50),
              md.matches ? rem(40) : rem(50),
            ],
            iconImageOffset: [
              md.matches ? rem(-20) : rem(-25),
              md.matches ? rem(-20) : rem(-25),
            ],
            balloonContent: mainOffice,
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [55.62540896931073, 37.444722964645095],
          },
          options: {
            iconLayout: 'default#image',
            iconImageHref: 'img/icons/map/mark.svg',
            iconImageSize: [
              md.matches ? rem(14) : rem(20),
              md.matches ? rem(14) : rem(20),
            ],
            iconImageOffset: [
              md.matches ? rem(-7) : rem(-10),
              md.matches ? rem(-7) : rem(-10),
            ],
            balloonContent: office,
          },
        },
      ],
    })
    .addToMap(map)

  map.geoObjects.events.add('click', function (e) {
    var target = e.get('target')
    panel.setContent(target.options._options.balloonContent)
    !md.matches
      ? map.panTo(target.geometry.getCoordinates(), { useMapMargin: true })
      : null
  })

  document.querySelector(
    '.ymaps-2-1-79-controls__control_toolbar'
  ).style.margin = 0
  document.querySelector(
    '.ymaps-2-1-79-controls__control_toolbar'
  ).style.position = 'absolute'
  document.querySelector('.ymaps-2-1-79-controls__bottom').style.top =
    '104.8rem'

  map.controls.remove('geolocationControl')
  map.controls.remove('searchControl')
  map.controls.remove('trafficControl')
  map.controls.remove('typeSelector')
  map.controls.remove('fullscreenControl')
  map.controls.remove('zoomControl')
  map.controls.remove('rulerControl')
})
