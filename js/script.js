// HEADER
// Navigation on mobile devices
const headerBurger = document.querySelector('.header-upper__burger');

headerBurger.addEventListener('click', () => {
  nav.classList.toggle('active');
  headerBurger.classList.toggle('active');
  document.body.classList.toggle('locked');
});

// Open/close the search field on mobile devices
const searchFormMobile = document.querySelector('.header-upper__input-group');
const searchMobileBtn = document.querySelector('.header-upper__search-btn-mobile');
const searchInput = document.querySelector('.header-upper__input');
const btnCloseSearchFormMobile = document.querySelector('.header-upper__search-btn-close-mobile');

searchMobileBtn.addEventListener('click', () => {
  searchFormMobile.classList.add('active');
  searchInput.classList.add('active');
  btnCloseSearchFormMobile.classList.add('active');
});

btnCloseSearchFormMobile.addEventListener('click', () => {
  searchFormMobile.classList.remove('active');
  searchInput.classList.remove('active');
  btnCloseSearchFormMobile.classList.remove('active');
});

// Close the search form by clicking anywhere in the document
document.addEventListener('click', (e) => {
  const clicked = e.target;
  if (clicked !== searchMobileBtn && clicked !== searchInput) {
    searchFormMobile.classList.remove('active');
    searchInput.classList.remove('active');
    btnCloseSearchFormMobile.classList.remove('active');
  }
});

// Show/hide dropdowns lists
const dropdownContainer = document.querySelector('.header-lower__list');
const dropdownsCollection = document.querySelectorAll('.header-lower__dropdown');
const dropdownBtns = document.querySelectorAll('.header-lower__item-btn');

dropdownContainer.addEventListener('click', (e) => {
  const clicked = e.target.closest('.header-lower__item');
  if (!clicked) return;
  dropdownsCollection.forEach(dropdown => {
    if (dropdown !== clicked.querySelector('.header-lower__dropdown')) dropdown.classList.remove('active');
  });
  dropdownBtns.forEach(btn => {
    if (btn !== clicked.querySelector('.header-lower__item-btn')) btn.classList.remove('active');
  });
  clicked.querySelector('.header-lower__dropdown').classList.toggle('active');
  clicked.querySelector('.header-lower__item-btn').classList.toggle('active');
});

window.addEventListener('click', (e) => {
  const clicked = e.target;
  if (!clicked.closest('.header-lower__dropdown') && !clicked.closest('.header-lower__item-btn')) {
    dropdownsCollection.forEach(dropdown => dropdown.classList.remove('active'));
    dropdownBtns.forEach(btn => btn.classList.remove('active'));
  };
});

// Scroll to sections
const nav = document.querySelector('.nav');
nav.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: "smooth"});

    // Remove active class from navigation panel and burger menu icon after a link was clicked on mobile devices
    nav.classList.remove('active');
    headerBurger.classList.remove('active');
    document.body.classList.remove('locked');
  }
});

// HERO
// Swiper
const heroSwiper = new Swiper('.hero__swiper', {
  effect: 'fade',
  autoplay: {
    delay: 5000,
  },
  loop: true,
});

// GALLERY
// Select
const element = document.querySelector('.gallery__filters-select');
const choices = new Choices(element, {
  searchEnabled: false,
  itemSelectText: '',
});

// Swiper
const gallerySwiper = new Swiper('.gallery__swiper-container', {
  // Optional parameters
  breakpoints: {
    290: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 15,
      grid: {
        rows: 1,
      },
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
      grid: {
        rows: 2,
      },
    },
    964: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
      grid: {
        rows: 2,
      },
    },
    1241: {
      spaceBetween: 50,
      slidesPerView: 3,
      slidesPerGroup: 3,
      grid: {
        rows: 2,
      },
    }
  },
  // Navigation arrows
  navigation: {
    nextEl: '.gallery__btn-next',
    prevEl: '.gallery__btn-prev',
  },
  pagination: {
    el: ".gallery__page-number",
    type: "fraction"
  },
});

