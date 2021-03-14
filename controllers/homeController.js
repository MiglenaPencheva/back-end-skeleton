const router = require('express').Router();
const { getAll } = require('../services/productService');

router.get('/', async (req, res) => {
    let products = await getAll();
    res.render('home', { products });
});

module.exports = router;