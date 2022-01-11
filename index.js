const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { insertMany, updateMany, updateOne } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const pizza = {
      title: "Pizza 4 fromaggi",
      ingredients: [
        "Gorgonzola",
        "Mozarella",
        "Pecorino",
        "Emmental"
      ],
      cuisine: "Italian",
      creator: "Alexandra"
    }

    Recipe.create({title:"pizza 4 fromaggi", cuisine: "Italian"})
      .then(createdRecipe => console.log("The new recipe has been created",createdRecipe.title))
      .catch(error => console.log("An error happened while saving a new recipe",error))

    Recipe.insertMany ()
    .then(inserManyRecipe => console.log ("inserted recipe",inserManyRecipe.title))
    .catch(error => console.log("An error happened while saving",inserManyRecipe.title),error)

    Recipe.findOneAndUpdate({duration= 100})
    .then(findOneAndYpdateRecipe => console.log ("Updated recipe",findOneAndYpdateRecipe .title))
    .catch(error => console.log("An error happened while Updating",findOneAndYpdateRecipe.title,error))

    

  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  });

