// const url = 'https://gist.githubusercontent.com/kasappeal/a8724e3f1c75ba515a8d9500f4b609e7/raw/4733ee642e4cf01e95ff4284d6e252d0706804b0/fweets.json';
const BASE_URL = 'http://127.0.0.1:8000';

// OJO: En los servicios no utilizar arrow functions al definir sus métodos

export default {

    getSpots: async function() {
        const url = `${BASE_URL}/api/spots?_expand=user&_sort=id&_order=desc`;
        const response = await fetch(url);
        if (response.ok) {
            const data = response.json();
            return data;
        } else {
            throw new Error(`HTTP Error: ${response.status}`)
        }
    },

    post: async function(url, postData) {
        const config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)  // make the users object to a JSON
        };
        const response = await fetch(url, config);
        const data = await response.json();  // server response anyway, OK or ERROR.
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || JSON.stringify(data));
        }
    },

    registerUser: async function(user) {
        const url = `${BASE_URL}/auth/register`;
        return await this.post(url, user);
    }

};
