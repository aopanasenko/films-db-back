const mongoose = require('mongoose');
const { Router } = require('express');
const { Actor } = require('../models/actors');

const actorsRouter = Router();

// GET /actors/
actorsRouter.get('/', async function (req, res) {
    try {
        const actors = await Actor.find();
        res.send(actors);    
    } catch (err) {
        console.log(err);
    }
});

// GET /actors/:id
actorsRouter.get('/:id', async function(req, res) {
    try {
        const actor = await Actor.findById(req.params.id);
        res.send(actor);
    } catch (err) {
        console.log(err);
    }
});

// POST /actors/create
actorsRouter.post('/create', function (req, res) {
    const {name, birth} = req.body;

    const actor = new Actor({
        name,
        birth
    });

    actor.save(function (err, actor) {
        if (err) throw new Error(err); 
        
        res.send('Actor created');
    });
});

module.exports = { actorsRouter };