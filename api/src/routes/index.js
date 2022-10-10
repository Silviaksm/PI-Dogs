const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogs = require('./dogs');
// const temperament= require('./temperaments.js')

const router = Router();

router.use('./dogs', dogs);
// router.use('./temperaments', temperament);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
