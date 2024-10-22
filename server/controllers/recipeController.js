require('../models/database');
const Recipe = require('../models/Recipe');
const Article = require('../models/Article');
const nodemailer = require('nodemailer');


/**
 * GET /
 * Homepage 
*/
exports.homepage = async(req, res) => {
  try {
    const limitNumber = 6;
    const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
   

    const allMeals = await Recipe.find({ 'category': 'All' }).limit(limitNumber);
    const breakfastMeals = await Recipe.find({ 'category': 'Breakfast' }).limit(limitNumber);
    const lunchMeals = await Recipe.find({ 'category': 'Lunch' }).limit(limitNumber);
    const dinnerMeals = await Recipe.find({ 'category': 'Dinner' }).limit(limitNumber);
    const snackMeals = await Recipe.find({ 'category': 'Snack' }).limit(limitNumber);

    const food = { latest,  allMeals, breakfastMeals, lunchMeals, dinnerMeals, snackMeals };
    const meal_type = ["All", "Breakfast", "Lunch", "Dinner", "Snack"];
    const subCategories = ['Full-Meal', 'Side-Dish', 'Snack', 'Quick & Easy', 'Fancy Meal', 'Dessert'];

    res.render('index', { title: 'Cooking Blog - Home', food, meal_type, subCategories } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

/**
 * GET /categories
 * Categories 
*/
exports.exploreCategories = async(req, res) => {
  try {    
    const categories = ['Breakfast', 'Lunch', 'Dinner'];
    const types = ['Full-Meal', 'Side-Dish', 'Snack', 'Dessert'];
    res.render('categories', { title: 'Cooking Blog - Categories', categories, types } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 


/**
 * GET /categories/:name
 * Categories By name
*/
exports.exploreRecipesByCategory = async(req, res) => { 
  try {
    let categoryName = req.params.name;
    const limitNumber = 20;
    const recipes = await Recipe.find({ 'category': categoryName }).limit(limitNumber);
    console.log(recipes);
    res.render('recipe_list', { title: 'Recipes - ' + categoryName, recipes } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 

/**
 * GET /type/:name
 * Categories By name
*/
exports.exploreRecipesByType = async(req, res) => { 
  try {
    let typeName = req.params.name;
    const limitNumber = 20;
    const recipes = await Recipe.find({ 'type': typeName }).limit(limitNumber);
    console.log(recipes);
    res.render('recipe_list', { title: 'Recipes - ' + typeName, recipes } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 

/**
 * GET /type/:name
 * Categories By name
*/
exports.exploreRecipesByTags = async(req, res) => { 
  try {
    let tagsName = req.params.name;
    const limitNumber = 20;
    const recipes = await Recipe.find({ 'type': tagsName }).limit(limitNumber);
    console.log(recipes);
    res.render('recipe_list', { title: 'Recipes - ' + tagsName, recipes } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 

/**
 * GET /type/:name
 * Categories By name
*/
exports.exploreRecipesByTypeOrTags = async(req, res) => { 
  try {
    let param = req.params.name;
    const limitNumber = 20;
    const recipes = await Recipe.find({ 'type': param, 'tags': param }).limit(limitNumber);
    console.log(recipes);
    res.render('recipe_list', { title: 'Recipes - ' + param, recipes } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 
 
/**
 * GET /recipe/:id
 * Recipe 
*/
exports.exploreRecipe = async(req, res) => {
  try {
    let recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    res.render('recipe', { title: 'Recipes', recipe } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 


/**
 * POST /search
 * Search 
*/
exports.searchRecipe = async(req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let recipe = await Recipe.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
    res.render('search', { title: 'Cooking Blog - Search', recipe } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
  
}

/**
 * GET /explore-latest
 * Explplore Latest 
*/
exports.exploreLatest = async(req, res) => {
  try {
    const limitNumber = 20;
    const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render('recipe_list', { title: 'Cooking Blog - Explore Latest', recipe } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 



/**
 * GET /explore-random
 * Explore Random as JSON
*/
exports.exploreRandom = async(req, res) => {
  try {
    let count = await Recipe.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let recipe = await Recipe.findOne().skip(random).exec();
    res.render('explore-random', { title: 'Cooking Blog - Explore Latest', recipe } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 


/**
 * GET /submit-recipe
 * Submit Recipe
*/
exports.submitRecipe = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-recipe', { title: 'Cooking Blog - Submit Recipe', infoErrorsObj, infoSubmitObj  } );
}

exports.test = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('test', { title: 'Cooking Blog - Test', infoErrorsObj, infoSubmitObj  } );
}

exports.getAboutPage = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('about', { title: 'Cooking Blog - About Me', infoErrorsObj, infoSubmitObj  } );
}


/**
 * POST /submit-recipe
 * Submit Recipe
*/
exports.submitRecipeOnPost = async(req, res) => {
  try {

    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files where uploaded.');
    } else {

      imageUploadFile = req.files.image;
      newImageName = req.body.email + "_" + imageUploadFile.name+ "_" + new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(/[\/,:]/g, '_') ;

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.status(500).send(err);
      })

    }

    // const newRecipe = new Recipe({
    //   name: req.body.name,
    //   description: req.body.description,
    //   email: req.body.email,
    //   ingredients: req.body.ingredients,
    //   category: req.body.category,
    //   image: newImageName
    // });
    
    // await newRecipe.save();

    // req.flash('infoSubmit', 'Recipe has been added.')
    // res.redirect('/submit-recipe');

    // send email to admin
   

    // Create a transporter using SMTP
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: 'balance2eat@gmail.com', // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD // Your Gmail app password
      }
    });

    // Prepare email content
    let mailOptions = {
      from: req.body.email,
      to: 'balance2eat@gmail.com',
      subject: 'New Recipe Submission',
      text: `
        New recipe submitted:
        
        Name: ${req.body.name}
        Author: ${req.body.author}
        Small Description: ${req.body.smallDescription}
        Full Description: ${req.body.fullDescription}
        Email: ${req.body.email}
        Ingredients: ${req.body.ingredients}
        Category: ${req.body.category}
        Type: ${req.body.type}
        Tags: ${req.body.tags}
        Image: ${newImageName}
      `
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    // Save the recipe and redirect (uncomment these lines when ready)
    // const newRecipe = new Recipe({
    //   name: req.body.name,
    //   description: req.body.description,
    //   email: req.body.email,
    //   ingredients: req.body.ingredients,
    //   category: req.body.category,
    //   image: newImageName
    // });
    
    // await newRecipe.save();

    req.flash('infoSubmit', 'Recipe has been submitted and an email has been sent to the admin.')
    res.redirect('/submit-recipe');
  } catch (error) {
    // res.json(error);
    req.flash('infoErrors', error);
    // res.redirect('/submit-recipe');
  }
}




// Delete Recipe
// async function deleteRecipe(){
//   try {
//     await Recipe.deleteOne({ name: 'New Recipe From Form' });
//   } catch (error) {
//     console.log(error);
//   }
// }
// deleteRecipe();


// Update Recipe
// async function updateRecipe(){
//   try {
//     const res = await Recipe.updateOne({ name: 'New Recipe' }, { name: 'New Recipe Updated' });
//     res.n; // Number of documents matched
//     res.nModified; // Number of documents modified
//   } catch (error) {
//     console.log(error);
//   }
// }
// updateRecipe();


/**
 * Dummy Data Example 
*/

exports.getHealthPage = async (req, res) => {
  try {
    const articles = await Article.find({}).sort({ createdAt: 'desc' }).limit(10);
    const tags = await Article.distinct('tags');
    res.render('health', { title: 'Health & Wellness Blog', articles, tags });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
}
