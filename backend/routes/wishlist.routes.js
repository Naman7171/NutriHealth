const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { auth } = require('../middleware/auth.middleware');

// Import wishlist controller (to be created)
const wishlistController = require('../controllers/wishlist.controller');

// Validation middleware
const wishlistItemValidation = [
  body('productId').notEmpty().withMessage('Product ID is required')
];

// Routes
router.get('/', auth, wishlistController.getWishlistItems);
router.post('/add', auth, wishlistItemValidation, wishlistController.addToWishlist);
router.delete('/remove/:productId', auth, wishlistController.removeFromWishlist);
router.delete('/clear', auth, wishlistController.clearWishlist);

module.exports = router; 