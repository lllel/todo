class Model {
  constructor(data = []) {
    this.data = data;
  }

  getItem(id) {
    return this.data.find((it) => it.id === id);
  }

  addItem(item) {
    this.data.push(item);
    window.helpers.save(this.data);

    return item;
  }

  removeItem(id) {
    const index = this.data.findIndex((it) => it.id === id);

    if (index > -1) {
      this.data.splice(index, 1);
    }

    window.helpers.save(this.data);

    return index;
  }

  updateItem(prop) {
    let item = this.getItem(prop.id);

    Object.keys(prop).forEach((it) => {
      if (it !== prop.id) {
        item[it] = prop[it];
      }
    });

    window.helpers.save(this.data);

    return item;
  }
}

const model = new Model(window.helpers.load() || []);

window.model = {
  modelClass: model
};
