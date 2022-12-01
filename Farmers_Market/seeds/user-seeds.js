const sequelize = require('../config/connection');
const { User } = require('../models');

const userdata = [
  {
    username: 'alesmonde0',
    email: 'nwestnedge0@cbc.ca',
    password: 'password123',
    is_vendor: 0
  },
  {
    username: 'jwilloughway1',
    email: 'rmebes1@sogou.com',
    password: 'password123',
    is_vendor: 0
  },
  {
    username: 'iboddam2',
    email: 'cstoneman2@last.fm',
    password: 'password123',
    is_vendor: 1
  },
  {
    username: 'dstanmer3',
    email: 'ihellier3@goo.ne.jp',
    password: 'password123',
    is_vendor: 1
  },
  {
    username: 'djiri4',
    email: 'gmidgley4@weather.com',
    password: 'password123',
    is_vendor: 0
  },
  {
    username: 'msprague5',
    email: 'larnout5@imdb.com',
    password: 'password123',
    is_vendor: 0
  },
  {
    username: 'mpergens6',
    email: 'hnapleton6@feedburner.com',
    password: 'password123',
    is_vendor: 0
  },
  {
    username: 'tpenniell7',
    email: 'kperigo7@china.com.cn',
    password: 'password123',
    is_vendor: 0
  },
  {
    username: 'msabbins8',
    email: 'lmongain8@google.ru',
    password: 'password123',
    is_vendor: 0
  },
  {
    username: 'jmacarthur9',
    email: 'bsteen9@epa.gov',
    password: 'password123',
    is_vendor: 0
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
