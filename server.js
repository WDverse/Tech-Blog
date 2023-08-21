// Import required modules and packages
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers'); // Import route handlers
const helpers = require('./utils/helpers'); // Import custom Handlebars helpers

// Create an instance of the Express application
const PORT = process.env.PORT || 3001; // Define the port to listen on
const app = express();

// Create an instance of Handlebars with custom helpers
const hbs = exphbs.create({ helpers });

// Connect to the database using Sequelize
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Configure session settings
const sess = {
    secret: 'keyboard cat', // Secret for session data encryption
    cookie: {}, // Configuration for session cookies
    resave: false, // Don't save session if unmodified
    saveUninitialized: true, // Save new sessions
    store: new SequelizeStore({ // Use Sequelize to store sessions in the database
        db: sequelize
    })
};

// Set up session middleware
app.use(session(sess));

// Configure Express to use Handlebars as the template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set up middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the defined routes
app.use(routes);

// Sync the database and start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Now listening on ${PORT}`);
    });
});
module.exports = app;