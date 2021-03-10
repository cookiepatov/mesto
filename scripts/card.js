export class Card {
    constructor(data, selector, openPopup, renderFullView) {
        this._openPopup = openPopup;
        this._name = data.name;
        this._link = data.link;
        this._selector = selector;
        this._renderFullView = renderFullView;
    }
    _getCardFromTemplate() {
        const cardElement = document.querySelector(this._selector).content.cloneNode(true);
        return cardElement
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
    _setEventListeners() {
        const heartBtn = this._newCard.querySelector(`.element__like-button`);
        const deleteBtn = this._newCard.querySelector(`.element__delete-button`);
        const elementBtn = this._newCard.querySelector(`.element__picture-button`);
        heartBtn.addEventListener('click', this._handleLike);
        deleteBtn.addEventListener('click', (e) => this._handleDelete(e));
        elementBtn.addEventListener('click', () => this._handleOpenPopup());
    }
    _handleLike() {
        this.classList.toggle(`element__like-button_active`);
    }
    _handleDelete(e) {
        e.target.closest('.element').remove();
    }
    _handleOpenPopup() {
        const popupFullView = document.querySelector('.popup_type_full-view');
        this._openPopup(popupFullView);
        this._renderFullView(this._link, this._name);
    }
}