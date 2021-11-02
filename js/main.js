'use strict';
window.addEventListener('DOMContentLoaded', () =>{

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
  showTabContent();

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
});