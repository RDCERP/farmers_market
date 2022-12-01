
const  {Rating}  = require('../models');

const ratingsdata = [
    {
        user_id: 2,
        store_id:1
    },
    {
        user_id: 3,
        store_id:2
    },
    {
        user_id: 1,
        store_id:3
    },
    {
        user_id: 8,
        store_id:1
    },
    {
        user_id: 3,
        store_id:4
    },
    {
        user_id: 1,
        store_id:6
    },
    {
        user_id: 10,
        store_id:1
    }
];

const seedRatings = () => Rating.bulkCreate(ratingsdata);

module.exports = seedRatings;
