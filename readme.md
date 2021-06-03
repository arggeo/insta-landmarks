# Dubai Landmarks

## Description
A NodeJS website showing famous landmarks in Dubai. By having a peek in the front page you can click on the title and read more information - and view the original source of information as well - about a specific landmark.

### Details
Besides reading about landmarks, a user can edit existing landmarks after authenticating via the login form.<br>All data fetched and manipulated via API. No database used directly.<br>Templates are delivered with EJS template engine.

### How to set up
#### Online
Upload files on preferred hosting provider. Depending on the provider you might need to manually run "npm install". Others may do this automatically on your behalf.<br>Set the SESSION_SECRET environmental variable used for signing the hash that stores the session cookie.

#### Locally
Run "npm install" to install dependencies.<br>In "app.js" line: 17 replace "process.env.SESSION_SECRET" with the secret of your choice (string).<br>Run "npm run start:dev" to start the server with nodemon for automatic restarts after changes.