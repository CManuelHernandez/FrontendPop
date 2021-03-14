import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import NewSpotSaleFormController from './controllers/NewSpotSaleFormController.js';



window.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.lds-ring');
    const loaderController = new LoaderController(loader);

    const errorsElement = document.querySelector('.global-errors');
    const errorController = new ErrorController(errorsElement);

    const formSaleElement = document.querySelector('.sale');
    const newSpotSaleController = new NewSpotSaleFormController(formSaleElement);


});
