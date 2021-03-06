const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/tienda', (req, res) => {
    res.render('tienda');
});

router.get('/productos', (req, res) => {
    res.render('productos');
});

module.exports = router;