const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

/**
 * App Routes 
*/
router.get('/', recipeController.homepage);
router.get('/recipe/:id', recipeController.exploreRecipe );
router.get('/categories', recipeController.exploreCategories);
router.get('/categories/:name', recipeController.exploreRecipesByCategory);
router.get('/types/:name', recipeController.exploreRecipesByType);
router.get('/tags/:name', recipeController.exploreRecipesByTags);
router.get('/sub-categories/:name', recipeController.exploreRecipesByTypeOrTags);
router.post('/search', recipeController.searchRecipe);
router.get('/explore-latest', recipeController.exploreLatest);
router.get('/explore-random', recipeController.exploreRandom);
router.get('/submit-recipe', recipeController.submitRecipe);
router.post('/submit-recipe', recipeController.submitRecipeOnPost);
router.get('/test', recipeController.test);
router.get('/about', recipeController.getAboutPage);
router.get('/health', recipeController.getHealthPage);
router.get('/health/:tag', recipeController.getArticlesByTag);

// Add this new route
router.get('/article/:id', recipeController.viewArticle);

 
module.exports = router;
