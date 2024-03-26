if (document.querySelector('#map')) {
  class PanelContent {
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
        <div class="map-panel__image-wrap"><img class="map-panel__image" src="${this.img}" alt="" aria-hidden="true"></div>
        <div class="map-panel__icon-wrap"><img class="map-panel__icon" src="img/icons/map/main-mark.svg" alt="" aria-hidden="true"></div>
      </div>
        `
      return content
    }
  }
  var mainOffice = new PanelContent(
    'ЦЕНТРАЛЬНЫЙ ОФИС',
    '+7 (495) 155-05-35',
    'info@pamyatnik.ru',
    'Москва, ул. Адмирала Корнилова, 50, стр. 1',
    'ежедневно, с 9:00 до 19:00',
    'https://i.ibb.co/zJgD6bT/main-office.jpg'
  ).content
  var office = new PanelContent(
    'ОФИС',
    '+7 (495) 155-05-35',
    'info@pamyatnik.ru',
    'Москва, ул. Адмирала Корнилова, 50, стр. 1',
    'ежедневно, с 9:00 до 19:00',
    'https://i.ibb.co/zJgD6bT/main-office.jpg'
  ).content
  const md = window.matchMedia('(max-width: 48em)')
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
      center: md
        ? [55.594933092829535, 37.44918482275384]
        : [55.61592356912356, 37.44884149999992],
      zoom: 12,
      controls: [],
    })
    var panel = new ymaps.Panel()
    map.controls.add(panel, {
      float: md.matches ? 'bottom' : 'right',
    })

    const promise = new Promise((resolve, reject) => {
      if (document.querySelector('.main.mainpage')) {
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
                  iconImageSize: [md.matches ? 40 : 50, md.matches ? 40 : 50],
                  iconImageOffset: [
                    md.matches ? -20 : -25,
                    md.matches ? -20 : -25,
                  ],
                  balloonContent: mainOffice,
                  type: 'mainOffice',
                },
              },
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [55.626589040911746, 37.44718413867363],
                },
                options: {
                  iconLayout: 'default#image',
                  iconImageHref: 'img/icons/map/mark.svg',
                  iconImageSize: [md.matches ? 14 : 20, md.matches ? 14 : 20],
                  iconImageOffset: [
                    md.matches ? -7 : -10,
                    md.matches ? -7 : -10,
                  ],
                  balloonContent: office,
                  type: 'office',
                },
              },
            ],
          })
          .addToMap(map)
      }
      if (document.querySelector('.main.contacts')) {
        window.myObjects = ymaps
          .geoQuery({
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [55.603482126638916, 37.451518840271184],
                },
                options: {
                  iconLayout: 'default#image',
                  iconImageHref: 'img/icons/map/ellipse-mark.svg',
                  iconImageSize: [md.matches ? 40 : 50, md.matches ? 40 : 50],
                  iconImageOffset: [
                    md.matches ? -20 : -25,
                    md.matches ? -20 : -25,
                  ],
                  balloonContent: mainOffice,
                  type: 'mainOffice',
                },
              },
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [55.61029502521985, 37.44125915138204],
                },
                options: {
                  iconLayout: 'default#image',
                  iconImageHref: 'img/icons/map/mark.svg',
                  iconImageSize: [md.matches ? 14 : 20, md.matches ? 14 : 20],
                  iconImageOffset: [
                    md.matches ? -7 : -10,
                    md.matches ? -7 : -10,
                  ],
                  balloonContent: office,
                  type: 'office',
                },
              },
            ],
          })
          .addToMap(map)
      }
      setTimeout(
        () =>
          resolve(
            window.myObjects._objects.forEach(object => {
              if (object.options._options.type === 'mainOffice') {
                document.querySelector('.customControl .content').innerHTML =
                  object.options._options.balloonContent
                !md.matches
                  ? map.panTo(object.geometry.getCoordinates(), {
                      useMapMargin: true,
                    })
                  : null
              }
            })
          ),
        1000
      )
    })

    map.geoObjects.events.add('click', function (e) {
      var target = e.get('target')
      window.myObjects._objects.forEach(object => {
        object.options.set({
          iconImageHref: 'img/icons/map/mark.svg',
          iconImageSize: [md.matches ? 14 : 20, md.matches ? 14 : 20],
          iconImageOffset: [md.matches ? -7 : -10, md.matches ? -7 : -10],
        })
      })
      setActiveOptions(target)
    })

    var setActiveOptions = object => {
      object.options.set({
        iconImageHref: 'img/icons/map/ellipse-mark.svg',
        iconImageSize: [md.matches ? 40 : 50, md.matches ? 40 : 50],
        iconImageOffset: [md.matches ? -20 : -25, md.matches ? -20 : -25],
      })
      document.querySelector('.customControl .content').innerHTML = ''
      panel.setContent(object.options._options.balloonContent)
      !md.matches
        ? map.panTo(object.geometry.getCoordinates(), { useMapMargin: true })
        : null
    }
    var removeActiveOptions = object => {
      object.options.set({
        iconImageHref: 'img/icons/map/mark.svg',
        iconImageSize: [md.matches ? 14 : 20, md.matches ? 14 : 20],
        iconImageOffset: [md.matches ? -7 : -10, md.matches ? -7 : -10],
      })
    }

    const switchers = document.querySelectorAll('.map-contacts__btn')

    if (switchers.length) {
      document.addEventListener('click', function (e) {
        if (e.target.closest('.map-contacts__btn')) {
          const switcherId = e.target.closest('.map-contacts__btn').id
          window.myObjects._objects.forEach(object => {
            removeActiveOptions(object)
            if (
              object.options._options.type === 'mainOffice' &&
              switcherId === 'mainOfficeSwitch'
            ) {
              setActiveOptions(object)
            }
            if (
              object.options._options.type === 'office' &&
              switcherId === 'officeSwitch'
            ) {
              setActiveOptions(object)
            }
          })
        }
      })
    }

    document.querySelector(
      '.ymaps-2-1-79-controls__control_toolbar'
    ).style.margin = 0
    document.querySelector(
      '.ymaps-2-1-79-controls__control_toolbar'
    ).style.position = 'absolute'
    document.querySelector('.ymaps-2-1-79-controls__bottom').style.top =
      '104.8rem'

    map.behaviors.disable('scrollZoom')
    map.behaviors.disable('dblClickZoom')
    map.controls.remove('geolocationControl')
    map.controls.remove('searchControl')
    map.controls.remove('trafficControl')
    map.controls.remove('typeSelector')
    map.controls.remove('fullscreenControl')
    map.controls.remove('zoomControl')
    map.controls.remove('rulerControl')
  })
}
