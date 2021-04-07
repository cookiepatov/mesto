export default class Card {
  constructor({ name, link, likes, _id }, selector,
    cardOwnerIsCurrent = true, isLiked = false, wrongImagePlaceHolder,
    handleCardClick, handleDeleteCard, handleLikeClick) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeClick = handleLikeClick;
    this._cardOwnerIsCurrent = cardOwnerIsCurrent;
    this._id = _id;
    this.isLiked = isLiked;
    this.wrongImagePlaceHolder = wrongImagePlaceHolder;
  }

  createCard() {
    this._newCard = this._getCardFromTemplate();

    this._likeCounter = this._newCard.querySelector(`.element__like-counter`);
    this._deleteButton = this._newCard.querySelector('.element__delete-button');
    this._likeButton = this._newCard.querySelector(`.element__like-button`);
    this._element = this._newCard.querySelector('.element');

    const pic = this._newCard.querySelector(`.element__picture`);

    !this._cardOwnerIsCurrent
      && this._deleteButton.classList.add('element__delete-button_hidden');

    this.isLiked
      && this._likeButton.classList.add('element__like-button_active');

    pic.src = this._link;
    pic.alt = this._name;
    pic.onerror = ()=>{pic.src = this.wrongImagePlaceHolder};
    ;
    this._likeCounter.textContent = this._likes.length;
    this._newCard.querySelector(`.element__text`).textContent = this._name;
    this._setEventListeners();
    return this._newCard;
  }

  _getCardFromTemplate() {
    return document.querySelector(this._selector).content.cloneNode(true);
  }

  _setEventListeners() {
    const elementBtn = this._newCard.querySelector(`.element__picture-button`);
    this._likeButton.addEventListener('click',
      () => this._handleLikeClick(this._id));
    this._deleteButton.addEventListener('click',
      () => this._handleDeleteCard(this, this._id));
    elementBtn.addEventListener('click',
      () => this._handleCardClick(this._link, this._name));
  }

  _handleLike() {
    this.classList.toggle(`element__like-button_active`);
  }

  toggleLike(counter) {
    this.isLiked = !this.isLiked;
    this._likeButton.classList.toggle('element__like-button_active');
    this._likeCounter.textContent = counter;
  }

  deleteCard() {
    this._element.remove();
  }

  setLikeLoading() {
    this._likeButton.classList.add('element__like-button_loading');
  }

  setLikeLoaded() {
    this._likeButton.classList.remove('element__like-button_loading');
  }


}
