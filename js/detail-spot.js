import DetailSpotController from './controllers/DetailSpotController.js';
import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import NewSpotOrLoginController from './controllers/NewSpotOrLoginController.js'


window.addEventListener("DOMContentLoaded", async (event) => {
    
    const loaderElement = document.querySelector('.lds-ring');
    const loaderController = new LoaderController(loaderElement);

    const errorsElement = document.querySelector('.global-errors');
    const errorController = new ErrorController(errorsElement);

    const detailElement = document.querySelector('.posts-list');
    const detailController = new DetailSpotController(detailElement);
    detailController.loadSpot();

    const newSpotButtons = document.querySelector('.new-spot');
    new NewSpotOrLoginController(newSpotButtons);
    const element = document.querySelector('.posts-list');

});