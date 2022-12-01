const router = require('express').Router();
const { User, Store, Comment, Category, StoreCategory } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    // access our User model and run .findAll() method
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GEt user by ID
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Store,
                attributes: ['id', 'store_name', 'store_description'],
                include: {
                    model: Category,
                    through: StoreCategory,
                    as: 'categories'
                }
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Store,
                    attributes: ['store_name']
                }
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

// POST /api/users
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234', is_vendor: 1}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        is_vendor: req.body.is_vendor
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id,
                    req.session.username = dbUserData.username,
                    req.session.loggedIn = true;

                res.json(dbUserData)
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
});

// log user into site
router.post('/login', (req, res) => {
    // expects {username: 'lernantino', password: 'password1234'}

    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that username!' });
            return;
        }

        // verify user
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id,
                req.session.username = dbUserData.username,
                req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in!' });
            console.log("sgwnhrghiohohrgwiognoiwhgi")
        });
    });
});

// log user out
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

module.exports = router;