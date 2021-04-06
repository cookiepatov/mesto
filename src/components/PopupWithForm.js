import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(selector, submitForm) {
    super(selector);
    this._submitForm = submitForm;
    this._body = document.querySelector('.body');
    this._formInputs = this._popup.querySelectorAll('.popup__input');
    this._button = this._popup.querySelector('.popup__button');
    this._buttonText = this._button.textContent;
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

  setLoading() {
    const dots = ['.','..','...'];
    let i=0
    this._interval = setInterval(()=>{
      this._button.textContent='Сохранение'+dots[i];
      i=(i===2)?0:i+1;
    },500)
  }

  setLoaded() {
    this._button.textContent=this._buttonText;
    clearInterval(this._interval);
  }

  _clearValues() {
    this._formInputs.forEach(element=>{element.value=''});
  }

  _getInputValues() {
    return Array.from(this._formInputs)
    .map(element=> element.value);
  }



}
