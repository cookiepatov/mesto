export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(renderedItem, toEnd=false) {
    if(toEnd) {
      this._container.append(renderedItem);
    }
    else {
      this._container.prepend(renderedItem);
    }
  }

  renderItems() {
    this._items.forEach(item => {
      this.addItem(this._renderer(item), true);
    });
  }
}
