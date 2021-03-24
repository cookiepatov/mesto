import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(selector, submitForm) {
    super(selector);
    this._popup = document.querySelector(selector);
    this._submitForm = submitForm;
    this._body = document.querySelector('.body');
    this._formInputs = this._popup.querySelectorAll('.popup__input');
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._body.classList.remove('no-scroll');
    document.removeEventListener('keydown',this.escapeHandler);
    this._clearValues();
  }

  setEventListeners() {
    this._popup.addEventListener('pointerdown', (e)=>this._overlayClick(e));
    this._popup.querySelector('.popup__close-button')
    .addEventListener('click',()=>this.close())
    this._popup.addEventListener('submit',
    (e)=>this._submitForm(e, this._getInputValues()))
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
