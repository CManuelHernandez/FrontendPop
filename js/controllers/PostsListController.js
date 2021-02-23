import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';
import { spotView } from '../views.js';

export default class PostsListController extends BaseController {

    render(spots) {
        for (const spot of spots) {
            const article = document.createElement('div');
            article.classList.add('ad');
            article.innerHTML = spotView(spot);
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
