// Import required modules.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Comment model class.
class Comment extends Model { };

// Initialize the Comment model with its properties.
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            },
        },
        post_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: 'post',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: true,         // Disable timestamp columns.
        freezeTableName: true,     // Ensure that the table name matches the model name.
        underscored: true,         // Use snake_case for column names.
        modelName: 'comment',         // Set the model name in singular form.
    }
);

// Export the Comment model to be used in other parts of the application.
module.exports = Comment;
