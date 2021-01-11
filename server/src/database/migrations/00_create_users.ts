import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.enum('profile', [
            'project manager', 'developer', 'analyst', 'architect or designer', 'team leader', 'development manager',
            'product owner', 'scrum master', 'agile coach', 'tester', 'quality assurance manager', 'project sponsor'
        ]).notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('users');
}