import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';
import { spotView } from '../views.js';

export default class PostsListController extends BaseController {

    render(spots) {
        this.element.innerHTML = ''; // delete any spot that you can see on the screen
        for (const spot of spots) {
            const article = document.createElement('div');
            article.classList.add('ad');
            article.innerHTML = spotView(spot);
            const deleteButton = article.querySelector('button');
            if (deleteButton) {
                deleteButton.addEventListener('click', async ev => {
                    const deleteConfirmed = confirm('¿Estas seguro de borrar este anuncio?');
                    if (deleteConfirmed) {
                        await dataService.deleteSpot(spot);
                        article.remove(); // immediately delete the spot so that the user does not see it
                        await this.loadPosts();  // reload the list of spots after deleting
                    }
                });
            }
            this.element.appendChild(article);
        }
    }

    async loadPosts() {
        this.publish(this.events.START_LOADING, {});
        try {
            const spots = await dataService.getSpots();
            this.render(spots);
        } catch (error) {
            console.error(error);
            this.publish(this.events.ERROR, error);
        } finally {
            // this always runs when it works or it dosent
            this.publish(this.events.FINISH_LOADING, {});
        }
    }

}
