import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('projects', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.enum('type', [
            'new software development', 'software enhancement', 'customization of commercial-off-the-shelf software', 'outsoursed software development',
            'software integration', 'system migration', 'enterprise-resource-planning implementation', 'other'
        ]).notNullable();
        table.enum('duration', [
            '6m', '6 a 12m', '13 a 18m', '19 a 24m', '25 a 30m', '31 a 36m', 'mais de 36m'
        ]);
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('projects');
}