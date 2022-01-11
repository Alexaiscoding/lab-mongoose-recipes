const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data= require('../data.json')

// connect to the databasse:

mongoose.connect('mongodb://localhost/recipeApp'
  .then(() => { console.log('Connected to Mongo!')
  .catch((err) => { console.log('An error happened:', err) }
  )


const recipeSchema = new Schema({

    title: {type: String, required: true, unique: true},
    level: {type: String, enum:[ "Easy Peasy","Animateur Chef","UltraPro Chef" ]},

    ingredients: [String],
    cuisine:{type: String, required: true},
    dishType:{type:String,enum: ["breakfast","main_course","soup","snack"]},
    image:{type:String, default:"https://images.media-allrecipes.com/images/75131.jpg"},
    duration: {type: Number, min:0},
    creator: {type:String},
    created: {type:Date ,default: Date.now}

});






const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;