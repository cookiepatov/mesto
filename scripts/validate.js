const forms = Array.from(document.forms);

const showErrorMessage = (inputElement, errorElement, errorText) => {
  inputElement.classList.add('popup__input_error');
  errorElement.classList.add('popup__error-message_show');
  errorElement.textContent=errorText;
}

const hideErrorMessage = (inputElement, errorElement) => {
  inputElement.classList.remove('popup__input_error');
  errorElement.classList.remove('popup__error-message_show');
  errorElement.textContent = '';
}

const validateInput = (inputElement, form) => {
  const validationState = inputElement.validity.valid;
  const errorMsg = form.querySelector(`.${inputElement.id}-error`);
  const errorText = inputElement.validationMessage;
  if(validationState) {
    hideErrorMessage(inputElement,errorMsg);
  }
  else {
    showErrorMessage(inputElement, errorMsg, errorText);
  }
}

const validateForm = (inputList, form) => {
  const inputsValidity = inputList.map(input=>input.validity.valid);
  const validationState = inputsValidity.every(state=>{return state===true});
  setFormState(form, validationState);
}

const enableButton = (button) => {
  button.disabled = false;
}

const disableButton = (button) => {
  button.disabled = true;
}

const setFormState = (form, validationState) => {
  const button = form.querySelector('.popup__submit-button');
  if(validationState) {
    enableButton(button);
  }
  else {
    disableButton(button);
  }
}

const init = () => {
  forms.forEach(form => {
    const formInputs = Array.from(form.querySelectorAll('.popup__input'));
    formInputs.forEach(input => {
      input.addEventListener('input',function(){
        validateForm(formInputs, form);
        validateInput(input, form);
      })
    })
  });
}

init();
