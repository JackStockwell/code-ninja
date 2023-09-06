const connection = require('../config/connection');
const { User, Job, Category } = require('../models')

// Data
const categorySeeds = require('./data/category.json')

connection.once('open', async () => {
    
    let categoryCheck = await connection.db.listCollections({name: 'categories'}).toArray();
    if (categoryCheck.length) {
        console.log('Categories collection detected, dropping categories...')
        await Category.deleteMany({})
    }

    const categories = await Category.create(categorySeeds)
    console.log('Catergories seeded')


    console.log('Seeding Complete 🌱')
    process.exit(0)
})