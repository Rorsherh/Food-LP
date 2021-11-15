'use strict';
window.addEventListener('DOMContentLoaded', () =>{

  // реализация табов

  const tabsList = document.querySelectorAll('.tabheader__item');
  const tabContentList = document.querySelectorAll('.tabcontent');
  const tabsContainer = document.querySelector('.tabheader__items');

  /**
   * функция скрывает контент табов
   */
  function hideTabContent() {
    tabsList.forEach(_tabItem => {
      _tabItem.classList.remove('tabheader__item_active');
    });

    tabContentList.forEach(_tabContentItem => {
      _tabContentItem.classList.remove('show', 'fade');
      _tabContentItem.classList.add('hide');
    });
  }

  /**
   * функция показывающая контент таба
   * @param {*} _tabItemNum - номер показываетмого таба
   */
  function showTabContent(_tabItemNum = 0) {
    tabsList[_tabItemNum].classList.add('tabheader__item_active');
    tabContentList[_tabItemNum].classList.remove('hide');
    tabContentList[_tabItemNum].classList.add('show', 'fade');
  }


  hideTabContent();
  showTabContent(1);

  // обработчик события для переключения табов
  tabsContainer.addEventListener('click', function(_event){
    const target = _event.target;
    if (target && target.matches('.tabheader__item')) {
      tabsList.forEach((_tabItem, _tabItemNum) => {
        if (target === _tabItem) {
          hideTabContent();
          showTabContent(_tabItemNum);
        }
      });
    }
  });



  // timer

  const endTime = '2021-12-10';
  
  /**
   * функция расчитывающая время до конца окончания акции
   * @param {*string} _endTime - дата окончания акции
   * @returns возвращет обьект содержащий общее время до конца акции, а также кол-во дней, часов, минут,секунд 
   */
  function getTimeRemaining(_endTime) {
    const t = Date.parse(_endTime) - Date.parse(new Date());
    const days = Math.floor(t / 1000 / 60 / 60 / 24);
    const hours = Math.floor((t/1000/60/60) % 24);
    const minuts = Math.floor((t/1000/60) %60);
    const seconds = Math.floor((t/1000) %60);

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minuts,
      'seconds': seconds
    };
  }

  function getZero(_num) {
    if (_num>=0 && _num < 10) {
      return '0' + _num;
    }
    else {
      return _num;
    }
  }

  /**
   * функция принимает элемент таймера на странице и обнавляет его
   * @param {*} _selector элемент страницы выполняющий роль таймера
   * @param {*} _endTime 
   * @returns 
   */
  function setClock(_selector, _endTime=0) {
    const timerElem = document.querySelector(_selector);
    const days = timerElem.querySelector('#days');
    const hours = timerElem.querySelector('#hours');
    const minutes = timerElem.querySelector('#minutes');
    const seconds = timerElem.querySelector('#seconds');

    const timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(_endTime);

      days.textContent = getZero(t.days);
      hours.textContent = getZero(t.hours);
      minutes.textContent = getZero(t.minutes);
      seconds.textContent = getZero(t.seconds);

      if (t.total < 0) {
        clearInterval(timeInterval);
      }
    }
    return timerElem;
  }

  setClock('.timer', endTime);



  // modal

  const modalTrigger = document.querySelectorAll('[data-modal]');
  const modal = document.querySelector('.modal');
  const modalCloseBtn = document.querySelector('[data-modalClose]');

  function showModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalShowId);
  }

  function hideModal() {
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
  }


  modalTrigger.forEach((_modalTriggerItem) =>{
    _modalTriggerItem.addEventListener('click', showModal);
  });

  modalCloseBtn.addEventListener('click', hideModal);
  modal.addEventListener('click', (_event) => {
    if (_event.target === modal) {
      hideModal();
    }
  });
  document.addEventListener('keydown', (_event) =>{
    if ((_event.code === 'Escape') && (modal.classList.contains('show'))) {
      hideModal();
    }
  });

  //pageYOffset - свойство окна Window , доступное только для чтения. Это то же свойство, что и scrollY и, как таковое,
  // оно тоже возвращает количество пикселей, на которое прокручен документ по вертикали (вниз или вверх).
  // Значение свойства равное 0.0 говорит о том, что в данный момент верхний край документа Document
  // совпадает с верхним краем области содержимого окна.

  //Element.clientHeight -Для остальных элементов - значение равно внутренней высоте элемента в пикселах,
  //включая пространство между содержимым элемента и его границей (padding),но исключая высоту полосы горизонтальной прокрутки,
  //и ширину отступа от границы элемента до родительского элемента (margin).
  function showModalByScroll() {
    if ((window.pageYOffset + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
        showModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
}

/** константа в которой хранится время время до показа модального окна */  
const modalShowId = setTimeout(showModal, 24000);
window.addEventListener('scroll', showModalByScroll);


// Используем классы для создания корточек

class MenuCard {
  /**
   * Создает экземпляр карточки
   * @constructor
   * @this {MenuCard}
   * @param {*} _src - путь до картинки
   * @param {string} _alt - альтернативных текс картинки
   * @param {*} _title - заголовок карточки
   * @param {*} _descr - описание карточки
   * @param {number} _price - цена товара
   * @param {string} _parentSelector - селектор в который вставляется карточка
   */
  constructor(_src, _alt, _title, _descr, _price, _parentSelector) {
    this.src = _src;
    this.alt = _alt;
    this.title = _title;
    this.descr = _descr;
    this.price = _price;
    this.parent = document.querySelector(_parentSelector);
    /** Курс валют */
    this.transfer = 27;

    this.changeToUAH();
  }

  /**
   * Переводит цену товара в гривны
   */
  changeToUAH() {
    this.price = this.price * this.transfer;
  }

  /**
   * создает карточку товара и рендерит ее в верстку
   */
  render() {
    const element = document.createElement('div');
    element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
                `;
                this.parent.append(element);
  }
}

new MenuCard(
  "img/tabs/vegy.jpg",
  "vegy",
  'Меню "Фитнес"',
  'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  9,
  '.menu .container'
).render();

new MenuCard(
  "img/tabs/elite.jpg",
  "elite",
  'Меню “Премиум”',
  'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
  14,
  '.menu .container'
).render();

new MenuCard(
  "img/tabs/post.jpg",
  "post",
  'Меню "Постное"',
  'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
  24,
  '.menu .container'
).render();




});