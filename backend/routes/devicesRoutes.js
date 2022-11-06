// CRUD

const { Router } = require('express');
const router = Router();
const { DevicesController } = require('../controllers');


router.post('/', DevicesController.create);

router.get('/', DevicesController.getAll);

router.get('/:id', DevicesController.getOne);

router.patch('/:id', DevicesController.update);

router.delete('/:id', DevicesController.delete)


module.exports = router;