import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('projects', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.date('start_date').notNullable();
        table.date('end_date').nullable();
        table.enum('type', [
            'new software development', 'software enhancement', 'customization of commercial-off-the-shelf software', 'outsoursed software development',
            'software integration', 'system migration', 'enterprise-resource-planning implementation', 'other'
        ]).notNullable();
        table.enum('duration', [
            '6m', '6 to 12m', '13 to 18m', '19 to 24m', '25 to 30m', '31 to 36m', 'more than 36m'
        ]).notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('projects');
}