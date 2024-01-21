<h1 align="center">
🌐 To do app
</h1>
<p align="center">
MongoDB, Expressjs, React, Nodejs
</p>

## File structure
#### `frontend` - Holds the client application
- #### `public` - This holds all of our static files
- #### `src`
    - #### `assets` - This folder holds assets such as images, docs, and fonts
    - #### `App.jsx` - This is what renders all of our browser routes and different views
    - #### `index.jsx` - This is what renders the react app by rendering App.js, should not change
- #### `package.json` - Defines npm behaviors and packages for the client
#### `backend` - Holds the server application
- #### `models` - This holds all of our data models
- #### `server.js` - Defines server configuration,db configuration,routes and its route handlers
- #### `package.json` - Defines npm behaviors and packages for the client
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!


## Client-side usage
```terminal
$ cd frontend          // go to frontend folder
$ npm i    // npm install packages
$ npm run dev        // run it locally

## Server-side usage(PORT: 5000)
```terminal
$ cd backend   // go to backend folder
$ npm i       // npm install packages
$ npm run start // run it locally
