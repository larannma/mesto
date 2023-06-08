//класс для отрисовки карточек

export default class Section {
  constructor({renderer}, container) {
    this._renderer = renderer;
    this._container = container;
  }

  //отрисовывает все элементв на странице
  renderItems(itemsList) {
    itemsList.forEach((item) => {
      this._renderer(item);
    });
  }

  // добавляет элемент в контейнер
  addItem(elem) {
    this._container.append(elem);
  }

  addNewItem(elem) {
    this._container.prepend(elem);
  }
}