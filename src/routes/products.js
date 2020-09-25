const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

router.get('/products/add', (req, res) => {
    res.render('products/new-product');
});

router.post('/products/new-product', async (req,res) => {
    const { producto, valor } = req.body;
    const errors = [];
    if(!producto) {
        errors.push({text: 'Por favor, indique el nombre del producto'});
    }
    if (!valor) {
        errors.push({text: 'Por favor, indique el valor del producto'});
    }
    if(errors.length > 0) {
        res.render('products/new-product', {
            errors,
            producto,
            valor
        });
    } else {
        const newProduct = new Product({producto, valor}); // Almacenar en base de datos
        await newProduct.save();
        req.flash('success_msg', 'Producto agregado correctamente');
        res.redirect('/products');
    }
});

router.get('/products', async (req, res) => {
    const productos = await Product.find() // Consultar de la base de datos
    res.render('products/all-products', { productos })
});

router.get('/products/edit/:id', async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.render('products/edit-product', {product});
});

router.put('/products/edit-product/:id', async (req, res) => {
    const { producto, valor } = req.body;
    await Product.findByIdAndUpdate(req.params.id, {producto, valor});
    req.flash('success_msg', 'Producto actualizado correctamente');
    res.redirect('/products');
});

// Eliminar
router.delete('/products/delete/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Producto eliminado correctamente');
    res.redirect('/products');
});

module.exports = router;