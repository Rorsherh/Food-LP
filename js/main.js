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
   * @param {*} _selector 
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
  
});