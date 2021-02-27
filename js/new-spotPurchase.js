import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import NewSpotPurchaseFormController from './controllers/NewSpotPurchaseFormController.js'


window.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.lds-ring');
    const loaderController = new LoaderController(loader);

    const errorsElement = document.querySelector('.global-errors');
    const errorController = new ErrorController(errorsElement);

    const formPurchaseElement = document.querySelector('.purchase');
    const newSpotPurchaseController = new NewSpotPurchaseFormController(formPurchaseElement);
});
