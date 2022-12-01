const sequelize = require('../config/connection');
const { Model, DataTypes, INTEGER } = require('sequelize');

class Rating extends Model {}

Rating.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        store_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'store',
                key: 'id'
            }
        }
    },
    
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'rating'
    }
);

module.exports = Rating;