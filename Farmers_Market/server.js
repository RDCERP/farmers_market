const express = require('express');
const routes = require('./controllers');                                         // Import the routes  // Import the Express.js module
const sequelize = require('./config/connection');                               // Import the connection to the database
const path = require('path');                                                   // Import the path module
const expressHandlebars = require('express-handlebars');                        // Import the express-handlebars module

const handleBars = expressHandlebars.create({});                                // Create a handlebars engine instance
const expressSession = require('express-session');                              // Import the express-session module
const sequelizeStore = require('connect-session-sequelize')(expressSession.Store);     // Import the SequelizeStore constructor from the connect-session-sequelize package


const sess = {                                                                  // Create a session object
    secret: 'Super secret secret',                                                    // Set the secret
    cookie: {                                                                   // Set the cookie options
        maxAge: 3600000                                                         // Set the cookie to expire in 1 hour
    },
    resave: false,                                                              // Do not resave the session if nothing has changed
    saveUninitialized: true,                                                    // Save an uninitialized session
    store: new sequelizeStore({                                                 // Set the session store to a new SequelizeStore instance
        db: sequelize                                                           // Set the database connection to the one we created earlier
    })
};

const app = express();                                                          // Create the Express.js server
const PORT = process.env.PORT || 3001;                                          // Set the port

app.use(expressSession(sess));                                                   // Use the session middleware
app.use(express.json());                                                         // Parse JSON body
app.use(express.urlencoded({ extended: true }));                                 // Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public')));                         // Serve static files from the public folder


app.use(routes);                                                                 // Use the routes
app.engine('handlebars', handleBars.engine);                                     // Set the Express.js app to use the handlebars engine
app.set('view engine', 'handlebars');                                            // Set the Express.js app to use the handlebars view engine


sequelize.sync({ force: false }).then(() => {                                    // Sync the models to the database 
    app.listen(PORT, () => console.log('Now listening'));                        // Start the Express.js server
});