const { Router } = require('express');
const cat = require('./categories.controller');
const makeCallback = require('../../lib/makeCallback');
const router = Router();

// create
router.post('/', makeCallback(cat.create));

// find all
router.get('/', makeCallback(cat.findAll));

// find one
router.get('/:id', makeCallback(cat.findOne));

// update
router.patch('/:id', makeCallback(cat.update));

// delete
router.delete('/:id', makeCallback(cat.remove));

module.exports = router;
