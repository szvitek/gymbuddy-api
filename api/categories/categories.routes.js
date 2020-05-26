const { Router } = require('express');
const cat = require('./categories.controller');
const makeCallback = require('../../lib/makeCallback');
const validateObjectId = require('../../middlewares/validateObjectId');
const router = Router();

// create
router.post('/', makeCallback(cat.create));

// find all
router.get('/', makeCallback(cat.findAll));

// find one
router.get('/:id', validateObjectId, makeCallback(cat.findOne));

// update
router.patch('/:id', validateObjectId, makeCallback(cat.update));

// delete
router.delete('/:id', validateObjectId, makeCallback(cat.remove));

module.exports = router;
