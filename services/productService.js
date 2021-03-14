const Product = require('../models/Product');

async function getAll() {
    return await Product.find({}).lean();
}

async function getOne(productId, userId) {
    let product = await Product.findById(productId).lean();
    product.isOwn = product.creator == userId;
    return product;
}

async function create(productData, userId) {
    let product = new Product(productData);
    product.creator = userId;
    return product.save();
}

async function deleteProduct(productId) {
    return await Product.deleteOne({ _id: productId });
}

async function edit(productId, editedData) {
    return await Product.updateOne({ _id: productId }, editedData);
}

module.exports = {
    getAll,
    getOne,
    create,
    deleteProduct,
    edit,
};