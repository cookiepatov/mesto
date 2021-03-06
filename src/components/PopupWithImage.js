import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(selector, wrongImagePlaceHolder) {
    super(selector);
    this._body = document.querySelector('.body');
    this._popupImage = this._popup.querySelector('.popup__full-picture');
    this._popupCaption = this._popup.querySelector('.popup__picture-title')
    this._wrongImagePlaceHolder = wrongImagePlaceHolder;
  }

  open({name, link}) {
    super.open();
    this._popupImage.src = link;
    this._popupImage.onerror = ()=>{this._popupImage.src = this._wrongImagePlaceHolder};
    this._popupCaption.textContent = name;
  }
}
