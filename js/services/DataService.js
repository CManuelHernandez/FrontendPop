// const url = 'https://gist.githubusercontent.com/kasappeal/a8724e3f1c75ba515a8d9500f4b609e7/raw/4733ee642e4cf01e95ff4284d6e252d0706804b0/fweets.json';
const BASE_URL = 'http://127.0.0.1:8000';
const TOKEN_KEY = 'token';

// OJO: En los servicios no utilizar arrow functions al definir sus métodos

export default {

    getSpots: async function() {
        const currentUser = await this.getUser();
        let url = `${BASE_URL}/api/spots?_expand=user&_sort=id&_order=desc`;       
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        } else {
            throw new Error(`HTTP Error: ${response.status}`)
        }
    },

    getSpot: async function () {
        let url = `${BASE_URL}/api/spots`;

        const queryParams = window.location.href.replace('?', ' ');
        const queryParamsParts = queryParams.split('=');
        const productId = queryParamsParts[1];

        if (queryParamsParts.length == 2) {
            url += '/' + productId;
            url += '?_expand=user';
        }

        console.log(url);
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const currentUser = await this.getUser();
            console.log(data);
            return await this.spotData(data, currentUser);

        } else {
            console.log(error);
            throw new Error(`HTTP Error: ${response.status}`);
        }
    },

    post: async function(url, postData, json=true) {
        return await this.request('POST', url, postData, json);
    },

    delete: async function(url) {
        return await this.request('DELETE', url, {});
    },

    put: async function(url, putData, json=true) {
        return await this.request('PUT', url, putData, json);
    },

    request: async function(method, url, postData, json=true) {
        const config = {
            method: method,
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
    },

    getUser: async function() {
        try {
            const token = await this.getToken();
            const tokenParts = token.split('.');
            if (tokenParts.length !== 3) {
                return null;
            }
            const payload = tokenParts[1]; // cogemos el payload, codificado en base64
            const jsonStr = atob(payload); // descodificamos el base64
            const { userId, username } = JSON.parse(jsonStr); // parseamos el JSON del token descodificado
            return { userId, username };
        } catch (error) {
            return null;
        }
    },

    deleteSpot: async function(spot) {
        const url = `${BASE_URL}/api/spots/${spot.id}`;
        return await this.delete(url);
    },

    spotData: async function(data, currentUser){
        return {
            id: data.id,
            productName: data.productName,
            description: data.description.replace(/(<([^>]+)>)/gi, ""),
            price: data.price,
            status: data.status,
            date: data.createdAt || data.updatedAt,
            author: data.username || 'Desconocido',
            image: data.image || null,
            user: data.user,
            canBeDeleted: currentUser ? currentUser.userId === data.userId : false
        };
    }

};
