const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { auth } = require('../middleware/auth.middleware');

// Import review controller (to be created)
const reviewController = require('../controllers/review.controller');

// Validation middleware
const reviewValidation = [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').notEmpty().withMessage('Comment is required')
];

// Routes
router.get('/product/:productId', reviewController.getProductReviews);
router.post('/product/:productId', auth, reviewValidation, reviewController.createReview);
router.put('/:reviewId', auth, reviewValidation, reviewController.updateReview);
router.delete('/:reviewId', auth, reviewController.deleteReview);

module.exports = router; 