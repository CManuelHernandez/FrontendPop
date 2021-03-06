import SpotsListController from './controllers/SpotsListController.js';
import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import NewSpotOrLoginController from './controllers/NewSpotOrLoginController.js';
import SearchController from './controllers/SearchController.js';

window.addEventListener("DOMContentLoaded", async (event) => {
  const loader = document.querySelector(".lds-ring");
  const loaderController = new LoaderController(loader);

  const element = document.querySelector('.posts-list');
  const controller = new SpotsListController(element);
  controller.loadSpots();

  const errorsElement = document.querySelector('.global-errors');
  const errorController = new ErrorController(errorsElement);

  const newSpotButtons = document.querySelector('.new-spot');
  new NewSpotOrLoginController(newSpotButtons);

  const searchInput = document.querySelector('input[type="search"]');
  new SearchController(searchInput);

});