// Modal window
const gallerySlidesContainer = document.querySelector('.gallery__slides');
const modal = document.querySelector('.gallery__modal');
const modalImg = document.querySelector('.gallery__modal-img');
const btnCloseModal = document.querySelector('.gallery__modal-close');
const overlay = document.querySelector('.overlay');

// Open modal window
gallerySlidesContainer.addEventListener('click', (e) => {
  const clicked = e.target.closest('.gallery__slide');
  if (!clicked) return;

  modalImg.src = clicked.querySelector('.gallery__img').src;

  modal.classList.add('active');
  overlay.classList.add('active');
  document.body.classList.add('locked');
});

// Close modal window
[btnCloseModal, overlay].forEach(item => {
  item.addEventListener('click', () => {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('locked');
  });
});

// CATALOG
// Language tabs
const languagesContainer = document.querySelector('.catalog__languages-list');
const languagesTabs = document.querySelectorAll('.catalog__languages-btn');

const hideCatalogText = function() {
  if (window.innerWidth <= 767) document.querySelector('.catalog__text-container').classList.remove('active');
  if (window.innerWidth > 767) document.querySelector('.catalog__text-container').classList.add('active');
}
hideCatalogText();

languagesContainer.addEventListener('click', (e) => {
  const clicked = e.target.closest('.catalog__languages-btn');
  if (!clicked) return;

  languagesTabs.forEach(tab => tab.classList.remove('catalog__languages-btn--active'));
  clicked.classList.add('catalog__languages-btn--active');

  // Change the language of the content
  const changeContentLanguage = function(el) {
    document.querySelectorAll(el).forEach(text => text.classList.remove('active'));
    document.querySelector(`${el}--${clicked.dataset.language}`).classList.add('active');
  }
  if (window.innerWidth > 767) changeContentLanguage('.catalog__text');
  changeContentLanguage('.catalog__artist-name');
  changeContentLanguage('.catalog__artist-birthday');
  changeContentLanguage('.catalog__artist-desc');
});

// Accordion
$(function() {
  $('.accordion').accordion({
    heightStyle: 'content',
  });
});

// Painters tabs
const paintersContainer = document.querySelector('.catalog__painters-list');
const paintersTabs = document.querySelectorAll('.catalog__painters-tab');
const paintersTabsContent = document.querySelectorAll('.catalog__artist');

paintersContainer.addEventListener('click', (e) => {
  const clicked = e.target.closest('.catalog__painters-tab');
  if (!clicked) return;

  // Assigning the active class to the tabs
  paintersTabs.forEach(tab => tab.classList.remove('catalog__painters-tab--active'));
  paintersTabsContent.forEach(content => content.classList.remove('catalog__artist--active'));
  clicked.classList.add('catalog__painters-tab--active');
  document.querySelector(`.catalog__artist--${clicked.dataset.tab}`).classList.add('catalog__artist--active');

  // Scroll to the painter description on mobile devices
  if (window.innerWidth <= 963) {
    document.querySelector('.catalog__artist--active').scrollIntoView({behavior: 'smooth'}); 
  }
});

// Scroll to the gallery section
const goToGalleryBtnCollection = document.querySelectorAll('.catalog__no-content-link, .catalog__artist-link');
goToGalleryBtnCollection.forEach(link => {
  const id = link.getAttribute('href');
  document.querySelector(id).scrollIntoView({behavior: 'smooth'});
});

// EVENTS
// "Show all items" button
const btnShowEverything = document.querySelector('.events__btn');
const eventsCards = document.querySelectorAll('.events__card');

btnShowEverything.addEventListener('click', () => {
  eventsCards.forEach(card => card.style.display = 'flex');
  btnShowEverything.style.display = 'none';
});

