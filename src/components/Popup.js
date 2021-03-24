export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._body = document.querySelector('.body');
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._body.classList.add('no-scroll');
    this.escapeHandler = this._handleEscClose.bind(this)
    document.addEventListener('keydown', this.escapeHandler);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._body.classList.remove('no-scroll');
    document.removeEventListener('keydown', this.escapeHandler);
  }

  setEventListeners() {
    this._popup.addEventListener('pointerdown', (e)=>this._overlayClick(e));
    this._popup.querySelector('.popup__close-button').addEventListener('click',()=>this.close())
  }

  _overlayClick(e) {
    e.target.classList.contains('popup') && this.close();
  }

  _handleEscClose(e) {
    (e.key==='Escape') && this.close();
  }
}
