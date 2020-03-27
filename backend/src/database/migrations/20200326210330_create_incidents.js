exports.up = function(knex) {
    return knex.schema.createTable('incidents', (table) => {
        table.increments(); // Incremento para cada incidente adicionado na tabela
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();
        // Chave estrangeira que referencia a tabela ongs
        table.foreign('ong_id').references('id').inTable('ongs')

    })

};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};