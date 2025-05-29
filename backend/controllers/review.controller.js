const Review = require('../models/Review');
const Product = require('../models/product.model');

// Get product reviews
exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create review
exports.createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check if user has already reviewed this product
    const existingReview = await Review.findOne({
      user: req.user.id,
      product: productId
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this product'
      });
    }

    const review = new Review({
      user: req.user.id,
      product: productId,
      rating,
      comment
    });

    await review.save();
    await review.populate('user', 'name');

    // Update product rating
    const productReviews = await Review.find({ product: productId });
    const averageRating = productReviews.reduce((acc, curr) => acc + curr.rating, 0) / productReviews.length;
    
    await Product.findByIdAndUpdate(productId, {
      rating: averageRating,
      reviews: productReviews.length
    });

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update review
exports.updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.findOne({
      _id: req.params.reviewId,
      user: req.user.id
    });

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    review.rating = rating;
    review.comment = comment;
    await review.save();

    // Update product rating
    const productReviews = await Review.find({ product: review.product });
    const averageRating = productReviews.reduce((acc, curr) => acc + curr.rating, 0) / productReviews.length;
    
    await Product.findByIdAndUpdate(review.product, {
      rating: averageRating
    });

    res.json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.reviewId,
      user: req.user.id
    });

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    await review.deleteOne();

    // Update product rating
    const productReviews = await Review.find({ product: review.product });
    const averageRating = productReviews.length > 0
      ? productReviews.reduce((acc, curr) => acc + curr.rating, 0) / productReviews.length
      : 0;
    
    await Product.findByIdAndUpdate(review.product, {
      rating: averageRating,
      reviews: productReviews.length
    });

    res.json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}; 