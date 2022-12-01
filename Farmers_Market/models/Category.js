const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Category extends Model { }

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false
         },
        
        // store_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'store',
        //         key: 'id'
        //     }
        // }
    },

    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'category'
    }
);

module.exports = Category;