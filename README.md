# FrontendPop

Frontend of an application for the management of a site of announcements of purchase and sale.
The logic of this repository is made with Javascript.

## Structure

### Css
Styles
### Data
Needed for the Backend
### Img
Imagenes
### JS
The logic of the application that works with the back using a MVC model 
#### Controllers
#### Service
### HTML

## Back

he backend to use will be sparrest.js, based on json-server, which offers us a complete API
REST to simulate a real backend.
To make it work, you just have to download the code from
https://github.com/kasappeal/sparrest.js and, inside the folder where the code is hosted, install
the dependencies by running:
From the root folder * (Nodepop) * we will install the dependencies using the terminal and the following command.

```
npm install
```
And to start the server execute:

```
npm start
```
Deberemos sustituir el archivo *db.json* y la carpeta *public* que se encuentran en la carpeta *data* de este respositorio por los que contiene Sparres.

Ejemplo de la estuctura de un anuncio y usuario para el repositorio
```
{
  "spots": [
    {
      "productName": "Walking Stick",
      "description": "When 900 years old you reach, look as good, you will not",
      "price": "5",
      "status": "Looking For",
      "image": "http://127.0.0.1:8000//file-1614533244731.png",
      "userId": 7,
      "updatedAt": "2021-02-28T17:27:24.744Z",
      "id": 1
    }
  ],
  "users": [
    {
      "id": 1,
      "username": "luke@starwars.com",
      "password": "$2b$10$KxqTnqj.uqyuXCNzKnJBse2TK/5GyaZLluzR6AZETLcHN6D/uAarm"
    },
    ]
```

## Autor ✒️
* **CManuelHernandez** -  - [CManuelHernandez](https://github.com/CManuelHernandez)

