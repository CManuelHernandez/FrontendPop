import BaseController from "./BaseController.js";
import dataService from "../services/DataService.js";

export default class NewSpotFormController extends BaseController {

    constructor(element) {
        super(element);
        this.checkIfUserIsLogged();
        this.attachEventListeners();
        this.focusInInput();
    }

    async checkIfUserIsLogged() {
        const userIsLogged = await dataService.isUserLogged();
        if (!userIsLogged) {
            window.location.href = '/login.html';
        } else {
            this.publish(this.events.FINISH_LOADING);
        }
    }
    focusInInput() {
        const inputText = this.element.querySelector('input');
        inputText.focus();
    }
    attachEventListeners() {

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
                // button.setAttribute('disabled', false); // esto también valdría
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

        // controlamos cuando se envía el formulario
        this.element.addEventListener('submit', async event => {
            event.preventDefault();
            const spot = {
                productName: this.element.elements.productName.value,
                description: this.element.elements.description.value,
                price: this.element.elements.price.value,
                status: 'Compra'
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
