const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const closeProfileFormBtn = popupProfile.querySelector('.popup__close-button');

const popupCard = document.querySelector('.popup_type_card');
const popupCardForm = popupCard.querySelector('.popup__form');
const closeCardFormBtn = popupCard.querySelector('.popup__close-button');

const popupFullView = document.querySelector('.popup_type_full-view');
const closeFullViewBtn = popupFullView.querySelector('.popup__close-button');

const openFormBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');

const body = document.querySelector('.body');
const cardTemplate = document.querySelector('#card-template');
const elements = document.querySelector('.elements');

const initialCards = [
  {
    name: 'Борисово',
    link: 'https://sun9-52.userapi.com/impg/CL3PVuFGYb1SEWs85Re0TLiMKp7ONGFwp9PaYg/-nplw3ZPS5c.jpg?size=2000x700&quality=96&proxy=1&sign=3887ec7f9a0901fe5089fed815879ea9&type=album'
  },
  {
    name: 'Дендропарк в Бирюлёво',
    link: 'https://sun9-9.userapi.com/impg/QyyGgUhwIPVWHJSJgVZT0qDx_8--wCqwh3Y6RA/mfmSnV25M7Y.jpg?size=1000x700&quality=96&proxy=1&sign=491d30ca0baba306850eb4e222c87e3c&type=album'
  },
  {
    name: 'Калининград',
    link: 'https://sun9-65.userapi.com/impg/DVh2ArDKrjyUr3_r2RPoYeY_vHLfcJVfxSlm8g/tha0Z_Fqbpo.jpg?size=2560x1638&quality=96&proxy=1&sign=cdf893318879ed381cc4c04df6a4b4d1&type=album'
  },
  {
    name: 'Котор',
    link: 'https://sun9-56.userapi.com/impg/byA7uFe7FJNv0vMAk2q0TsVgzNZuYxmIq-JAGQ/nfA3p24XFrw.jpg?size=2560x1587&quality=96&proxy=1&sign=bd8d87536a6465c7d8ccbc2d85958d3a&type=album'
  },
  {
    name: 'Суздаль',
    link: 'https://sun9-61.userapi.com/impg/-vfiNXrhNjbRW1ksbmdFjSZI_Y04clULTFhdJg/3gwIWQWQp2o.jpg?size=2560x1681&quality=96&proxy=1&sign=53aefbad5f2c58098ffb61940cdc7a6a&type=album'
  },
  {
    name: 'Тиват',
    link: 'https://sun9-67.userapi.com/impg/H_Flnzr-gxgd2Z3Lor5kQdXH7NU2T9_Xd2L_vg/RQFkkCHugd8.jpg?size=2560x1535&quality=96&proxy=1&sign=c8ad7af02d0a55a0b52c260c2dfeb468&type=album'
  }
];

function renderInitialCards(array) {
  array.forEach(element=>{
    addCard(element.link, element.name)
  })
  //Ниже считаю ширину скроллбара, чтобы корректно высчитывать высоту элементов относительно ширины экрана в vw.
  document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px");
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

function errorHandler(e)
{
  console.log('Неккоректный url: ' + e.target.src);
  e.target.src='https://images.unsplash.com/photo-1504930268766-d71549a36ec2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1307&q=80';

}

function addCard(link, name) {
  const newCard = cardTemplate.content.querySelector('.element').cloneNode(true);
  const pic = newCard.querySelector('.element__picture');
  pic.src=link;
  pic.alt=name;
  pic.onerror = errorHandler;
  newCard.querySelector('.element__text').textContent=name;
  newCard.querySelector('.element__like-button').addEventListener('click', function() {
    this.classList.toggle('element__like-button_active')});
  newCard.querySelector('.element__delete-button').addEventListener('click', function(e){
    e.target.closest('.element').remove();
  });
  newCard.querySelector('.element__picture-button').addEventListener('click', function(){
    openFullView(link, name);
  })
  elements.prepend(newCard);
}

function openProfileForm() {
  if (popupProfile.classList.contains('popup_opened')) {
    return;
  }
  else {
    renderProfileFormInfo()
    popupProfile.classList.add('popup_opened');
    body.classList.add('no-scroll');
  }
}

function submitProfileForm(e) {
  e.preventDefault();
  profile.name.innerText = formProfile.name.value;
  profile.description.innerText = formProfile.description.value;
  closeProfileForm();
}

function closePopup(e) {
  const popup=e.target.closest('.popup');
  if (popup.classList.contains('popup_opened'))
  {
    popup.classList.remove('popup_opened');
    body.classList.remove('no-scroll');
  }
}

function openCardForm() {
  if (popupCard.classList.contains('popup_opened')) {
    return;
  }
  else {
    popupCardForm.reset();
    popupCard.classList.add('popup_opened');
    body.classList.add('no-scroll');
  }
}

function submitCardForm(e) {
  e.preventDefault();
  const name = formNewCard.name.value;
  const link = formNewCard.data.value;
  addCard(link, name);
  closePopup(e);
}


function openFullView(link, name) {
  body.classList.add('no-scroll');
  const pic = popupFullView.querySelector('.popup__full-picture');
  pic.src=link;
  pic.alt=name;
  pic.onerror = errorHandler;
  popupFullView.querySelector('.popup__picture-title').textContent=name;
  popupFullView.classList.add('popup_opened');
}

function init () {
  renderInitialCards(initialCards);

  openFormBtn.addEventListener('click', openProfileForm);
  closeProfileFormBtn.addEventListener('click', closePopup);
  popupProfileForm.addEventListener('submit', submitProfileForm);
  popupProfile.addEventListener('click', overlayClick);

  addCardBtn.addEventListener('click', openCardForm);
  closeCardFormBtn.addEventListener('click', closePopup);
  popupCardForm.addEventListener('submit', submitCardForm);
  popupCard.addEventListener('click', overlayClick);

  closeFullViewBtn.addEventListener('click', closePopup);
  popupFullView.addEventListener('click', overlayClick);
}

init();
