import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';
import { spotView, feedbackView, noWorkingView } from '../views.js';

export default class DetailSpotController extends BaseController {
    constructor(element) {
        super(element);
    }

    render(spot) {
        this.publish(this.events.START_LOADING, {});
        try {
            const article = document.createElement('div');
            article.classList.add('ad');
            article.innerHTML = spotView(spot);
            
            const deleteButton = article.querySelector('button');
            if (deleteButton) {
                deleteButton.addEventListener('click', async event => {
                    event.preventDefault();
                    const deleteConfirmed = confirm('¿Estas seguro de borrar este anuncio?');
                    if (deleteConfirmed) {
                        await dataService.deleteSpot(spot);
                        article.remove(); // immediately delete the spot so that the user does not see it
                        const container = document.querySelector('.container');
                        container.innerHTML = feedbackView();
                        setTimeout(function(){ 
                            window.location = 'index.html'; 
                        }, 5000);
                    }
                });
            }
            this.element.appendChild(article);
        } catch (error) {
            console.error('Ha ocurrido un error', error);
            this.publish(this.events.ERROR, error);
        } finally {
            this.publish(this.events.FINISH_LOADING, {});
        }
    }

    async loadSpot() {
        this.publish(this.events.START_LOADING, {});
        try {
            const product = await dataService.getSpot();
            this.render(product);
        } catch (error) {
            const article = document.querySelector('.container');
            article.innerHTML = noWorkingView();
            this.publish(this.events.ERROR, error);
        } finally {
            this.publish(this.events.FINISH_LOADING, {});
        }
    }
}


