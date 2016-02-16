// Update with your config settings.

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