// Swiper
const eventsSlider = document.querySelector('.events__cards');
let eventsSwiper;
const initEventsSwiper = function() {
  if (window.innerWidth <= 767 && eventsSlider.dataset.mobile == 'false') {
    eventsSwiper = new Swiper(eventsSlider, {
      slidesPerView: 1,
      spaceBetween: 10,
      autoHeight: true,
      pagination: {
        el: '.events-swiper__pagination',
        clickable: true,
        bulletClass: 'events-swiper__pagination-bullet',
        bulletActiveClass: 'events-swiper__pagination-bullet--active',
      },
      a11y: {
        paginationBulletMessage: 'Переход на слайд {{index}}',
      }
    });
    eventsCards.forEach(card => card.style.display = 'flex');
    eventsSlider.dataset.mobile = 'true';
  }
  if (window.innerWidth > 767 && eventsSlider.dataset.mobile == 'true') {
    eventsSlider.dataset.mobile = 'false';
    if (eventsSlider.classList.contains('swiper-initialized')) {
      eventsSwiper.destroy();
      eventsSwiper = undefined;
    }
  }
}
initEventsSwiper();

// EDITIONS
// Checkbox list
const editionsListContainer = document.querySelector('.editions__catagories-list');
const listTitle = document.querySelector('.editions__categories-title');
const editionsList = document.querySelectorAll('.editions__categories-item');
const checkboxList = document.querySelectorAll('.editions__categories-input');
const removeBtnsCollection = document.querySelectorAll('.editions__categories-btn-remove');

// Display the full list of categories
const renderFullList = function() {
  editionsList.forEach(item => item.classList.add('active'));
}

// Display only checked items when the list is hidden
const renderCheckedList = function() {
  editionsList.forEach(item => {
    if (item.querySelector('.editions__categories-input').checked) item.classList.add('active');
    else item.classList.remove('active');
  });
}

const initCategoriesList = function() {
  if (window.innerWidth <= 767) renderCheckedList();
  else renderFullList();
}
initCategoriesList();

const toggleRemoveBtnActiveClass = function(btn) {
  if (btn.querySelector('.editions__categories-input').checked) {
    btn.querySelector('.editions__categories-btn-remove').classList.add('active');
  }
  else {
    btn.querySelector('.editions__categories-btn-remove').classList.remove('active');
  }
}

// Hide or show the 'remove item' button depending on the width of the window
const hideCategoriesRemoveBtn = function() {
  removeBtnsCollection.forEach(btn => {
    if (window.innerWidth > 767) btn.classList.remove('active');
    if (window.innerWidth <= 767) {
      const editionsItem = btn.closest('.editions__categories-item');
      toggleRemoveBtnActiveClass(editionsItem);
    }
  });
}
hideCategoriesRemoveBtn();

// Show/hide the categories list
listTitle.addEventListener('click', () => {
  if (window.innerWidth <= 767) {
    listTitle.classList.toggle('active');
    if (listTitle.classList.contains('active')) renderFullList();
    else renderCheckedList();
  }
});

// Remove active state from a checkbox when the list is hidden
checkboxList.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    if (window.innerWidth <= 767 && !listTitle.classList.contains('active')) {
      checkbox.closest('.editions__categories-item').classList.remove('active');
    }
  });
});

// Remove checked state from the list item by clicking the remove button
removeBtnsCollection.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.editions__categories-item').querySelector('.editions__categories-input').checked = false;
    if (!listTitle.classList.contains('active')) btn.closest('.editions__categories-item').classList.remove('active');
  });
});

// Toggle the active class of items' remove button
editionsListContainer.addEventListener('click', (e) => {
  if (window.innerWidth <= 767) {
    const clickedEditionsItem = e.target.closest('.editions__categories-item');
    if (!clickedEditionsItem) return;    
    toggleRemoveBtnActiveClass(clickedEditionsItem);
  }
});

