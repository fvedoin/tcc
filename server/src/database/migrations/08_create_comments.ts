import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('comments', table => {
        table.increments('id').primary();
        table.date('commented_on').defaultTo(new Date());
        table.integer('user_id').unsigned();
        table.integer('project_risk_pratice_id').unsigned();
        table.string('comment').notNullable();
        table.foreign('user_id').references('projects_users.user_id');
        table.foreign('project_risk_pratice_id').references('project_risk_pratice.id');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('comments');
}