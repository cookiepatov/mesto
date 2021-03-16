import { Card } from './card.js';
import { initialCards } from './data/cards-data.js';
import { settings } from './data/validation-settings.js'
import { FormValidator } from './FormValidator.js';

const forms = Array.from(document.querySelectorAll(settings.formSelector));

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
const cardTemplateSelector = '#card-template';
const elements = document.querySelector('.elements');

//Объекты с текстовыми полями

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

//Функции запускающиеся при инициализации


function renderInitialCards(array) {
  array.forEach(element=>{
    const card = createCard(element);
    addCard(card);
  })
}


function initiateValidation(forms) {
  forms.forEach(form=> {
    const formValidator = new FormValidator(settings, form);
    formValidator.enableValidation();
  })
}

function setScrollbarWidth() {
  document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px");
}


//Отображение контента попапов


function renderProfileFormInfo() {
  formProfile.name.value = profile.name.innerText,
  formProfile.description.value = profile.description.innerText
}


function setFullView(link, name) {
  fullPic.src = link;
  fullPic.alt = name;
  fullViewTitle.textContent = name;
  openPopup(popupFullView);
}

//Работа с попапами



function openPopup(popup) {
  body.classList.add('no-scroll');
  popup.classList.add('popup_opened');
  document.addEventListener('keydown',escapeHandler);
}

function closePopup() {
  const openedPopup = document.querySelector('.popup_opened');
  openedPopup.classList.remove('popup_opened');
  body.classList.remove('no-scroll');
  document.removeEventListener('keydown',escapeHandler);
}

function overlayClick(e) {
  if (e.target.classList.contains('popup')) {
    closePopup();
  }
}
function escapeHandler(e) {
  if(e.key==='Escape'){
    closePopup();
  };
}

function submitProfileForm(e) {
  e.preventDefault();
  profile.name.innerText = formProfile.name.value;
  profile.description.innerText = formProfile.description.value;
  closePopup();
}

function submitCardForm(e) {
  e.preventDefault();
  const element = {name: formNewCard.name.value, link: formNewCard.data.value};
  const card = createCard(element);
  addCard(card);
  closePopup();
}


function createCard(element) {
  const cardElement = new Card(element, cardTemplateSelector, setFullView)
  return cardElement.createCard();
}

function addCard(card) {
  elements.prepend(card);
}

function resetCardPopup() {
  popupCardForm.reset();
}

function init () {
  initiateValidation(forms);
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
