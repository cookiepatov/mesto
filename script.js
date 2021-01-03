const editForm = document.querySelector('.edit-form');
const openFormBtn = document.querySelector('.profile__edit-button');
const closeFormBtn = document.querySelector('.edit-form__close-button');
const submitFormBtn = document.querySelector('.edit-form__submit-button');

const form = {
  name: document.querySelector('.edit-form__input_type_name'),
  description: document.querySelector('.edit-form__input_type_description')
}

const profile = {
  name: document.querySelector('.profile__name'),
  description: document.querySelector('.profile__description')
}

function renderFormInfo() {
  form.name.value = profile.name.innerText,
  form.description.value = profile.description.innerText
}

function toggleForm() {
  if (editForm.classList.contains('hidden')) {
    editForm.classList.remove('hidden');
    renderFormInfo();
  }
  else   {
    editForm.classList.add('hidden');
  }
}

function submitForm(e) {
  e.preventDefault();
  profile.name.innerText = form.name.value;
  profile.description.innerText = form.description.value;
  toggleForm();
}


function init () {
  openFormBtn.addEventListener('click', toggleForm);
  closeFormBtn.addEventListener('click', toggleForm);
  submitFormBtn.addEventListener('click', submitForm);
}

init();
