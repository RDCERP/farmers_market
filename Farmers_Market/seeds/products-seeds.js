const { Product } = require('../models');

const productsdata = [
  {
        product_name: 'Spinach',
        product_description: 'Fresh Spinach', 
        // category_id: 1,
        store_id: 1,
        
  },
    {
        product_name: 'Tomatoes',
        product_description: 'Fresh Tomatoes',
        // category_id: 1,
        store_id: 1
    },
    {
        product_name: 'Apples',
        product_description: 'Fresh Apples',
        // category_id: 2,
        store_id: 2
    },
    {
        product_name: 'Oranges',
        product_description: 'Fresh Oranges',
        // category_id: 2,
        store_id: 2
    },
    {
        product_name: 'Beef',
        product_description: 'Fresh Beef',
        // category_id: 3,
        store_id: 3
    },
    {
        product_name: 'Chicken',
        product_description: 'Fresh Chicken',
        // category_id: 3,
        store_id: 3
    }
];

const seedProducts = () => Product.bulkCreate(productsdata);

module.exports = seedProducts;