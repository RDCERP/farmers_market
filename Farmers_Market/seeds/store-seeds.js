    const { Store } = require('../models');

    const storedata = [
        {
            store_name: 'Farmers Market',
            store_description: 'Fresh Produce',
            user_id: 1
        },
        {
            store_name: 'Ranchers Market',
            store_description: 'Fresh Meat',
            user_id: 2
        },
        {
            store_name: 'Fishers Market',
            store_description: 'Fresh Fish',
            user_id: 3
        },
        {
            store_name: 'Furniture Bros',
            store_description: 'Brothers who make and sell furniture.',
            user_id: 4
        },
        {
            store_name: 'Candle and Meat Store',
            store_description: 'We sell artisanal candles and meat.',
            user_id: 5
        },
        {
            store_name: 'Fashion Forward',
            store_description: 'Handmade clothing',
            user_id: 6
        }
    ];

    const seedStore = () => Store.bulkCreate(storedata);

    module.exports = seedStore;

