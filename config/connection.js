// Import the Sequelize library to interact with the database.
const Sequelize = require('sequelize');

require('dotenv').config(); // Load the 'dotenv' library to read environment variables from a '.env' file.

let sequelize; // Declare a variable for holding the Sequelize instance.

// Check if the JAWSDB_URL environment variable is set, indicating a production environment.
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
}
else {
  // Create a Sequelize instance using the provided configuration.
  sequelize = new Sequelize(
    process.env.DB_NAME, // Database name from environment variables.
    process.env.DB_USER,  // Database user from environment variables.
    process.env.DB_PASSWORD, // Database password from environment variables.
    {
      host: 'localhost', // Database host
      dialect: 'mysql', // Dialect for the database.
      port: 3306 // Port for database connections.
    }

  );
}

// Export the configured Sequelize instance to be used throughout the application.
module.exports = sequelize;

