const { Comment } = require('../models');

const commentdata = [
    {
        comment_text: 'The vegetables are fresh and the prices are reasonable.',
        user_id: 6,
        store_id: 1,
        post_id: 1

    },
    {
        comment_text: 'The meat is fresh and the prices are reasonable.',
        user_id: 7,
        store_id: 3,
        post_id: 2
    },
    {
        comment_text: 'The fruits are fresh and the prices are reasonable.',
        user_id: 8,
        store_id: 2,
        post_id: 3
    },
    {
        comment_text: 'Best place to buy fresh produce.',
        user_id: 9,
        store_id: 1,
        post_id: 4
    },
    {
        comment_text: 'Great service!',
        user_id: 10,
        store_id: 3,
        post_id: 5
    }
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
