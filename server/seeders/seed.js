const connection = require('../config/connection');
const { User, Job, Category, Tag } = require('../models')
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

    const categories = await Category.create(categorySeeds)
    const tags = await Tag.create(tagSeeds)

    console.log(categories)

    let jobsArr = []

    for (let i = 0;i < 12; i++) {

        let newJob = {
            title: getRandomTitle(i),
            company: getRandomCompany(),
            salary: Math.floor(Math.random() * (60 - 24 + 1)) + 24,
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis non reprehenderit blanditiis assumenda officiis numquam sapiente nemo id, soluta facilis molestiae iure tempore, magni quo, repudiandae pariatur cum.",
            category: getRandomArrItem(categories)._id,
            tags: [getRandomArrItem(tags)._id, getRandomArrItem(tags)._id],
        }

        jobsArr.push(newJob)
    }

    await Job.insertMany(jobsArr)

    // for (let i = 0; i < 12; i++) {
    //     const jobTitle = getRandomTitle(i)

    //     const newCategory = await Category.create({ 
    //         name: getRandomCategory(),
    //     })

    //     let tagArray = []

    //     for (let i = 0; i < 3; i++) {

    //         const newTag = await Tag.create({
    //             name: getRandomTag(),
    //         })

    //         tagArray.push(newTag)
    //     }
        
    //     await Job.findOneAndUpdate(
    //         { title: jobTitle },
    //         { $addToSet: { tags: tagArray } },
    //         { new: true }
    //     )
    // }

    const jobData = await Job.find({})

    console.log(jobData[1])
    
    console.log('Seeding Complete 🌱')
    process.exit(0)
})