import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';

export default class RegisterFormController extends BaseController {

    constructor(element) {
        super(element);
        this.attachEventListener();
    }

    async makePost (user) {
        await dataService.registerUser(user);
        alert('Usuario creado con éxito!');
        window.location.href = '/login.html';  // redirect user to login
    }

    attachEventListener() {      
        this.element.addEventListener('submit', async (event) => {
            event.preventDefault(); 
            const user = {
                username: this.element.elements.email.value,
                password: this.element.elements.password.value
            };
            this.publish(this.events.START_LOADING);
            try {
                await this.makePost(user);
            } catch(error) {
                this.publish(this.events.ERROR, error);
            } finally {
                this.publish(this.events.FINISH_LOADING);
            }
        });

        this.element.querySelectorAll('input').forEach(input => {
            const button = this.element.querySelector('button');
            input.addEventListener('keyup', event => { 
                // check the inputs
                // green if OK red if not
                if (input.validity.valid) {
                    input.classList.add('is-success');
                    input.classList.remove('is-danger');
                } else {
                    input.classList.remove('is-success');
                    input.classList.add('is-danger');
                }               
                // Check form to enable or disable the button
                if (this.element.checkValidity()) {
                    button.removeAttribute('disabled');
                } else {
                    button.setAttribute('disabled', true);
                }
            });
        });
    }

}
