class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.todo = document.querySelector('.todo');
  }

  addItem(evt) {
    const itemList = this.model.addItem({
      id: Math.random() * 999 + '',
      title: evt.detail,
      complete: false
    });

    this.view.addItem(itemList);
  }

  renameItem(item) {
    const updateItem = this.model.updateItem(item);

    this.view.renameItem(updateItem);
  }

  removeItem(evt) {
    this.model.removeItem(evt.detail);
    this.view.removeItem(evt.detail);
  }

  init() {
    if (this.model.data.length > 0) {
      this.model.data.forEach((it) => {
        this.view.addItem(it);
      });
    }

    this.todo.addEventListener('rename', (evt) => {
      this.renameItem(evt.detail);
    });

    this.todo.addEventListener('remove', (evt) => {
      this.removeItem(evt);
    });

    this.todo.addEventListener('add', (evt) => {
      if (evt.detail.trim() !== '') {
        this.addItem(evt);
      }
    });

    this.todo.addEventListener('checkboxChange', (evt) => {
      const item = this.model.updateItem(evt.detail);
      this.view.checkboxChangeItem(item);
    });
  }
}

const controller = new Controller(window.model.modelClass, window.view.viewClass);

controller.init();

window.controller = {
  controllerClass: controller
};
