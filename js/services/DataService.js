// const url = 'https://gist.githubusercontent.com/kasappeal/a8724e3f1c75ba515a8d9500f4b609e7/raw/4733ee642e4cf01e95ff4284d6e252d0706804b0/fweets.json';
const BASE_URL = 'http://127.0.0.1:8000';
const TOKEN_KEY = 'token';

// OJO: En los servicios no utilizar arrow functions al definir sus métodos

export default {

    getSpots: async function() {
        const url = `${BASE_URL}/api/spots?_expand=user&_sort=id&_order=desc`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data.map(spot => {
                const user = spot.user || {};
                return {
                    productName: spot.productName,
                    description: spot.description.replace(/(<([^>]+)>)/gi, ""),
                    price: spot.price,
                    status: spot.status,
                    date: spot.createdAt || spot.updatedAt,
                    author: user.username || 'Desconocido',
                    image: spot.image || null
                }
            });
        } else {
            throw new Error(`HTTP Error: ${response.status}`)
        }
    },

    post: async function(url, postData, json=true) {
        const config = {
            method: 'POST',
            headers: {},
            body: null
        };
        if (json) {
            config.headers['Content-Type'] = 'application/json';
            config.body = JSON.stringify(postData);  // make the users object to a JSON
        } else {
            config.body = postData;
        }
        const token = await this.getToken();
        if (token) { 
            config.headers['Authorization'] = `Bearer ${token}`;
        }
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
    },

    login: async function(user) {
        const url = `${BASE_URL}/auth/login`;
        return await this.post(url, user);
    },

    saveToken: async function(token) {
        localStorage.setItem(TOKEN_KEY, token);
    },

    getToken: async function() {
        return localStorage.getItem(TOKEN_KEY);
    },

    isUserLogged: async function() {
        const token = await this.getToken();
        return token !== null; 
    },

    saveSpot: async function(spot) {
        const url = `${BASE_URL}/api/spots`;
        if (spot.image) {
            const imageURL = await this.uploadImage(spot.image);
            spot.image = imageURL;
        }
        return await this.post(url, spot);
    },

    uploadImage: async function(image) {
        const form = new FormData();
        form.append('file', image);
        const url = `${BASE_URL}/upload`;
        const response = await this.post(url, form, false);
        console.log('uploadImage', response);
        return response.path || null;
    }

};
