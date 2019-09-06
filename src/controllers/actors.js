const { Router } = require('express');
const { Actor } = require('../models/actors');

const actorsRouter = Router();

// GET /actors/
actorsRouter.get('/', async function (request, result) {
    try {
        const actors = await Actor.find();
        result.send(actors);    
    } catch (err) {
        console.log(err);
    }
});

// GET /actors/:id
actorsRouter.get('/:id', async function(request, result) {
    try {
        const actor = await Actor.findById(request.params.id);
        result.send(actor);
    } catch (err) {
        console.log(err);
    }
});

// POST /actors/create
actorsRouter.post('/create', function (request, result) {
    const {name, birth} = request.body;

    const actor = new Actor({
        name,
        birth
    });

    actor.save(function (err, actor) {
        if (err) throw new Error(err); 
        
        result.send('Actor created');
    });
});

module.exports = { actorsRouter };