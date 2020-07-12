const express = require('express');
const router = express.Router();
const Movies = require('../../models/Movies');



// @route    GET api/movies
// @desc     Get all movies
// @access   Private
router.get('/',  async (req, res) => {
    
    let title = req.query.title;
 
  try {
      let query =  Movies.find({
    "imdb.rating": {
        "$gt": 8.5
    }
});
const movies= await Movies.find( query,{"title" : 1,"released" :1,"imdb":1, "plot": 1}    ).limit(50);

    res.json(movies);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});







module.exports = router;
