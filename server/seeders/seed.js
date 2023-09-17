const connection = require('../config/connection');
const { User, Job, Category, Tag, Employer } = require('../models')
const {
    getRandomTitle,
    getRandomCompany,
    getRandomCategory,
    getRandomTag,
    getRandomArrItem
} = require('./data/jobs')
const newTag = require('./data/tags')

// Data
const categorySeeds = require('./data/categoryOld.json')
const tagSeeds = require('./data/tagsOld.json')
const descriptionData = require('./data/descriptionData.json')


connection.once('open', async () => {
    
    let categoryCheck = await connection.db.listCollections({name: 'categories'}).toArray();
    if (categoryCheck.length) {
        console.log('Categories collection detected, dropping categories...')
        await Category.deleteMany({})
    }

    let jobsCheck = await connection.db.listCollections({name: 'jobs'}).toArray();
    if (jobsCheck.length) {
        console.log('Jobs collection detected, dropping jobs...')
        await Job.deleteMany({})
    }

    let tagsCheck = await connection.db.listCollections({name: 'tags'}).toArray();
    if (tagsCheck.length) {
        console.log('Tags collection detected, dropping tags...')
        await Tag.deleteMany({})
    }

    
    let companiesCheck = await connection.db.listCollections({name: 'employers'}).toArray();
    if (companiesCheck.length) {
        console.log('Employers collection detected, dropping companies...')
        await Employer.deleteMany({})
    }

    const categories = await Category.create(categorySeeds)
    const tags = await Tag.create(tagSeeds)

    let empArr = []

    // Creates a company, adds to the array above per loop.
    for (let i = 0; i < 12; i++) {

        const companyName = getRandomCompany()


        const newEmployer = {
            email: `${companyName}@mail.com`,
            password: 'Password123!',
            companyName: companyName,
            about: 'Non-evil corpation',
        }

        empArr.push(newEmployer)
    }

    const employers = await Employer.insertMany(empArr)

    let jobsArr = []

    for (let i = 0;i < 12; i++) {

        const newJob = {
            title: getRandomTitle(i),
            company: getRandomArrItem(employers)._id,
            salary: Math.floor(Math.random() * (60 - 24 + 1)) + 24,
            description: JSON.stringify(descriptionData),
            category: getRandomArrItem(categories)._id,
            tags: [getRandomArrItem(tags)._id, getRandomArrItem(tags)._id],
        }

        jobsArr.push(newJob)
    }

    await Job.insertMany(jobsArr)

    console.log('Seeding Complete 🌱')
    process.exit(0)
})