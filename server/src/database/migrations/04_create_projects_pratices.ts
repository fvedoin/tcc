import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('projects_pratices', table => {
        table.integer('pratice_id').unsigned();
        table.integer('project_id').unsigned();
        table.foreign('pratice_id').references('pratices.id');
        table.foreign('project_id').references('projects.id');
        table.primary(['pratice_id', 'project_id']);
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('projects_pratices');
}