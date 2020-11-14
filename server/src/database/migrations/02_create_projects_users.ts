import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('projects_users', table => {
        table.integer('user_id').unsigned();
        table.integer('project_id').unsigned();
        table.foreign('user_id').references('users.id');
        table.foreign('project_id').references('projects.id');
        table.primary(['user_id', 'project_id']);
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('projects_users');
}