const router = require('express').Router();
const { Store, User, Comment, Category, StoreCategory, Product, Rating } = require('../../models');

// get all stores
router.get('/', (req, res) => {
    Store.findAll({
        attributes: [
            'id',
            'store_name',
            'store_description',
        ],
        // order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'store_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Product,
                attributes: ['product_name']
            },
            {
                model: Category,
                through: StoreCategory,
                as: 'categories'

            }
        ]
    })
        // .then(dbPostData => res.json(dbPostData))
        .then(dbPostData => {
            const allStores = dbPostData.map(store => store.get({ plain: true }));
            res.render('allstores', { allStores })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get store by id
router.get('/:id', (req, res) => {
    Store.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'store_name',
            'store_description',
        ],
        // order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'store_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Product,
                attributes: ['product_name']
            },
            {
                model: Category,
                through: StoreCategory,
                as: 'categories'

            }
        ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// create a new store
router.post('/', (req, res) => {
    /* req.body should look like this
    {
        "store_name": "Veggie Candle",
        "store_description": "Veggies, candles, and vegetable themed candles",
        "user_id": 7,
        "categoryIds": [1,7]
      }
    */
    Store.create({
        ...req.body,
        user_id: req.session.user_id
    })
        .then((store) => {
            if (req.body.categoryIds.length) {
                const storeCategoryIdArr = req.body.categoryIds.map((category_id) => {
                    return {
                        store_id: store.id,
                        category_id
                    };
                });
                return StoreCategory.bulkCreate(storeCategoryIdArr);
            }
            res.status(200).json(store)
        })
        .then((storeCategoryIds) => res.status(200).json(storeCategoryIds))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

router.put('/upvote', (req, res) => {
    if (req.session) {
        // pass session id along with all destructured properties on req.body
        console.log(req.session.user_id);
        Store.upvote({ ...req.body, user_id: req.session.user_id }, { Rating, Comment, User })
            .then(updatedRatingData => res.json(updatedRatingData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
})

// update an existing store
router.put('/:id', (req, res) => {
    Store.update(req.body, {
        // {

        // },
        where: {
            id: req.params.id
        }
    })
        .then((store) => {
            // find all associated categories from StoreCategory
            return StoreCategory.findAll({ where: { store_id: req.params.id } });
        })
        .then((storeCategories) => {
            // get list of current category_ids
            const storeCategoryIds = storeCategories.map(({ category_id }) => category_id);
            // create filtered list of new category_ids
            const newStoreCategories = req.body.categoryIds
                .filter((category_id) => !storeCategoryIds.includes(category_id))
                .map((category_id) => {
                    return {
                        store_id: req.params.id,
                        category_id
                    };
                });
            // determine which categories to remove
            const categoryIdsToRemove = storeCategories
                .filter(({ category_id }) => !req.body.categoryIds.includes(category_id))
                .map(({ id }) => id);

            // run both actions: delete associations that are no longer needed and add new associations
            return Promise.all([
                StoreCategory.destroy({ where: { id: categoryIdsToRemove } }),
                StoreCategory.bulkCreate(newStoreCategories)
            ]);
        })
        .then((updatedStoreCategories) => res.json(updatedStoreCategories))
        .catch((err) => {
            res.status(400).json(err);
        });

});


// delete store by id
router.delete('/:id', (req, res) => {
    Store.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbStoreData => {
            if (!dbStoreData) {
                res.status(404).json({ message: 'No store found with this id' });
                return;
            }
            res.json(dbStoreData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

module.exports = router;