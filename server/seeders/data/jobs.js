// type Job {
//     _id: ID!
//     title: String!
//     company: String!
//     location: String!
//     salary: Float
//     description: String!
//     categories: [Category]
// }

const categories = require('./category.json')
const tags = require('./tags.json')

const titles = [
    "Junior React Dev",
    "Senior C++ Developer",
    "Software Engineer",
    "Software Developer",
    ".NET Developer",
    "PHP Developer",
    "Java Developer",
    "C# Developer",
    "Backend C++ Developer",
    "Full Stack Developer",
    "Junior Web Developer",
    "JavaScript/TypeScript Developer",
    "Maintenance Engineer",
    "Data Analyst",
    "Software Sales Manager",
    "Project Lead"
]

const companies = [
    "XLC",
    "FreeStyle Design",
    "Rose Productions",
    "NoMuda",
    "META",
    "Arloom",
    "Innovage",
    "Digitron",
    "Quantum Corp",
    "Blue Space",
    "Terminal",
    "Systemic",
    "CloudME",
    "Eco Soft",
    "Glide Tech",
    "Grammio",
    "Space Digital",
    "Analytica",
    "Digital Advantage",
    "MagnaCore",
    "ZenByte Technologies",
    "DataFLair Technologies.",
    "ArtiFlex Systems",
    "DataCore Innovations",
    "MoneyBox Technologies",
    "Semantic",
    "LifeTech Solutions",
    "Umbrella Corp",
]



const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomTitle = (i) => `${titles[i]}`;

const getRandomCompany = () => `${getRandomArrItem(companies)}`;

const getRandomCategory = () => `${getRandomArrItem(categories)}`;

const getRandomTag = () => `${getRandomArrItem(tags)}`


module.exports = {
    getRandomTitle,
    getRandomCompany,
    getRandomCategory,
    getRandomArrItem,
    getRandomTag
};