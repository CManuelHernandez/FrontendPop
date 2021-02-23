import PostsListController from './controllers/PostsListController.js';
import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';

window.addEventListener("DOMContentLoaded", async (event) => {
  const loader = document.querySelector(".lds-ring");
  const loaderController = new LoaderController(loader);

  const element = document.querySelector('.posts-list');
  const controller = new PostsListController(element);
  controller.loadPosts();

  const errorsElement = document.querySelector('.global-errors');
  const errorController = new ErrorController(errorsElement);

});
