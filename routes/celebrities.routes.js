const router = require("express").Router();
const CelebrityModel = require('../models/Celebrity.model');


// all your routes here

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity.hbs');
});

router.post('/celebrities/create', (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body;
    console.log(req.body)
    CelebrityModel.create({name, occupation, catchPhrase})
    .then((createCelebrity) => {
        console.log('Celebrity created', createCelebrity.name)
        res.redirect('/celebrities')
    })
    .catch((err) => next(err))
});



router.get('/celebrities', (req, res, next) => {
    // Iteration #2: List the drones
    // ... your code here
    CelebrityModel.find()
    .then((allCelebrities) => {
      console.log(allCelebrities);
      res.render('celebrities/celebrities.hbs', { celebrities: allCelebrities});
    })
    .catch((err) => {
      next(err);
    })
  });



module.exports = router;