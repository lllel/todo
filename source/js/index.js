import helpersModule from './modules/helpers';
import {Model} from './modules/model';
import {View} from './modules/view';
import {Controller} from './modules/controller';

const helpers = new helpersModule.Helpers();
const model = new Model(helpersModule.load() || []);
const view = new View({
  elem: document.querySelector('.todo')
});
const controller = new Controller(model, view);

view.init();
controller.init();
