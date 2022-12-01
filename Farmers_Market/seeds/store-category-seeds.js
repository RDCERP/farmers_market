const { StoreCategory } = require('../models');

const storeCategoryData = [
    {
        store_id: 1,
        category_id: 1
    },
    {
        store_id: 2,
        category_id: 3
    },
    {
        store_id: 3,
        category_id: 3
    },
    {
        store_id: 4,
        category_id: 5
    },
    {
        store_id: 5,
        category_id: 3
    },
    {
        store_id: 5,
        category_id: 7
    },
    {
        store_id: 6,
        category_id: 4
    }
];

const seedStore = () => StoreCategory.bulkCreate(storeCategoryData);

module.exports = seedStore;