// Swiper
const editionsSwiperEl = document.querySelector('.editions__swiper-container')
let editionsSwiper;
const initEditionsSwiper = function() {
  if (window.innerWidth <= 767 && editionsSwiperEl.dataset.mobile === 'true') {
    editionsSwiperEl.dataset.mobile = 'false';
    if (editionsSwiperEl.classList.contains('swiper-initialized')) {
      editionsSwiper.destroy();
      editionsSwiper = undefined;
    }
  }
  if (window.innerWidth > 767 && editionsSwiperEl.dataset.mobile === 'false') {
    editionsSwiper = new Swiper(editionsSwiperEl, {
      breakpoints: {
        768: {
          spaceBetween: 34,
          slidesPerView: 2,
        },
        964: {
          spaceBetween: 47,
          slidesPerView: 2,
        },
        1241: {
          spaceBetween: 50,
          slidesPerView: 3,
          grid: {
            rows: 1,
          },
        }
      },
      pagination: {
        el: ".editions__page-number",
        type: "fraction"
      },
      navigation: {
        nextEl: '.editions__btn-next',
        prevEl: '.editions__btn-prev',
      },
      a11y: {
        prevSlideMessage: 'Переход на предыдущий слайд',
        nextSlideMessage: 'Переход на следующий слайд',
      }
    });
    editionsSwiperEl.dataset.mobile = 'true';
  }
}
initEditionsSwiper();

// PROJECTS
// Tooltips
tippy('#tooltip-1', {
  content: 'Пример современных тенденций - современная методология разработки',
  maxWidth: 264,
  allowHTML: true,
  theme: 'custom',
  trigger: 'mouseenter focus click focusin',
  hideOnClick: false,
});
tippy('#tooltip-2', {
  content: 'Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции',
  maxWidth: 264,
  allowHTML: true,
  theme: 'custom',
  trigger: 'mouseenter focus click focusin',
  hideOnClick: false,
});
tippy('#tooltip-3', {
  content: 'В стремлении повысить качество',
  maxWidth: 264,
  allowHTML: true,
  theme: 'custom',
  trigger: 'mouseenter focus click focusin',
  hideOnClick: false,
});

// Swiper
const projectsSwiper = new Swiper('.projects__swiper', {
  breakpoints: {
    768: {
      spaceBetween: 34,
      slidesPerView: 2,
      grid: {
        rows: 1,
      }
    },
    964: {
      spaceBetween: 50,
      slidesPerView: 2,
      grid: {
        rows: 1,
      }
    },
    1241: {
      spaceBetween: 50,
      slidesPerView: 3,
      grid: {
        rows: 1,
      }
    }
  },
  navigation: {
    nextEl: '.projects__btn-next',
    prevEl: '.projects__btn-prev',
  },
  a11y: {
    prevSlideMessage: 'Переход на предыдущий слайд',
    nextSlideMessage: 'Переход на следующий слайд',
  }
});

// CONTACTS
// Yandex map
// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init(){
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [55.75846806898367, 37.60108849999989],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 14
  });

  var myPlacemark = new ymaps.Placemark([55.75846806898367, 37.60108849999989], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/contacts/contacts-marker.svg',
    iconImageSize: [30, 42],
    iconImageOffset: [-3, -42]
  });

  // Размещение геообъекта на карте.
  myMap.geoObjects.add(myPlacemark);
}

// Input mask
const selector = document.querySelector("input[type='tel']");
const im = new Inputmask("+7 (999) 999-99-99");
im.mask(selector);
new JustValidate('.contacts__form', {
  rules: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 30,
    },
    tel: {
      required: true,
      function: (name, value) => {
        const phone = selector.inputmask.unmaskedvalue();
        return Number(phone) && phone.length === 10;
      }
    }
  },
  messages: {
    name: 'Недопустимый формат',
    tel: 'Недопустимый формат'
  },
  colorWrong: '#D11616',
  submitHandler: function(form, values, ajax) {
    ajax({
      url: '../php/mail.php',
      method: 'POST',
      data: values,
      async: true,
      callback: function(response) {
        document.querySelector('.contacts__form-message-success').style.display = 'inline-block';
      }
    })
  }
});

window.addEventListener('resize', () => {
  initEventsSwiper();
  initEditionsSwiper();
  initCategoriesList();
  hideCategoriesRemoveBtn();
  hideCatalogText();
});