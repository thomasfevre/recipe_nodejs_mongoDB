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

    res.render('index', { req, title: 'Cooking Blog - Home', food, meal_type, subCategories } );
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
    res.render('categories', { req, title: 'Cooking Blog - Categories', categories, types } );
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
   
    res.render('recipe_list', { req, title: 'Recipes - ' + categoryName, recipes } );
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
   
    res.render('recipe_list', { req, title: 'Recipes - ' + typeName, recipes } );
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
   
    res.render('recipe_list', { req, title: 'Recipes - ' + tagsName, recipes } );
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
    const recipes = await Recipe.find({ $or: [
      { type: { $regex: param, $options: 'i' } },
      { tags: { $regex: param, $options: 'i' } }
    ] }).limit(limitNumber);
   
    res.render('recipe_list', { req, title: 'Recipes - ' + param, recipes } );
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
    res.render('recipe', { req, title: 'Recipes', recipe } );
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
    res.render('search', { req, title: 'Cooking Blog - Search', recipe } );
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
    const recipes = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render('recipe_list', { req, title: 'Cooking Blog - Explore Latest', recipes } );
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
    res.render('explore-random', { req, title: 'Cooking Blog - Explore Latest', recipe } );
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
  res.render('submit-recipe', { req, title: 'Cooking Blog - Submit Recipe', infoErrorsObj, infoSubmitObj  } );
}

exports.test = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('test', { req, title: 'Cooking Blog - Test', infoErrorsObj, infoSubmitObj  } );
}

exports.getAboutPage = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('about', { req, title: 'Cooking Blog - About Me', infoErrorsObj, infoSubmitObj  } );
}


/**
 * POST /submit-recipe
 * Submit Recipe
*/
exports.submitRecipeOnPost = async(req, res) => {
  try {

    let imagesUploadFiles = req.files.images;
    let uploadPaths = [];
    let newImageNames = [];

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files where uploaded.');
    } else {
      if(Array.isArray(imagesUploadFiles)) {
        imagesUploadFiles.forEach((imageUploadFile) => {
          newImageName = req.body.email + "_" + new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + imageUploadFile.name ;
          newImageName = newImageName.replace(/[\/,:]/g, '_').replace(' ', '');
          uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
          imageUploadFile.mv(uploadPath, function(err){
            if(err) return res.status(500).send(err);
          })

          uploadPaths.push(uploadPath);
          newImageNames.push(newImageName);
        });
      } else {
        newImageName = req.body.email + "_" + new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + imagesUploadFiles.name ;
        newImageName = newImageName.replace(/[\/,:]/g, '_');
        uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
    
        imagesUploadFiles.mv(uploadPath, function(err){
          if(err) return res.status(500).send(err);
        })

        uploadPaths.push(uploadPath);
        newImageNames.push(newImageName);
      }

    }

    // Convert req.body.tags to an array of strings
    let tagsArray = req.body.tags.split(',').map(tag => tag.trim());

    /////////////////// send email to admin

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

    // Prepare email content in MongoDB format
    let mailOptions = {
      from: req.body.email,
      to: 'balance2eat@gmail.com',
      subject: 'New Recipe Submission',
      
      text: JSON.stringify({
        name: req.body.name,
        author: req.body.author,
        smallDescription: req.body.smallDescription,
        fullDescription: req.body.fullDescription,
        email: req.body.email,
        ingredients: req.body.ingredients,
        category: req.body.category,
        type: req.body.type,
        tags: tagsArray,
        image: newImageNames
      })
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
    //   images: newImageNames
    // });
    
    // await newRecipe.save();

    req.flash('infoSubmit', 'La recette a été soumise et un email a été envoyé à l\'administrateur.')
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
 * GET /health
 * View health Article page 
*/

exports.getHealthPage = async (req, res) => {
  try {
    const articles = await Article.find({}).sort({ createdAt: 'desc' }).limit(10);
    const tags = await Article.distinct('tags');
    res.render('health', { req, title: 'Health & Wellness Blog', articles, tags });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
}

/**
 * GET /health/:tag
 * View health Article page by Tag
*/
exports.getArticlesByTag = async (req, res) => {
  try {
    const articles = await Article.find({ tags: req.params.tag}).sort({ createdAt: 'desc' }).limit(10);
    const tags = await Article.distinct('tags');
    res.render('health', { req, title: 'Health & Wellness Blog', articles, tags });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
}

/**
 * POST /article-search
 * View health Article page by Search Term
*/
exports.searchArticle = async (req, res) => {
  try {
    const searchTerm = req.body.searchTerm;
    const articles = await Article.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { summary: { $regex: searchTerm, $options: 'i' } },
        { content: { $regex: searchTerm, $options: 'i' } },
        { tags: { $regex: searchTerm, $options: 'i' } }
      ]
    }).sort({ createdAt: 'desc' }).limit(10);
    const tags = await Article.distinct('tags');
    res.render('health', { req, title: 'Health & Wellness Blog', articles, tags });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
}

/**
 * GET /article/:id
 * View Article
*/
exports.viewArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    const article = await Article.findById(articleId);
    
    if (!article) {
      res.status(404).send('Article not found');
      return;
    }

    res.render('article', { req, title: article.title, article });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
}
