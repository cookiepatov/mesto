import './index.css'

import {
  initialCards,
  validationSettings,
  forms,
  elementsSelector,
  cardTemplateSelector,
  popupProfileFormSelector,
  popupCardFormSelector,
  popupFullViewSelector,
  openFormBtn,
  addCardBtn,
  userSelectors,
  formConnectorData
} from '../utils/constants.js'

import Card from '../components/Card';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithImage from '../components/PopupWithImage';
import UserInfo from '../components/UserInfo'


function initiateValidation(forms) {
  forms.forEach(form=> {
    const formValidator = new FormValidator(validationSettings, form);
    formValidator.enableValidation();
  })
}

function setScrollbarWidth() {
  document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px");
}


function init () {
  function createCardItem(item) {
    return new Card(item, cardTemplateSelector, ()=>{popupFullView.open(item)}).createCard()
  }

  initiateValidation(forms);
  setScrollbarWidth();

  const cardsSection = new Section({items: initialCards, renderer: (item)=>{
    return createCardItem(item);
  }}, elementsSelector);

  cardsSection.renderItems();


  const userInfo = new UserInfo(userSelectors);

  const popupProfile = new PopupWithForm(popupProfileFormSelector,
   (e, inputValues)=>{
    e.preventDefault();
    userInfo.setUserInfo(inputValues[0], inputValues[1]);
    popupProfile.close();
  });
  popupProfile.setEventListeners();

  openFormBtn.addEventListener('click',()=>{
    popupProfile.open();
    popupProfile.setValues(userInfo.getUserInfo(), formConnectorData)
  });

  const popupNewCard = new PopupWithForm(popupCardFormSelector,
    (e, inputValues)=>{
      e.preventDefault();
      const item =   {
        name: inputValues[0],
        link: inputValues[1]
      }
      cardsSection.addItem(createCardItem(item));
      popupNewCard.close();
  })
  popupNewCard.setEventListeners();

  addCardBtn.addEventListener('click',()=>{
    popupNewCard.open();
  })

  const popupFullView = new PopupWithImage(popupFullViewSelector);
  popupFullView.setEventListeners();

}

init();
