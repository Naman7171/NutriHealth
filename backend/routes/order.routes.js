const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { auth } = require('../middleware/auth.middleware');

// Import order controller (to be created)
const orderController = require('../controllers/order.controller');

// Validation middleware
const orderValidation = [
  body('items').isArray().withMessage('Items must be an array'),
  body('items.*.productId').notEmpty().withMessage('Product ID is required'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('shippingAddress').notEmpty().withMessage('Shipping address is required'),
  body('paymentMethod').notEmpty().withMessage('Payment method is required')
];

// Routes
router.get('/', auth, orderController.getUserOrders);
router.get('/:orderId', auth, orderController.getOrderById);
router.post('/create', auth, orderValidation, orderController.createOrder);
router.put('/:orderId/cancel', auth, orderController.cancelOrder);

module.exports = router; 