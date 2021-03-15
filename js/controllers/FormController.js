import BaseController from "./BaseController.js";
import dataService from "../services/DataService.js";

export default class FormController extends BaseController {

    constructor(element) {
        super(element);
        this.checkIfUserIsLogged();
        this.focusInInput();
        this.checkFormIsOk();
        this.attachEventListeners(); 
    }

    async checkIfUserIsLogged() {
        const userIsLogged = await dataService.isUserLogged();
        const salePage = 'http://localhost:3000/new-spot-sale.html';
        const purchasePage = 'http://localhost:3000/new-spot-purchase.html';
        if (!userIsLogged && window.location.href === salePage ){
            window.location.href = '/login.html?next=/new-spot-sale.html';
        }
        else if ( !userIsLogged && window.location.href === purchasePage) {
            window.location.href = '/login.html?next=/new-spot-purchase.html';
        } else {
            this.publish(this.events.FINISH_LOADING);
        }
    }

    focusInInput() {
        const inputText = this.element.querySelector('input');
        inputText.focus();
    }

    checkFormIsOk() {

        this.element.querySelectorAll("input").forEach((input) => {
            const button = this.element.querySelector("button");
            input.addEventListener("keyup", (event) => {
                // check the inputs
                // green if OK red if not
              if (input.validity.valid) {
                input.classList.add("is-success");
                input.classList.remove("is-danger");
              } else {
                input.classList.remove("is-success");
                input.classList.add("is-danger");
              }                
              if (this.element.checkValidity()) {
                button.removeAttribute("disabled");
              } else {
                button.setAttribute("disabled", true);
              }
              if (this.element.checkValidity()) {
                button.removeAttribute('disabled');
            } else {
                button.setAttribute('disabled', true);
            }
            });
          });
    }
    

    attachEventListeners() {       
        // checkFormIsOk();
        // control when the form is submitted
        this.element.addEventListener('submit', async event => {
            event.preventDefault();
            let spot = {
                productName: this.element.elements.productName.value,
                description: this.element.elements.description.value,
                price: this.element.elements.price.value,
                status: 'Looking For',
                image: null
            }
            switch ( this.element.className ) {
                case 'purchase':
                    spot.status = 'Looking For'
                    break;
                case 'sale':
                    spot.status = 'On sale'
                    break;
                default:
                    throw error; 
            }
            if (this.element.elements.file.files.length > 0) {
                spot.image = this.element.elements.file.files[0];
            }
            this.publish(this.events.START_LOADING);
            try {
                await dataService.saveSpot(spot);
                window.location.href = '/?mensaje=spotOK'
            } catch (error) {
                this.publish(this.events.ERROR, error)
            } finally {
                this.publish(this.events.FINISH_LOADING)
            }
        });
    }

}