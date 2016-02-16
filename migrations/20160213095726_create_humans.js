
exports.up = function(knex, Promise) {
  return knex.schema.createTable('humans', function (table) {
    table.increments();
    table.string('name');
    table.integer('age');
    table.string('photo');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {

};
