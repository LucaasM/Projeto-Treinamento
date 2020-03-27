const knex = require('knex')
const configuration = require('../../knexfile');

// Conexaão de desenvolvimento
const connection = knex(configuration.development)

module.exports = connection