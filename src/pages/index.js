import './index.css'

import {
  validationSettings,
  forms,
  elementsSelector,
  cardTemplateSelector,
  popupProfileFormSelector,
  popupCardFormSelector,
  popupFullViewSelector,
  popupDeleteCardSelector,
  popupChangeAvatar,
  openFormBtn,
  addCardBtn,
  changeAvatarBtn,
  userSelectors,
  formConnectorData,
  avatarConnectorData,
  apiData,
  wrongImagePlaceHolderSrc
} from '../utils/constants.js'

import Card from '../components/Card';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithImage from '../components/PopupWithImage';
import PopupDeleteCard from '../components/PopupDeleteCard';
import UserInfo from '../components/UserInfo'
import Api from '../components/Api'


function initiateValidation(forms) {
  forms.forEach(form => {
    const formValidator = new FormValidator(validationSettings, form);
    formValidator.enableValidation();
  })
}

function setScrollbarWidth() {
  document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px");
}


function init() {

  initiateValidation(forms);
  setScrollbarWidth();

  let cardsSection;
  const userInfo = new UserInfo(userSelectors);
  const api = new Api(apiData);

  api.getUserInfo().then(result => {
    userInfo.setAvatar(result.avatar);
    userInfo.setUserInfo(result.name, result.about, result._id);
    api.getInitialCards().then(result => {
      cardsSection = new Section({
        items: result, renderer: (item) => {
          return createCardItem(item);
        }
      }, elementsSelector);
      cardsSection.renderItems();
    })
    .catch(console.log);

  })
  .catch(console.log);

  function createCardItem(item) {
    const cardOwnerIsCurrent = (item.owner._id === userInfo.userId);
    const isLiked = item.likes.find(user => user._id === userInfo.userId);
    const newCard = new Card(item, cardTemplateSelector,
      cardOwnerIsCurrent, isLiked, wrongImagePlaceHolderSrc,
      () => { popupFullView.open(item) },
      (obj, id) => {
        popupDeleteCard.open(obj, id)
      },
      (id) => {
        if (!newCard.isLiked) {
          api.likeCard(id).then(result => {
            newCard.toggleLike(result.likes.length)
          })
            .catch(console.log)
        } else {
          api.dislikeCard(id).then(result => {
            newCard.toggleLike(result.likes.length);
          })
            .catch(console.log)
        }
      })
    return newCard.createCard();
  }


  const popupDeleteCard = new PopupDeleteCard(popupDeleteCardSelector,
    (e, object, id) => {
      e.preventDefault();
      popupDeleteCard.setLoading();
      api.deleteCard(id).then(() => {
        object.remove();
        popupDeleteCard.close();
      })
        .catch(console.log)
        .finally(()=>{popupDeleteCard.setLoaded()})
    });
  popupDeleteCard.setEventListeners();

  const popupProfile = new PopupWithForm(popupProfileFormSelector,
    (e, inputValues) => {
      e.preventDefault();
      popupProfile.setLoading();
      api.setUserInfo(...inputValues).then(result => {
        userInfo.setUserInfo(result.name, result.about);
        popupProfile.close();
      })
        .catch(console.log)
        .finally(()=>{popupProfile.setLoaded()})
    });
  popupProfile.setEventListeners();

  const popupNewCard = new PopupWithForm(popupCardFormSelector,
    (e, inputValues) => {
      e.preventDefault();
      popupNewCard.setLoading();
      api.addNewCard(...inputValues).then(item => {
        cardsSection.addItem(createCardItem(item));
        popupNewCard.close();
      })
        .catch(console.log)
        .finally(()=>{popupNewCard.setLoaded()})

    })
  popupNewCard.setEventListeners();

  const popupFullView = new PopupWithImage(popupFullViewSelector);
  popupFullView.setEventListeners();

  const popupAvatar = new PopupWithForm(popupChangeAvatar,
    (e, inputValues)=> {
    e.preventDefault();
    popupAvatar.setLoading();
    api.setUserAvatar(...inputValues).then(result => {
      userInfo.setAvatar(result.avatar);
      popupAvatar.close();
    })
    .catch(console.log)
    .finally(()=>{popupAvatar.setLoaded()})
  })
  popupAvatar.setEventListeners();

  addCardBtn.addEventListener('click', () => {
    popupNewCard.open();
  })

  changeAvatarBtn.addEventListener('click',() => {
    popupAvatar.setValues(userInfo.getAvatarSrc(), avatarConnectorData)
    popupAvatar.open();
  })

  openFormBtn.addEventListener('click', () => {
    popupProfile.open();
    popupProfile.setValues(userInfo.getUserInfo(), formConnectorData)
  });

}

init();
