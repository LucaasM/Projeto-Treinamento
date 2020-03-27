exports.up = function(knex) { // Método para criação da tabela
    return knex.schema.createTable('ongs', (table) => {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    })

};

exports.down = function(knex) { // Método para corrigir/ algum erro, deletando a tabela
    return knex.shcema.dropTable('ongs')
};