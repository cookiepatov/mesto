import './index.css'

import {
  validationSettings,
  formProfile,
  formNewCard,
  formAvatar,
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


function setScrollbarWidth() {
  document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px");
}

function init() {

  setScrollbarWidth();

  const validatorFormProfile = new FormValidator(validationSettings, formProfile);
  validatorFormProfile.enableValidation();

  const validatorFormNewCard = new FormValidator(validationSettings, formNewCard);
  validatorFormNewCard.enableValidation();

  const validatorFormAvatar = new FormValidator(validationSettings, formAvatar);
  validatorFormAvatar.enableValidation();

  let cardsSection;

  const userInfo = new UserInfo(userSelectors, wrongImagePlaceHolderSrc);
  const api = new Api(apiData);


  Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([{name, about, _id, avatar}, cards])=>{
    userInfo.setAvatar(avatar);
    userInfo.setUserInfo(name, about, _id);
    cardsSection = new Section({
      items: cards, renderer: (item) => {
        return createCardItem(item);
      }
    }, elementsSelector);
    cardsSection.renderItems();
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
        newCard.setLikeLoading();
        if (!newCard.isLiked) {
          api.likeCard(id).then(({likes}) => {
            newCard.toggleLike(likes.length)
          })
            .catch(console.log)
            .finally(()=>{newCard.setLikeLoaded()});
        } else {
          api.dislikeCard(id).then(({likes}) => {
            newCard.toggleLike(likes.length);
          })
            .catch(console.log)
            .finally(()=>{newCard.setLikeLoaded()});
        }
      })
    return newCard.createCard();
  }

  const popupDeleteCard = new PopupDeleteCard(popupDeleteCardSelector,
    (e, object, id) => {
      e.preventDefault();
      popupDeleteCard.setLoading();
      api.deleteCard(id).then(() => {
        object.deleteCard();
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
      api.setUserInfo(...inputValues).then(({name, about}) => {
        userInfo.setUserInfo(name, about);
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

  const popupFullView = new PopupWithImage(popupFullViewSelector, wrongImagePlaceHolderSrc);
  popupFullView.setEventListeners();

  const popupAvatar = new PopupWithForm(popupChangeAvatar,
    (e, inputValues)=> {
    e.preventDefault();
    popupAvatar.setLoading();
    api.setUserAvatar(...inputValues).then(({avatar}) => {
      userInfo.setAvatar(avatar);
      popupAvatar.close();
    })
    .catch(console.log)
    .finally(()=>{popupAvatar.setLoaded()})
  })
  popupAvatar.setEventListeners();

  addCardBtn.addEventListener('click', () => {
    validatorFormNewCard.resetValidation();
    popupNewCard.open();
  })

  changeAvatarBtn.addEventListener('click',() => {
    validatorFormAvatar.resetValidation();
    popupAvatar.setValues(userInfo.getAvatarSrc(), avatarConnectorData);
    popupAvatar.open();
  })

  openFormBtn.addEventListener('click', () => {
    validatorFormProfile.resetValidation();
    popupProfile.setValues(userInfo.getUserInfo(), formConnectorData);
    popupProfile.open();
  });

}

init();
