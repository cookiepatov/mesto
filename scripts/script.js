import initialCards from './data/cards-data.js';

const errorImgUrl = 'https://images.unsplash.com/photo-1504930268766-d71549a36ec2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1307&q=80';

const popups = document.querySelectorAll('.popup');

const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileForm = popupProfile.querySelector('.popup__form');

const popupCard = document.querySelector('.popup_type_card');
const popupCardForm = popupCard.querySelector('.popup__form');

const popupFullView = document.querySelector('.popup_type_full-view');
const fullPic = popupFullView.querySelector('.popup__full-picture');
const fullViewTitle = popupFullView.querySelector('.popup__picture-title');

const openFormBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');

const body = document.querySelector('.body');
const cardTemplate = document.querySelector('#card-template');
const elements = document.querySelector('.elements');

function renderInitialCards(array) {
  array.forEach(element=>{
    const card = createCard(element.link, element.name);
    addCard(card);
  })
}

const formProfile = {
  name: popupProfile.querySelector('.popup__input_type_name'),
  description: popupProfile.querySelector('.popup__input_type_data')
}

const formNewCard = {
  name: popupCard.querySelector('.popup__input_type_name'),
  data: popupCard.querySelector('.popup__input_type_data')
}

const profile = {
  name: document.querySelector('.profile__name'),
  description: document.querySelector('.profile__description')
}

function renderProfileFormInfo() {
  formProfile.name.value = profile.name.innerText,
  formProfile.description.value = profile.description.innerText
}

function overlayClick(e) {
  if (e.target.classList.contains('popup')) {
    closePopup(e);
  }
}

function errorHandler(e) {
  console.log('Неккоректный url: ' + e.target.src);
  e.target.src = errorImgUrl;
}

function createCard(link, name) {
  const newCard = cardTemplate.content.querySelector('.element').cloneNode(true);
  const pic = newCard.querySelector('.element__picture');
  pic.src=link;
  pic.alt=name;
  pic.onerror = errorHandler;
  newCard.querySelector('.element__text').textContent=name;
  newCard.querySelector('.element__like-button').addEventListener('click', function() {
    this.classList.toggle('element__like-button_active')});
  newCard.querySelector('.element__delete-button').addEventListener('click', function(e) {
    e.target.closest('.element').remove();
  });
  newCard.querySelector('.element__picture-button').addEventListener('click', function() {
    openPopup(popupFullView);
    renderFullView(link, name);
  });
  return newCard;
}

function addCard(card) {
  elements.prepend(card);
}

function openPopup(popup) {
  body.classList.add('no-scroll');
  popup.classList.add('popup_opened');
  document.addEventListener('keydown',escapeHandler);
}

function escapeHandler(e) {
  if(e.key==='Escape'){
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
}

function closePopup(e) {
  let popup;
  if(e.target){
    popup=e.target.closest('.popup');
  }
  else {
    popup=e;
  }
  popup.classList.remove('popup_opened');
  body.classList.remove('no-scroll');
  document.removeEventListener('keydown',escapeHandler);
}

function submitProfileForm(e) {
  e.preventDefault();
  profile.name.innerText = formProfile.name.value;
  profile.description.innerText = formProfile.description.value;
  closePopup(e);
}

function submitCardForm(e) {
  e.preventDefault();
  const name = formNewCard.name.value;
  const link = formNewCard.data.value;
  const card = createCard(link, name);
  addCard(card);
  closePopup(e);
}

function resetCardPopup() {
  popupCardForm.reset();
}

function renderFullView(link, name) {
  fullPic.src = link;
  fullPic.alt = name;
  fullPic.onerror = errorHandler;
  fullViewTitle.textContent = name;
}

function setScrollbarWidth() {
  document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px");
}

function init () {
  renderInitialCards(initialCards);

  setScrollbarWidth();

  popups.forEach((popup) => {
    popup.addEventListener('pointerdown', overlayClick);
    const closeBtn = popup.querySelector('.popup__close-button');
    closeBtn.addEventListener('click', closePopup);
  });

  openFormBtn.addEventListener('click',()=>{
    openPopup(popupProfile);
    renderProfileFormInfo();
  });
  popupProfileForm.addEventListener('submit', submitProfileForm);

  addCardBtn.addEventListener('click',()=>{
    resetCardPopup();
    openPopup(popupCard);
  });
  popupCardForm.addEventListener('submit', submitCardForm);

}

init();
