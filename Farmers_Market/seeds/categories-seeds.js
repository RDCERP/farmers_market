
const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Vegetables'
  },
  {
    category_name: 'Fruits'
  },
  {
    category_name: 'Meats'
  },
  {
    category_name: 'Clothing'
  },
  {
    category_name: 'Furniture'
  },
  {
    category_name: 'Crockery'
  },
  {
    category_name: 'Candles'
  }
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
