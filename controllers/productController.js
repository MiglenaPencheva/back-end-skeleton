const router = require('express').Router();
const { create, getOne, deleteProduct, edit } = require('../services/productService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    let productData = extractData(req);
    try {
        await create(productData, req.user._id);
        res.redirect('/');
    } catch (error) {
        res.render('create', { error });
    }
});

router.get('/:id/details', async (req, res) => {
    const product = await getOne(req.params.id, req.user._id);
    res.render('details', { product });
});

router.get('/:id/delete', async (req, res) => {
    try {
        let product = await getOne(req.params.id, req.user._id);
        if (product.creator == req.user._id) {
            await deleteProduct(req.params.id);
            res.redirect('/');
        }
    } catch (error) {
        res.render('delete', { error });
    }
});

router.get('/:id/edit', async (req, res) => {
    let product = await getOne(req.params.id, req.user._id);
    res.render('edit', product);
});

router.post('/:id/edit', async (req, res) => {
    let productData = extractData(req);
    try {
        const product = await getOne(req.params.id, req.user._id);
        if (product.creator == req.user._id) {
            await edit(req.params.id, productData);
            res.redirect(`/product/${req.params.id}/details`);
        }
    } catch (error) {
        res.render('edit', { error });
    }
});

function extractData(req) {
    let { title, description, imageUrl } = req.body;

    return courseData = {
        title,
        description,
        imageUrl,
    };
}

module.exports = router;