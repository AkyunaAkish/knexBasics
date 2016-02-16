var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);

/* GET home page. */
router.get('/', function(req, res, next) {

  knex('humans').then(function (results) {
    if (results.length !== 0) {
      res.render('index', { humans: results });
    }else{
      res.render('index', { humans: 'no humans added' });
    }

  })

});

router.post('/addhuman', function(req, res, next) {
  console.log(req.body);

  knex('humans').insert(req.body)
  .then(function(res){

  }).then(function(){
    knex('humans').then(function (results) {

      res.redirect('/');

    })
  })

});


router.post('/edithuman/:id', function(req,res,next){
  console.log(req.body);
  knex.table('humans')
  .where({id: req.params.id})
  .update(req.body).then(function(res){

  }).then(function(){
    res.redirect('/');
  })

});


router.post('/removehuman/:id', function(req, res, next) {
  console.log(req.params);

  knex('humans')
  .where('id', req.params.id)
  .del().then(function(res){

  }).then(function(){
    knex('humans').then(function (results) {

      res.redirect('/');

    })
  })

});

module.exports = router;
