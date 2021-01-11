import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('projects_risks_practices', table => {
        table.increments('id').primary();
        table.integer('practice_id').unsigned();
        table.integer('project_id').unsigned();
        table.integer('risk_id').unsigned();
        table.integer('grade').nullable();
        table.date('added_on').defaultTo(knex.fn.now());
        table.date('removed_on');
        table.foreign('practice_id').references('practices.id');
        table.foreign('project_id').references('projects.id');
        table.foreign('risk_id').references('risks.id');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('projects_practices');
}