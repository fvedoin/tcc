import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('projects', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('').notNullable();
        table.boolean('isManager').notNullable();
        table.boolean('isTeam').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('projects');
}