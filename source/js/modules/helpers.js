class Helpers {

  createItem(tag, props, ...restParams) {
    const item = document.createElement(tag);

    Object.keys(props).forEach((it) => {
      item[it] = props[it];
    });

    if (restParams.length > 0) {
      restParams.forEach((it) => {
        if (typeof it === 'string') {
          it = document.createTextNode(it);
        }

        item.appendChild(it);
      });
    }

    return item;
  }
}

// const helpers = new Helpers();

function load() {
  const items = localStorage.getItem('todo');

  return JSON.parse(items);
}

function save(data) {
  const items = JSON.stringify(data);

  localStorage.setItem('todo', items);
}

export default {Helpers, load, save};

// window.helpers = {
//   helpersModule: Helpers,
//   helpersClass: helpers,
//   load,
//   save
// };
