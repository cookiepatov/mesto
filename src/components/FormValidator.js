export default class FormValidator {
  constructor({inputSelector, submitButtonSelector, inputErrorClass, errorClass}, formElement) {
    this._formElement = formElement;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._button = this._formElement.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._validateInput(input);
        this._validateForm(this._inputList);
      })
    })
  }

  _validateInput(input) {
    const validationState = input.validity.valid;
    const errorMsg = this._formElement.querySelector(`.${input.id}-error`);
    const errorText = input.validationMessage;
    if(validationState) {
      this._hideErrorMessage(input, errorMsg);
    }
    else {
      this._showErrorMessage(input, errorMsg, errorText);
    }
  }
  _validateForm(inputList) {
    const inputsValidity = inputList.map(input=>input.validity.valid);
    const validationState = inputsValidity.every(state=>{return state===true});
    this._setFormState(validationState);
  }
  _setFormState(validationState){
    if(validationState) {
      this._enableButton(this._button);
    }
    else {
      this._disableButton(this._button);
    }
  }
  _showErrorMessage(input, errorElement, errorText) {
    input.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent=errorText;
  }
  _hideErrorMessage(input, errorElement) {
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }
  _enableButton (button) {
    button.disabled = false;
  }
  _disableButton (button) {
    button.disabled = true;
  }
}
