import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';
import { spotView, noSpotsView, noWorkingView } from '../views.js';

export default class PostsListController extends BaseController {

    constructor(element) {
        super(element);
        this.subscribe(this.events.SEARCH, query => {
            this.loadSpots(query);
        });
    }

    render(spots) {
        this.element.innerHTML = ''; // delete any spot that you can see on the screen
        this.publish(this.events.START_LOADING, {});
        try {
            if (spots.length < 1) {
                const container = document.querySelector('.container');
                container.innerHTML = noSpotsView();
            
                setTimeout(function(){ // Refresh to check or reset the search (Provisional)
                window.location = 'index.html'; 
                }, 5000);
                
            }else {
                for (const spot of spots) {
                    const article = document.createElement('div');
                    article.classList.add('ad');
                    article.innerHTML = spotView(spot);
                
                    article.addEventListener('click', async event => {
                    event.preventDefault();
                    window.location.href = 'detail-spot.html?id=' + spot.id;
                    });
                                  
                    this.element.appendChild(article);
                } 
            }          
        } catch (error) {
            console.error('Ha ocurrido un error', error);
            this.publish(this.events.ERROR, error);
        } finally {
            this.publish(this.events.FINISH_LOADING, {});
        }
        
    }

    async loadSpots(query=null) {
        this.publish(this.events.START_LOADING, {});
        try {
            const spots = await dataService.getSpots(query);
            this.render(spots);
        } catch (error) {
            const article = document.querySelector('.container');
            article.innerHTML = noWorkingView();
            this.publish(this.events.ERROR, error);
        } finally {
            // this always runs when it works or it dosent
            this.publish(this.events.FINISH_LOADING, {});
        }
    }

}
