const router = require('express').Router();
const { Comment } = require('../../models');

// get all comments
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
            'id',
            'comment_text',
            'created_at'
        ],
    })
});

router.post('/', (req, res) => {
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            store_id: req.body.store_id,
            user_id: req.session.user_id
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});


module.exports = router;