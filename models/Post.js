// Import required modules.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Post model class.
class Post extends Model { };

// Initialize the Post model with its properties.
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        content:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: true,         // Disable timestamp columns.
        freezeTableName: true,     // Ensure that the table name matches the model name.
        underscored: true,         // Use snake_case for column names.
        modelName: 'post',         // Set the model name in singular form.
    }
);

// Export the Post model to be used in other parts of the application.
module.exports = Post;
