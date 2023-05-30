//класс для отрисовки карточек

export default class Section {
  constructor({items, renderer}, container) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = container;
  }

  //отрисовывает все элементв на странице
  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  // добавляет элемент в контейнер
  addItem(elem) {
    this._container.prepend(elem);
  }
}