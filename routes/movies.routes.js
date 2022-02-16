const router = require("express").Router();
const MovieModel = require('../models/Movie.model');
const CelebrityModel = require('../models/Celebrity.model');


// all your routes here




  router.get('/movies/create', (req, res, next) => {
    CelebrityModel.find()
    .then((allCelebrities) => {
      console.log(allCelebrities);
      res.render('movies/new-movie', { celebrities: allCelebrities});
    })
    .catch((err) => {
      next(err);
    })
  });
      
  

  router.post('/movies/create', (req, res, next) => {
      const {title, genre, plot, cast}= req.body;
      console.log(req.body)
      MovieModel.create({title, genre, plot, cast})
      .then((createMovie) => {
          console.log('Movie created', createMovie.title)
          res.redirect('/movies')
      })
      .catch((err) => next(err))
  });


  router.get('/movies', (req, res, next) => {
    // Iteration #2: List the drones
    // ... your code here
    MovieModel.find()
    .then((allMovies) => {
      console.log(allMovies);
      res.render('movies/movies.hbs', { movies: allMovies});
    })
    .catch((err) => {
      next(err);
    })
  });


  router.get('/movies/:id', (req, res, next) => {
    const {id} = req.params;
      MovieModel.findById(id)
      .populate('cast')
      .then((foundMovie) => {
        console.log(foundMovie)
          res.render('movies/movie-details', {movies: foundMovie});
      })
      .catch((err) => {
          next(err)
      })
  });


  router.post('/movies/:id/delete', (req, res, next) => {
    const {id} = req.params;
  
      MovieModel.findByIdAndRemove(id)
      .then(() => {
          res.redirect("/movies");
      })
      .catch((err) => {
          next(err)
      })
  });



  router.get('/movies/:id/edit',  (req, res, next) =>{
    MovieModel.findById(req.params.id)
    .populate('cast')
    .then((movieFound) =>{
        res.render("movies/edit-movie", {movies: movieFound})
    })
    
})
router.post('/movies/:id/edit',  (req, res, next) =>{
  const {id} = req.params;
  const {title, genre, plot, cast} = req.body;
MovieModel.findByIdAndUpdate(id, {title, genre, plot, cast})
.populate('cast')
.then(() => {
  res.redirect("/movies");
})
.catch((err) => next(err))

})


module.exports = router;