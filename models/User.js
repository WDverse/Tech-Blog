// Import required modules.
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// Define the User model class.
class User extends Model {
    // Method to compare hashed password for user authentication.
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
};

// Initialize the User model with its properties.
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    },
    {
        hooks: {
            // Hash the password before creating a new user.
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // Hash the password before updating a user.
            beforeUpdate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
        },
        sequelize,
        timestamps: false,         // Disable timestamp columns.
        freezeTableName: true,     // Ensure that the table name matches the model name.
        underscored: true,         // Use snake_case for column names.
        modelName: 'user',         // Set the model name in singular form.
    }
);

// Export the User model to be used in other parts of the application.
module.exports = User;
