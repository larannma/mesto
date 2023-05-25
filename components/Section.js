export default class Section {
  constructor({items, renderer}, selector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  //отрисовывает все элементв на странице
  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  // добавляет элемент в контейнер
  addItem(elem) {
    this._container.append(elem);
  }
}