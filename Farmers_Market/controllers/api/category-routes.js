const router = require('express').Router();
const { Category, Store, StoreCategory } = require('../../models');

// get all categories
router.get('/', (req, res) => {
    // access our User model and run .findAll() method
    Category.findAll({
    })
        .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get single category by id
router.get('/:id', (req, res) => {
    Category.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'category_name'
        ],
        include: [
            {
                model: Store,
                through: StoreCategory,
                as: 'stores'
            }
        ]
    })
        .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST create new category
router.post('/', (req, res) => {
    Category.create({
        category_name: req.body.category_name
    })
        .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

module.exports = router;