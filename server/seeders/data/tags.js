const { getRandomArrItem } = require('./jobs')

const tagSeeds = require('./tags.json')

// New Tags array, creates a small array of tags for a job.
const newTags = () => {
    // Random Arr, dictates how many tags are created.
    const randomInt = Math.floor(Math.random() * (4 - 2) + 1) + 2
    // Tag Array, pushed into with each loop.
    let tagArr = []
    // Do while loop
    let i = 0;

    // Creates a tag, pushes the tag into the tagArray
    do {
        // Creates the tag
        let tag = getRandomArrItem(tagSeeds)
        // Pushes into array
        tagArr.push(tag)
        // Iterate the loop by one.
        i++;
    } while (i < randomInt );

    

    return tagArr;
}

module.exports = newTags;