const { Router } = require('express');
const ex = require('./exercises.controller');
const makeCallback = require('../../lib/makeCallback');
const validateObjectId = require('../../middlewares/validateObjectId');
const router = Router();

// create
router.post('/', makeCallback(ex.create));

// find all
// todo: option to filter by category, musclegroup via query
router.get('/', makeCallback(ex.findAll));

// muscle gruops
router.get('/groups', makeCallback(ex.groups));

// find one
router.get('/:id', validateObjectId, makeCallback(ex.findOne));

// update
router.patch('/:id', validateObjectId, makeCallback(ex.update));

// delete
router.delete('/:id', validateObjectId, makeCallback(ex.remove));

module.exports = router;
