const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Store extends Model {
    static upvote(body, models) {
        return models.Rating.create({
            user_id: body.user_id,
            store_id: body.store_id
        }).then((data) => {
            console.log(data)
            return Store.findOne({
                where: {
                    id: body.store_id
                },
                attributes: [
                    'id',
                    'store_name',
                    'store_description',
                    [
                    sequelize.literal('(SELECT COUNT(*) FROM rating WHERE store.id = rating.store_id)'),
                    'vote_count'
                    ]
                    
                ]
            });
        });
    }
}

Store.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        store_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        store_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'store'
    }
);

module.exports = Store;
