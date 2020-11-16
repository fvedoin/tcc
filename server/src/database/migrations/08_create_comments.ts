import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('comments', table => {
        table.integer('user_id').unsigned();
        table.integer('project_id').unsigned();
        table.string('comment').notNullable();
        table.foreign('user_id').references('projects_users.user_id');
        table.foreign('project_id').references('projects_users.project_id');
        table.primary(['user_id', 'project_id']);
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('comments');
}