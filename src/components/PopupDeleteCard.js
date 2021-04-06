import Popup from './Popup.js'

export default class PopupDeleteCard extends Popup {
  constructor(selector, deleteCard) {
    super(selector);
    this._deleteCard = deleteCard;
    this._deleteBtn = this._popup.querySelector('.popup__button');
    this._buttonText = this._deleteBtn.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteBtn.addEventListener('click',
    (e)=>this._deleteCard(e, this._object, this._id));

  }

  open(object, _id) {
    super.open();
    this._object = object;
    this._id = _id;
  }

  setLoading() {
    const dots = ['.','..','...'];
    let i=0
    this._interval = setInterval(()=>{
      this._deleteBtn.textContent='Сохранение'+dots[i];
      i=(i===2)?0:i+1;
    },500)

  }
  setLoaded() {
    this._deleteBtn.textContent=this._buttonText;
    clearInterval(this._interval);
  }
}
