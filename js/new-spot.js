import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import NewSpotFormController from './controllers/NewSpotFormController.js';


window.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.lds-ring');
    const loaderController = new LoaderController(loader);

    const errorsElement = document.querySelector('.global-errors');
    const errorController = new ErrorController(errorsElement);

    const formElement = document.querySelector('form');
    const newSpotController = new NewSpotFormController(formElement);
});
