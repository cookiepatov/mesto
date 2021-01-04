const popup = document.querySelector('.popup');
const openFormBtn = document.querySelector('.profile__edit-button');
const closeFormBtn = document.querySelector('.popup__close-button');
const submitFormBtn = document.querySelector('.popup__submit-button');
const likesContainer = document.querySelectorAll('.element__like-button');
const body = document.querySelector('.body');

const form = {
  name: document.querySelector('.popup__input_type_name'),
  description: document.querySelector('.popup__input_type_description')
}

const profile = {
  name: document.querySelector('.profile__name'),
  description: document.querySelector('.profile__description')
}

function renderFormInfo() {
  form.name.value = profile.name.innerText,
  form.description.value = profile.description.innerText
}

function overlayClick(e) {
  if (e.target.classList.contains('popup')) {
    closeForm();
  }
}

function openForm() {
  if (popup.classList.contains('popup_opened')) {
    return;
  }
  else {
    renderFormInfo()
    popup.classList.add('popup_opened');
    body.classList.add('no-scroll');
  }
}

function closeForm() {
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
    body.classList.remove('no-scroll');
  }
}

function submitForm(e) {
  e.preventDefault();
  profile.name.innerText = form.name.value;
  profile.description.innerText = form.description.value;
  closeForm();
}


function init () {
  openFormBtn.addEventListener('click', openForm);
  closeFormBtn.addEventListener('click', closeForm);
  popup.addEventListener('submit', submitForm);
  popup.addEventListener('mousedown', overlayClick);

  likesContainer.forEach(likeBtn => {
    likeBtn.addEventListener('click', function() {
      likeBtn.classList.toggle('element__like-button_active');
    })
  });
}

init();
