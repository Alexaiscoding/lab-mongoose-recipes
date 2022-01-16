const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
const data = require('./data.json')

// Connection to the database "recipe-app"
mongoose.connect(MONGODB_URI,{useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongoose database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()     
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })

    // CREATE
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create ([{
      title: "Pizza 4 fromaggi",
      ingredients: [
        "Gorgonzola",
        "Mozarella",
        "Pecorino",
        "Emmental"
      ],
      cuisine: "Italian",
      creator: "Alexandra"
    }])
    .then (recipe => console.log('Recipe has been created:',recipe))
    .catch(error => console.log("An error happened while saving a new recipe",error))
  })

    
    // INSERT MULTIPLE RECIPES - ITERATION 3
    .then (() => { 
     return Recipe.insertMany (data)
    .then(insertManyRecipe => console.log ("All recipes has been inserted:",insertManyRecipe.title))
    .catch(error => console.log("An error happened",error))
    })

    //UPDATE RECIPE - ITERATION 4
    .then (() =>{ 
     return Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration=100})
    .then(updateRecipe => console.log ("Recipe has been Updated:",updateRecipe.duration.title))
    .catch(error => console.log("An error happened while Updating",error))
    })

    //REMOVE A RECIPE - ITERATION 5
    .then(() => {
  return Recipe.deleteOne({title:"Carrot Cake"})
    .then (deleteRecipe => console.log("Recipe has been deleted:",deleteRecipe.title))
    .catch(error =>console.log("An error happened while Updating",error))
    })


    //CLOSE THE CONNECTION - ITERATION 6
    .then(() => {
    mongoose.connection.close(() => {
    console.log('Problem to close the conexion')
  })
})
    .catch(error => {
      console.log('Error to deconnecting the database',error);
})

  



