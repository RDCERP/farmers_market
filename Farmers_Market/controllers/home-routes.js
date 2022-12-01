const router = require('express').Router();
const sequelize = require('../config/connection');

const { Store, Category, StoreCategory, Product, Rating } = require('../models');


router.get('/', (req, res) => {
  // specifies that we want to render/use the homepage.handlebars template
  res.render('homepage',
    {
      loggedIn: req.session.loggedIn
    });
});

// router.get('/', (req, res) => {
//     res.render('homepage', {
//       id: 1,
//       post_url: 'https://handlebarsjs.com/guide/',
//       title: 'Handlebars Docs',
//       created_at: new Date(),
//       vote_count: 10,
//       comments: [{}, {}],
//       user: {
//         username: 'test_user'
//       }
//     });
// });

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/sign-up', (req, res) => {
  res.render('sign-up');
});

router.get('/stores', (req, res) => {
  Store.findAll({
    attributes: [
      'id',
      'store_name',
      'store_description',
      [sequelize.literal('(SELECT COUNT(*) FROM rating WHERE store.id = rating.store_id)'), 'rating_count']
    ],
    include: [
      {
        model: Product,
        attributes: ['product_name'],
        include: {
          model: Store,
          attributes: ['store_name']
        }
      },
      {
        model: Category,
        through: StoreCategory,
        as: 'categories'
      }
    ]
  })
    // .then(dbStoreData => res.json(dbStoreData))
    .then(dbStoreData => {
      // serialize data before passing to template
      const stores = dbStoreData.map(store => store.get({ plain: true }));
      res.render('allstores', { stores, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

module.exports = router;


