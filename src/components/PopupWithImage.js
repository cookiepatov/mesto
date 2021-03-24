import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popup = document.querySelector(selector);
    this._body = document.querySelector('.body');
  }

  open({name, link}) {
    this._popup.classList.add('popup_opened');
    this._body.classList.add('no-scroll');
    this.escapeHandler = this._handleEscClose.bind(this);
    document.addEventListener('keydown', this.escapeHandler);
    this._popup.querySelector('.popup__full-picture').src = link;
    this._popup.querySelector('.popup__picture-title').textContent = name;
  }
}
