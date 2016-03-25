var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);

/* GET home page. */
router.get('/', function(req, res, next) {

  knex('humans').then(function (results) {
    if (results.length !== 0) {
      res.render('index', { humans: results });
    }else{
      res.render('index', { error: 'no humans added' });
    }

  })

});

router.post('/addhuman', function(req, res, next) {
  if (req.body.name && req.body.age) {
    knex('humans').insert(req.body)
    .then(function(response){
      res.redirect('/');
    })
  } else {
    res.render('index', { error: 'Please fill out the form' });
  }
});


router.post('/edithuman/:id', function(req,res,next){
  knex.table('humans')
  .where({id: req.params.id})
  .update(req.body).then(function(response){
    res.redirect('/');
  })
});


router.post('/removehuman/:id', function(req, res, next) {
  knex('humans')
  .where('id', req.params.id)
  .del().then(function(response){
    res.redirect('/');
  })
});

module.exports = router;
