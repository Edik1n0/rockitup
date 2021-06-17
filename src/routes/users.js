const express = require('express');
const router = express.Router();

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if(name.length <= 0) {
        errors.push({text: 'Por favor inserte un nombre'})
    }
    if(!email) {
        errors.push({ text: 'Por favor, introduzca un correo electrónico válido' });
    }
    if (password != confirm_password) {
        errors.push({ text: 'Las contraseñas no coinciden' });
    }
    if (password.length < 4) {
        errors.push({ text: 'La contraseña debe ser mayor a 4 Caracteres' });
    }
    if (confirm_password.length < 4) {
        errors.push({ text: 'La contraseña debe ser mayor a 4 Caracteres' });
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, password, confirm_password });
    } else {
        res.send('ok');
    }
});

module.exports = router;