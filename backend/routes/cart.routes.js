const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { auth } = require('../middleware/auth.middleware');

// Import cart controller (to be created)
const cartController = require('../controllers/cart.controller');

// Validation middleware
const cartItemValidation = [
  body('productId').notEmpty().withMessage('Product ID is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
];

// Routes
router.get('/', auth, cartController.getCartItems);
router.post('/add', auth, cartItemValidation, cartController.addToCart);
router.put('/update/:productId', auth, cartItemValidation, cartController.updateCartItem);
router.delete('/remove/:productId', auth, cartController.removeFromCart);
router.delete('/clear', auth, cartController.clearCart);

module.exports = router; 