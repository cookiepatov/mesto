import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(selector, submitForm) {
    super(selector);
    this._submitForm = submitForm;
    this._body = document.querySelector('.body');
    this._formInputs = this._popup.querySelectorAll('.popup__input');
  }

  close() {
    super.close();
    this._clearValues();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit',
    (e)=>this._submitForm(e, this._getInputValues()));
  }

  setValues(values, formConnectorData) {
    formConnectorData.formSelectors.forEach((object, index) => {
      this._popup.querySelector(object).value = values[formConnectorData.newDataKeys[index]];
    })
  }

  _clearValues() {
    this._formInputs.forEach(element=>{element.value=''});
  }

  _getInputValues() {
    return Array.from(this._formInputs)
    .map(element=> element.value);
  }



}
