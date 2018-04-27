class View extends window.helpers.helpersModule {
  constructor(options) {
    super();
    this.elem = options.elem;
    this.btnAdd = this.elem.querySelector('.todo__btn-add');
    this.checkbox = this.elem.querySelector('.todo__label-checkbox');
    this.input = this.elem.querySelector('.todo__input-text');
    this.items = this.elem.querySelector('.todo__items');
  }

  findItem(id) {
    return this.items.querySelector(`[data-id="${id}"]`);
  }

  addItem(data) {
    const randomId = Math.random() * 999;

    const checkbox = this.createItem('input', {className: 'todo__input-checkbox visually-hidden', id: `${randomId}`, type: 'checkbox', checked: data.complete ? 'checked' : ''});
    const label = this.createItem('label', {className: 'todo__label-checkbox', for: `${randomId}`});
    const inputRename = this.createItem('input', {className: 'todo__input-rename', type: 'text'});
    const paragraph = this.createItem('p', {className: 'todo__note'}, data.title);
    const btnRename = this.createItem('button', {className: 'todo__btn-save', type: 'submit'}, 'изменить');
    const btnRemove = this.createItem('button', {className: 'todo__btn-delete', type: 'submit'}, 'удалить');
    const li = this.createItem('li', {className: `todo__item${data.complete ? ' todo__item--complete' : ''}`}, checkbox, label, inputRename, paragraph, btnRename, btnRemove);

    label.setAttribute('for', `${randomId}`);
    li.setAttribute('data-id', `${data.id}`);

    this.items.appendChild(li);
    this.input.value = '';
  }

  renameItem(item) {
    const listItem = this.findItem(item.id);
    const btnSave = listItem.querySelector('.todo__btn-save');
    const note = listItem.querySelector('.todo__note');

    listItem.classList.remove('todo__item--rename');
    note.textContent = item.title;
    btnSave.textContent = 'изменить';
  }

  checkboxChangeItem(item) {
    const listItem = this.findItem(item.id);
    const checkbox = listItem.querySelector('.todo__input-checkbox');

    checkbox.checked = item.complete;
  }

  removeItem(id) {
    const listItem = this.findItem(id);

    this.items.removeChild(listItem);
  }

  onCheckboxChange(evt) {
    const target = evt.target.closest('li');
    const checkbox = target.querySelector('.todo__input-checkbox');

    let customEvt = new CustomEvent('checkboxChange', {
      bubbles: true,
      detail: {id: target.getAttribute('data-id'), complete: checkbox.checked}
    });

    this.elem.dispatchEvent(customEvt);
  }

  onBtnRenameClick(evt) {
    const target = evt.target.closest('li');
    const isRename = target.classList.contains('todo__item--rename');

    if (isRename) {
      let customEvt = new CustomEvent('rename', {
        bubbles: true,
        detail: {id: target.getAttribute('data-id'), title: target.querySelector('.todo__input-rename').value}
      });

      this.elem.dispatchEvent(customEvt);

    } else {
      target.classList.add('todo__item--rename');
      target.querySelector('.todo__input-rename').value = target.querySelector('.todo__note').textContent;
      target.querySelector('.todo__btn-save').textContent = 'сохранить';
      target.querySelector('.todo__input-rename').focus();
    }
  }

  onBtnRemoveClick(evt) {
    const target = evt.target.closest('li');

    let customEvt = new CustomEvent('remove', {
      bubbles: true,
      detail: target.getAttribute('data-id')
    });

    this.elem.dispatchEvent(customEvt);
  }

  onBtnAddClick() {
    let customEvt = new CustomEvent('add', {
      bubbles: true,
      detail: this.input.value
    });

    this.elem.dispatchEvent(customEvt);
  }

  init() {
    this.items.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('todo__btn-save')) {
        this.onBtnRenameClick(evt);
      }

      if (evt.target.className === 'todo__btn-delete') {
        this.onBtnRemoveClick(evt);
      }

      if (evt.target.classList.contains('todo__input-checkbox')) {
        this.onCheckboxChange(evt);
      }
    });

    this.btnAdd.addEventListener('click', this.onBtnAddClick.bind(this));
  }
}

const view = new View({
  elem: document.querySelector('.todo')
});

view.init();

window.view = {
  viewClass: view
};
