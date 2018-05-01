import Helpers from './modules/helpers';
import Model from './modules/model';
import View from './modules/view';
import Controller from './modules/controller';

const helpers = new Helpers();
const model = new Model(helpers.load() || null);
const view = new View();
const controller = new Controller(model, view);

view.init();
controller.init();
