export default class Card {
  constructor({name, link}, selector, handleCardClick) {
      this._name = name;
      this._link = link;
      this._selector = selector;
      this._handleCardClick = handleCardClick;
  }

  createCard() {
    this._newCard = this._getCardFromTemplate();
    const pic = this._newCard.querySelector(`.element__picture`);
    pic.src=this._link;
    pic.alt=this._name;
    this._newCard.querySelector(`.element__text`).textContent=this._name;
    this._setEventListeners();
    return this._newCard;
}

  _getCardFromTemplate() {
      return document.querySelector(this._selector).content.cloneNode(true);
  }

  _setEventListeners() {
      const heartBtn = this._newCard.querySelector(`.element__like-button`);
      const deleteBtn = this._newCard.querySelector(`.element__delete-button`);
      const elementBtn = this._newCard.querySelector(`.element__picture-button`);
      heartBtn.addEventListener('click', this._handleLike);
      deleteBtn.addEventListener('click',
       (e) => this._handleDelete(e));
      elementBtn.addEventListener('click',
       () => this._handleCardClick(this._link, this._name));
  }

  _handleLike() {
      this.classList.toggle(`element__like-button_active`);
  }

  _handleDelete(e) {
      e.target.closest('.element').remove();
  }
}
