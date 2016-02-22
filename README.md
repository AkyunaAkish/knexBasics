# Knex Basics walkthrough

### Setting up and using knex
* Must have node, the express generator, and postgres installed
* To get node and postgres:
* Install brew:
```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
* Install node and postgres
```
$ brew update
$ brew install node
$ brew install postgres
```
* Install the express generator
```
$ npm install express-generator -g
```
* Install nodemon to run your server(using the command $ nodemon) from the root directory of your application
```
$ npm install -g nodemon
```
* Note: new versions of knex have a couple of bugs, so it's advised to specifically download an older version(0.9.0) until those issues get worked out
```
$ take someApp
$ express --hbs --git .
$ npm install
$ npm install --save knex@0.9.0
$ npm install --save pg
$ knex init
```
* Open your directory in your text editor and go to your newly created knexfile.js (created by $ knex init) and replace the code there with this

```
module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgresql://localhost/knex-humans',
    pool: {
      min: 2,
      max: 10
    }
  }

};
```

* To keep it simple we'll just work with one database environment(development) and create a pointer to a knex-humans database, which we need to manually create:

```
$ createdb knex-humans
```
* Now we'll use knex to create a migrations folder and make a create_humans migrations file

```
$ knex migrate:make create_humans
```

* You should now have a migrations folder with a file in it, open it up and replace the code in there with this for the time being:

```
exports.up = function(knex, Promise) {
  return knex.schema.createTable('humans', function (table) {
    table.increments();
    table.string('name');
    table.integer('age');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {

};
```

* Now if you run this command, your schema should be correctly established in your local knex-humans postgresql database:

```
$ knex migrate:latest
```

* To properly hook knex up to your routes file you need to add this line to your routes files - in this case routes/index.js file:

```
var knex = require('knex')(require('../knexfile')['development']);
```

### CRUD examples
* You can find examples of some basic CRUD in the routes/index.js file of this application

#### Something to be aware of:
* Whether you're using res.json in an express/angular app or using res.render or res.redirect many times you'll need to create 2 .then statements and insert res.json/res.render or res.redirect in the second .then in order for them properly execute. Example:

```
knex.table('humans')
.where({id: req.params.id})
.update(req.body)
.then(function(res){

}).then(function(){
  res.redirect('/');
})
```

OR

```
knex('todos').insert(req.body)
  .then(function(res){

  })
  .then(function(){
    knex('todos')
    .then(function (results) {

      res.json(results);

    })
  })
```
