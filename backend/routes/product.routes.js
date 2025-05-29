const express = require('express');
const { body } = require('express-validator');
const productController = require('../controllers/product.controller');
const { auth, isAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

// Validation middleware
const productValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category').isIn(['vitamins', 'protein', 'weight-loss', 'energy', 'immune-support', 'other'])
    .withMessage('Invalid category'),
  body('image').trim().notEmpty().withMessage('Image URL is required'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a positive number'),
  body('ingredients').isArray().withMessage('Ingredients must be an array'),
  body('servingSize').trim().notEmpty().withMessage('Serving size is required'),
  body('servingsPerContainer').isInt({ min: 1 }).withMessage('Servings per container must be a positive number')
];

// Public routes
router.get('/', productController.getProducts);
router.get('/categories', productController.getCategories);
router.get('/:id', productController.getProduct);

// Admin routes
router.post('/', auth, isAdmin, productValidation, productController.createProduct);
router.put('/:id', auth, isAdmin, productValidation, productController.updateProduct);
router.delete('/:id', auth, isAdmin, productController.deleteProduct);

module.exports = router; 