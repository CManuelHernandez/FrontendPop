import BaseController from './BaseController.js';

export default class LoaderController extends BaseController {

    showLoading() {
        this.element.classList.remove('hidden');
    }

    hideLoading() {
        this.element.classList.add('hidden');
    }

}
