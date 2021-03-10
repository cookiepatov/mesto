export class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }
  enableValidation() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._validateInput(input);
        this._validateForm(inputList);
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
    const button = this._formElement.querySelector(this._submitButtonSelector);
    if(validationState) {
      this._enableButton(button);
    }
    else {
      this._disableButton(button);
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
