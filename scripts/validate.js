
const showErrorMessage = (inputElement, errorElement, errorText, settings) => {
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.classList.add(settings.errorClass);
  errorElement.textContent=errorText;
}

const hideErrorMessage = (inputElement, errorElement, settings) => {
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
}

const validateInput = (inputElement, form, settings) => {
  const validationState = inputElement.validity.valid;
  const errorMsg = form.querySelector(`.${inputElement.id}-error`);
  const errorText = inputElement.validationMessage;
  if(validationState) {
    hideErrorMessage(inputElement, errorMsg, settings);
  }
  else {
    showErrorMessage(inputElement, errorMsg, errorText, settings);
  }
}

const validateForm = (inputList, form, settings) => {
  const inputsValidity = inputList.map(input=>input.validity.valid);
  const validationState = inputsValidity.every(state=>{return state===true});
  setFormState(form, validationState, settings);
}

const enableButton = (button) => {
  button.disabled = false;
}

const disableButton = (button) => {
  button.disabled = true;
}

const setFormState = (form, validationState, settings) => {
  const button = form.querySelector(settings.submitButtonSelector);
  if(validationState) {
    enableButton(button);
  }
  else {
    disableButton(button);
  }
}

const enableValidation = (settings) => {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  forms.forEach(form=>{
    const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
    inputList.forEach(input=>{
      input.addEventListener('input',function(){
        validateInput(input, form, settings);
        validateForm(inputList, form, settings);
      })
    })
  })
};

const init = () => {
  const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
  };
  enableValidation(settings);
}

init();
