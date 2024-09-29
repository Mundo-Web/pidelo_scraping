import express from 'express';
const router = express.Router();

import AmazonController from '../controllers/amazon.js';
import AliExpressController from '../controllers/aliexpress.js';

router.get('/amazon/categories', AmazonController.getCategories)
router.get('/amazon/search', AmazonController.getProducts)

router.get('/aliexpress/search', AliExpressController.search)
router.get('/aliexpress/details', AliExpressController.search)

export default router