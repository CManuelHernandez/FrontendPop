import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';


export default class NewSpotOrLoginController extends BaseController {

    constructor(element) {
        super(element);
        this.checkIfUserIsLogged();
    }

    async checkIfUserIsLogged() {
        const usesIsLogged = await dataService.isUserLogged();
        if (usesIsLogged) {
            const newSpotButton = this.element.querySelector('.new-spot-button');
            newSpotButton.classList.remove('is-hidden');            
            const sesionButton = this.element.querySelector('.sesion-button');
            sesionButton.classList.remove('is-hidden');
            sesionButton.addEventListener('click', (event) => {
            event.preventDefault();
            window.localStorage.removeItem('token');
            location.reload();
            })
        } else {
            const loginRegisterButtons = this.element.querySelector('.login-register-buttons');
            loginRegisterButtons.classList.remove('is-hidden');
        }
    }

    
}
